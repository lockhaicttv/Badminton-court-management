import os
import sys
import configparser
import pymongo
from pathlib import Path

sys.path.append(os.path.join('../'))
root = Path(os.path.abspath(__file__)).parents[1]

config = configparser.ConfigParser()
config.read(os.path.join(root, 'config.ini'))

# import utils.utils as utils
# import utils.nlp_utils as nlp
print(config)

class DBConnector:
    def __init__(self):
        self.client = pymongo.MongoClient(config["DB"]["DB_HOST"])
        self.db = self.client[config["DB"]["DB_NAME"]]


class Collection:
    connection = DBConnector()

    def __init__(self, collection_name):
        self.collection = self.connection.db[collection_name]

    def find_one(self, filter=None):
        return self.collection.find_one(filter=filter)

    def find_all(self, filter=None, limit=0, sort=None):
        return list(self.collection.find(filter=filter, limit=limit, sort=sort))

    def insert_one(self, doc):
        return self.collection.insert_one(doc)

    def get_last_record(self, filter):
        results = self.find_all(filter=filter)
        last_record = {}
        if len(results) > 0:
            last_record = results[len(results) - 1]
        return last_record


class Courts(Collection):
    def __init__(self):
        Collection.__init__(self, "courts")


class Products(Collection):
    def __init__(self):
        Collection.__init__(self, "products")


class ProductCategories(Collection):
    def __init__(self):
        Collection.__init__(self, "product_categories")


class Ratings(Collection):
    def __init__(self):
        Collection.__init__(self, "ratings")


if __name__ == "__main__":
    product = Products()
    print(product.find_one())
