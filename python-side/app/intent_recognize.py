import os
import sys
from pathlib import Path

sys.path.append(os.path.join('../'))
root = Path(os.path.abspath(__file__)).parents[1]

import configparser

config = configparser.ConfigParser()
config.read(os.path.join(root, 'config.ini'))

import utils.utils as utils
import utils.nlp_utils as nlp
import pandas as pd
import random
from joblib import load
from bson.objectid import ObjectId

# from app.model.item_recognizer import EntityRecognizer, AgreeRecognizer
from app.sentiment_recognizer import SentimentRecognizer
from app.entity_recognize import EntityRecognizer
from app.train import Train
from app.db_connector import *

INTENT_THRESHOLD = float(config["INTENT"]["INTENT_THRESHOLD"])

UNKNOWN_RESPONSE = 'Xin lỗi, bạn có thể cung cấp thêm thông tin không?'
MISSING_RESPONSE = 'Xin lỗi, hiện mình chưa có thông tin về "{}". Mình sẽ cập nhật sớm nhất có thể!'
POS_RESPONSE = "Hihi, cảm ơn bạn nha ^^"
NEG_RESPONSE = "Xin lỗi bạn, vì mình còn nhỏ, nên chưa đủ thông tin hữu ích cho bạn :("
ENTITIES = ["products", "categories", "courts", "price"]
MEANINGLESS_WORDS = ["ừm", "ừ", "ok", "okay", "okie", "yeah", "oki", "ờ", "ùm"]


