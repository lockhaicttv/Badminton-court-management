import os
import sys
from pathlib import Path


sys.path.append(os.path.join('../'))
root = Path(os.path.abspath(__file__)).parents[1]

import utils.utils as utils
import configparser

config = configparser.ConfigParser()
config.read(os.path.join(root, 'config.ini'))




class SentimentRecognizer:
    def __init__(self):
        self.negative_words = []
        self.positive_words = []
        self.load_data()

    def load_data(self):
        self.negative_words = list(utils.load_json(os.path.join(root, "data", "negative_words.json"))["negative_words"])
        self.positive_words = list(utils.load_json(os.path.join(root, "data", "positive_words.json"))["positive_words"])

    def run(self, sentence):
        # sentence = (nlp.preprocess_step_2(nlp.preprocess_step_1(sentence)))
        sentence = sentence.split(" ")
        print(sentence)
        count_negative_words = 0
        count_positive_words = 0
        neg_score = 0
        pos_score = 0
        len_sen = len(sentence)
        for word in sentence:
            if word in self.positive_words:
                count_positive_words += 1
            elif word in self.negative_words:
                count_negative_words += 1
            else:
                len_sen -= 1
        print(len_sen)
        if len_sen > 0:
            neg_score = count_negative_words / len_sen
            pos_score = count_positive_words / len_sen
        if neg_score > pos_score:
            return -neg_score
        elif neg_score < pos_score:
            return pos_score
        else:
            return 0


if __name__ == "__main__":
    sr = SentimentRecognizer()
    print(sr.run("sao bạn ngốc quá vậy"))
