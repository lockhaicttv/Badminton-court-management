import os
import sys
from pathlib import Path

sys.path.append(os.path.join('../'))
root = Path(os.path.abspath(__file__)).parents[1]

import configparser

config = configparser.ConfigParser()
config.read(os.path.join(root, 'config.ini'))

import re
from utils import utils
from utils import nlp_utils
from app.db_connector import *

SYNONYM_WORD = [["gte", "trên", "lớn hơn", "cao hơn", "từ"], ["lte", "dưới", "nhỏ hơn", "thấp hơn", "bé hơn"]]
YES_AGREE = ["có", "có chứ"]
NO_AGREE = ["không", "không có"]
ENTITY_THRESHOLD = float(config["ENTITY"]["ENTITY_THRESHOLD"])


class EntityRecognizer(object):
    def __init__(self):
        self.entity_list = []
        self.entity_key = []
        self.entity_vals = []
        self.append_db_data()
        self.load_entity()

    def load_entity(self):
        entity_list = utils.load_json(os.path.join(root, 'data', 'entities.json'))['entities']
        data = []
        for entity in entity_list:
            for value in entity['values']:
                print(value)
                data.append(
                    ({
                        'key': entity['key'].lower(),
                        'org_val': value['org_val'].lower(),
                        'values': value['org_val'].lower()
                    })
                )
                if value['description'] is not None:
                    for i in range(len(value['description'])):
                        data.append(
                            ({
                                'key': entity['key'].lower(),
                                'org_val': value['org_val'].lower(),
                                'value': value['description'][i].lower()
                            })
                        )
            self.entity_key.append(entity['key'])

        for item in data:
            self.entity_vals.append(item['values'])
        self.entity_vals.sort(key=len, reverse=True)

        for entity_val in self.entity_vals:
            self.entity_list.append((next(item for item in data if item['values'] == entity_val)))

    # detect entity
    def detect_entitíes(self, sentences):
        print('raw sentences =>>>', sentences)
        entities = []

        for i in range(len(self.entity_vals)):
            result = nlp_utils.approximate_search(self.entity_vals[i].lower(), sentences.lower())  # tui fix

            if result['score'] > ENTITY_THRESHOLD:
                sentences = sentences.replace(result['matched'], self.entity_list[i]['key'])
                entities.append(self.entity_list[i])
        res = [sub['key'] for sub in entities]
        entities_unique = list(set().union(res))

        num = self.detect_number(sentences)
        sign = []

        if len(num) > 0:
            for n in num:
                sentences = sentences.replace(n, "price")
                entities.append({"key": "price", "org_val": int(n), "values": int(n)})
                sign = self.detect_sign(sentences)

        sen_result = {
            'sen_result': sentences,
            'entities': entities,
            'sign': sign
        }
        print(sen_result)
        return sen_result

    # detect sign
    def detect_sign(self, sentences):
        sign = []
        for synonym in SYNONYM_WORD:
            for word in synonym:
                if word in sentences:
                    sign.append(synonym[0])
        if len(sign) == 0:
            sign.append("egal")
        return sign

    def append_db_data(self):
        entity_list = []
        data_product = []
        data_categories = []
        data_courts = []

        # Add data product
        list_product = list(Products().find_all())
        data_product.extend(
            {
                'org_val': product['name'],
                'description': None
            }
            for product in list_product
        )

        entity_list.append(
            {
                'key': 'products',
                'values': data_product
            }
        )

        # Add data category
        list_category = list(ProductCategories().find_all())
        data_categories.extend(
            {
                'org_val': category['name'],
                'description': None
            }
            for category in list_category
        )

        entity_list.append(
            {
                'key': 'categories',
                'values': data_categories
            }
        )

        # Add data courts
        list_court = list(Courts().find_all())
        data_courts.extend(
            {
                'org_val': court['name'],
                'description': None
            }
            for court in list_court
        )

        entity_list.append(
            {
                'key': 'courts',
                'values': data_courts
            }
        )

        utils.save_json(
            {
                'entities': entity_list
            },
            os.path.join(root, 'data', 'entities.json'),
            True
        )

    def detect_number(self, sentence):
        num = re.findall(r'\d+', sentence)
        return num


if __name__ == '__main__':
    er = EntityRecognizer()
    # er.detect_sign("Tôi muốn mua bánh giá dưới 20000")
    print(er.detect_entitíes('Tôi muốn mua bánh giá từ 20000'))
    # er.append_db_data()
    # print(    er.detect_number("12 là ôi 14"))