class IntentRecognize:
    def __init__(self):
        print("=> INIT INTENT RECOGNIZE")
        self.clf = None
        self.load_model()
        self.intents = None
        self.load_intents()
        self.entity_recognizer = EntityRecognizer()
        self.sentiment_recognizer = SentimentRecognizer()

    def load_model(self):
        try:
            self.clf = load(os.path.join(root, 'app', 'trained', 'model_predicted.pkl'))
        except:
            print('Load model fail => Train model')
            train = Train()
            train.run(os.path.join(root, 'data', 'intent_training.json'))
            self.load_model()

    def load_intents(self):
        intent_training = utils.load_json(os.path.join(root, 'data', 'intent_training.json'))['intents']
        intents = []
        intents.extend(intent_training)
        self.intents = intents

    def get_response(self, intent_name, entities, signs, court_id):
        print("court_id", court_id)
        print('get response', intent_name)
        entity = ''
        result = {}
        intent = next((item for item in self.intents if item['intent_name'] == intent_name), None)
        description = ''
        response = UNKNOWN_RESPONSE
        condition = {}
        if not intent is None:
            description = intent['description']
            if intent['description'] != 'query':
                response = f'{random.choice(intent["responses"])}'
            else:
                if len(entities) == 0:
                    response = f'{random.choice(intent["responses"])}'

                else:
                    if intent['query'] != "":
                        for e in ENTITIES:
                            if e in intent_name:
                                entity = e


                        ent_vals = [{'name': {"$regex": e["org_val"], "$options": "i"}} for e in entities if
                                    e["key"] == entity]
                        print("ENTITIES:", ent_vals)

                        condition = ent_vals[0]
                        response = intent["query"].format(condition)

                        if "query#" in response:
                            print("QUERY")
                            if len(signs) > 0:
                                response = self.query_price(court_id, signs, entities)
                            else:
                                response = self.query_answer(response, court_id)

        result['condition'] = condition
        result['response'] = response
        result['description'] = description
        return result

    def query_price(self, court_id, signs, entities):
        print("====> QUERY PRICE")
        print(court_id)
        categories = []
        prices = []
        res =""

        for ent in entities:
            if ent["key"] == "categories":
                categories.append(ent["org_val"])
            if ent["key"] == "price":
                prices.append(ent["org_val"])

        print(categories, prices, signs)

        if len(categories) == 0:
            print("===> tất cả categories")
            categories = [x["name"] for x in ProductCategories().find_all({"court_id": ObjectId(court_id)})]


        def get_products(category, court_id):
            results = ProductCategories().find_one({'name': {"$regex": category, "$options": "i"}, "court_id": ObjectId(court_id)})
            return results

        if "gte" in signs and "lte" in signs:
            print("===> ở giữa")
            min_price = min(prices)
            max_price = max(prices)

            for category in categories:
                result = get_products(category, court_id)
                category_id = result["_id"] if result is not None else ""
                if category is not "":
                    products = Products().find_all({"product_category_id": category_id, "price": {"$gte": min_price, "$lte": max_price}})
                    for product in products:
                        res += f" + {product['name']} : {product['price']}"

        elif "gte" in signs or "lte" in signs:
            if "gte" in signs:
                print("===> lớn hơn")
                price = min(prices)
                opt = "gte"
            else:
                print("===> bé hơn")
                price = max(prices)
                opt = "lte"
            for category in categories:
                result = get_products(category, court_id)
                category_id = result["_id"] if result is not None else ""
                if category is not "":
                    products = Products().find_all({"product_category_id": category_id, "price": {f"${opt}": price}})
                    for product in products:
                        res += f" + {product['name']} : {product['price']}"

        else:
            print("====> bằng")
            for category in categories:
                result = get_products(category, court_id)
                category_id = result["_id"] if result is not None else ""
                if category is not "":
                    products = Products().find_all({"product_category_id": category_id, "price": {"$in": prices}})
                    for product in products:
                        res += f" + {product['name']} : {product['price']}"



        res = "Đây là những sản phẩm có giá theo yêu cầu của bạn:" + res if res != "" else "Hiện tại mình chưa tìm được sản phẩm theo giá bạn mong muốn!"
        return res


    def query_answer(self, query, court_id):
        print("====> QUERY ANSWER")
        query = query.split('#')
        res = 'Xin lỗi, hiện tại không tìm thấy thông tin bạn mong muốn!'

        if len(query) > 0:
            model = query[1]
            condition = eval(query[3])
            print("MODEL: ", model)

            # Products info
            if model == 'products':
                print("RESULT PRODUCTS")
                obj = Products()
                results = obj.find_all(condition)
                return_product = None
                if len(results) > 0:
                    pro_cat = ProductCategories()
                    for re in results:
                        pro_cat_find = pro_cat.find_one({"court_id": ObjectId(court_id), "_id": re["product_category_id"]})

                        if pro_cat_find is not None:
                            return_product = re
                    if return_product is not None:
                        res = f'Thông tin sản phẩm bạn cần tìm là: \n' \
                              f'+ Tên sản phẩm: {return_product["name"]}\n' \
                              f'Giá sản phẩm: {str(return_product["price"])}\n'

                elif model == 'product_categories':
                    results = list(obj.find_all(condition, limit=5))
                    if len(results) > 0:
                        products = ', '.join([product["name"] for product in results])
                        res = 'Các sản  phẩm thuộc loại bạn đang tìm kiếm là: {}'.format(products)
            # Courts info
            elif model == "courts":
                print("RESULT COURTS")
                obj = Courts()
                results = obj.find_one(condition)
                if not results is None:
                    description = ', '.join(results['description']) if (results[
                        "description"]) is not None else ""

                    res = f'Thông tin sân cần tìm là: \n' \
                          f'+Tên sân: {results["name"]}\n' \
                          f'+Địa chỉ: {results["address"]}\n'\
                          f'+Số điện thoại: {results["phone_number"]}\n'\
                          f'+Mô tả: {results["description"]}\n'\

            elif model == 'product_categories':
                print("RESULT PRODUCTS CATEGORIES")
                obj = Products()
                pro_cat = ProductCategories()
                condition["court_id"] = ObjectId(court_id)
                print("condition", condition)

                product_categories = pro_cat.find_one(condition)
                if product_categories:
                    child_condition = {"product_category_id": (product_categories["_id"])}
                    results = list(obj.find_all(child_condition, limit=5))
                    if len(results) > 0:
                        products = ', '.join([product["name"] for product in results])
                        res = 'Các sản  phẩm thuộc loại bạn đang tìm kiếm là: {}'.format(products)

        return res

    # def run(self, sentence, user_id):
    def run(self, sentence, court_id):

        print('----Run-----')
        sentence = nlp.preprocess_step_1(sentence)
        sen_result = self.entity_recognizer.detect_entitíes(sentence)
        sen_recognize = sen_result['sen_result']
        sen_recognize = nlp.preprocess_step_2(sen_recognize)

        sign = sen_result['sign']
        entities = sen_result['entities']
        entities_val = []
        data_predict = [{'feature': sen_recognize}]
        df_predict = pd.DataFrame(data_predict)

        print('=> Sentences will be recognize: {}'.format(sen_recognize))

        # check meaning
        split_input = sentence.split(' ')
        for w in split_input:
            if w in MEANINGLESS_WORDS:
                output = {"input": sentence, "intent_name": "meaningless",
                          "response": "Nếu bạn cần hỗ trợ thì nhắn mình nhé!", "score": 1.0,
                          "entities": [], "condition": "{}", "description": "", "status": "handled"
                          }
                return output

        # predict
        intent_predicted = self.clf.predict(df_predict['feature'])
        print('Intent general predicted: {}'.format(intent_predicted))

        # get response

        score = max(self.clf.predict_proba(df_predict['feature'])[0])

        output = {'input': sentence, 'response': '', 'score': score, 'entities': entities,
                  'condition': '', 'description': '', 'status': 'unhandled', 'sentiment_score': 0
                  }

        if score < INTENT_THRESHOLD:
            sentiment_score = self.sentiment_recognizer.run(sen_recognize)
            if sentiment_score > 0:
                response= POS_RESPONSE
                intent_name= 'positive_sentences'
                output['sentiment_score'] = sentiment_score
                output['status'] = 'handled'
            elif sentiment_score < 0:
                response = NEG_RESPONSE
                intent_name = "negative_sentence"
                output["sentiment_score"] = sentiment_score
                output["status"] = "handled"
            else:
                response = UNKNOWN_RESPONSE
                intent_name = intent_predicted[0]
            output['response'] = response
            output['intent_name'] = intent_name
        else:
            name_predicted = intent_predicted[0]
            output['intent_name'] = name_predicted

            result = self.get_response(intent_predicted[0], entities, sign, court_id)
            # print(result)

            # if user_id is not None:
            output['response'] = result['response']
            output['status'] = 'handled'

        return output


if __name__ == '__main__':
    ir = IntentRecognize()

    # print(ir.run('tôi muốn tra cứu sản phẩm bánh bò', "606978e4499c17061cbfd685"))
    # print(ir.run('tôi muốn tra cứu sản phẩm bánh bò', "60207b5a3dd41d22d8861cd0"))

    # print(ir.run('gợi ý sản phẩm giá dưới 50000', "60207b5a3dd41d22d8861cd0"))
    print(ir.run('buồn', "60207b5a3dd41d22d8861cd0"))