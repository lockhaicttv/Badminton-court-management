import os
import sys
from pathlib import Path

sys.path.append(os.path.join('..'))
root = Path(os.path.abspath(__file__)).parents[1]

import string
from pyvi import ViTokenizer, ViPosTagger, ViUtils
from fuzzysearch import find_near_matches
from sklearn.metrics.pairwise import cosine_similarity

import utils.utils as utils


def tokenize(doc):
    return ViTokenizer.tokenize(doc)


def normalize(doc):
    return doc.lower()


def standardize(doc):
    standardize_words_list = (
        utils.load_json(os.path.join(root, "data", "standardize_words.json"))["standardize_words"])
    new_doc = doc.split(" ")
    for key, value in standardize_words_list.items():
        for word in new_doc:
            if word in value:
                doc = doc.replace(word, key)
    return doc


def remove_punctuation(doc):
    for c in string.punctuation:
        if c != "_":
            doc = doc.replace(c, " ")
    return doc


def remove_duplicate_spaces(doc):
    return " ".join(doc.split())


def remove_stop_word(doc):
    stop_words_list = list(utils.load_json(os.path.join(root, "data", "stop_words.json"))["stop_words"])
    doc_list = doc.split()
    for word in doc_list:
        if word in stop_words_list:
            doc_list[doc_list.index(word)] = doc_list[doc_list.index(word)].replace(word, " ")
    doc = " ".join(doc_list)
    doc = remove_duplicate_spaces(doc)
    return doc


def preprocess_step_1(doc):
    doc = doc.strip()
    doc = normalize(doc)
    doc = standardize(doc)
    doc = remove_punctuation(doc)
    return doc


def preprocess_step_2(doc):
    doc = remove_stop_word(doc)
    doc = tokenize(doc)
    return doc


def approximate_search(substring, string):
    output = {"matched": "", "score": 0}
    result = find_near_matches(substring, string, max_deletions=1, max_insertions=1, max_substitutions=0)
    if len(result) > 0:
        dist = [d.dist for d in result]
        min_index = dist.index(min(dist))

        start = result[min_index].start
        end = result[min_index].end
        while string[start - 1] != " " and start > 0:
            start = start - 1

        while end < len(string) and string[end] != " ":
            end = end + 1
        output["matched"] = string[start: end + 1].strip()
        output["score"] = 1 - (round(result[min_index].dist / len(substring), 3))
    return output


def remove_accents(doc):
    return ViUtils.remove_accents(doc).decode('utf-8')


def calculate_cosin_similarity(vec_1, vec_2):
    cos_sim = cosine_similarity([vec_1], [vec_2])
    return round(cos_sim[0][0], 3)
