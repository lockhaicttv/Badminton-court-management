import os
import sys
from pathlib import Path

import pandas as pd

sys.path.append(os.path.join('..'))
root = Path(os.path.abspath(__file__)).parents[1]

import utils.utils as utils
import utils.nlp_utils as nlp

from sklearn.model_selection import train_test_split
from sklearn import metrics
from sklearn.metrics import accuracy_score
from app.model import SVMModel
from app.model import KNNModel
from app.model import DecisionTreeModel
from app.model import NaiveBayesModel
from joblib import dump


class Train:
    def __init__(self):
        pass

    def load_train_data(self, train_data_path):
        train_data = utils.load_json(train_data_path)
        return train_data

    def run(self, train_data_path):
        train_data_source = self.load_train_data(train_data_path)['intents']

        train_data = []
        for data in train_data_source:
            print(data)
            for phrase in data['training_phrases']:
                train_object = {'feature': f'{nlp.preprocess_step_2(nlp.preprocess_step_1(phrase))}',
                                'target': nlp.normalize(data['intent_name'])}
                train_data.extend(utils.duplicate_object(train_object, 2))
                remove_accent_object = {'feature': f'{nlp.remove_accents(train_object["feature"])}',
                                        'target': train_object['target']}
                train_data.extend(utils.duplicate_object(remove_accent_object, 2))

        print(train_data)
        df_train = pd.DataFrame(train_data)

        # save data
        utils.save_json(data={'intent': train_data}, prefix=True,
                        json_path=os.path.join(root, 'data', 'data_train.json'))

        # Model
        model = KNNModel()

        X_train, X_test, y_train, y_test = train_test_split(df_train['feature'], df_train.target, test_size=0.2,
                                                            random_state=109)

        # train model/ fit data
        clf = model.clf.fit(X_train, y_train)

        # predict
        y_pred = clf.predict(X_test)
        print('Độ chính xác: ', accuracy_score(y_test, y_pred))
        print('Report: ', metrics.classification_report(y_test, y_pred))
        dump(clf, os.path.join(root, "app", "trained","model_predicted.pkl"))

        print('=>> Train model successfully')

    def predict(self):
        test_data = []
        test_data.append({"feature": u"Chào"})
        test_data.append({"feature": u"Tạm biệt"})
        test_data.append({"feature": u"tôi muốn tra cứu phim abc"})
        test_data.append({"feature": u"abc"})
        df_test = pd.DataFrame(test_data)
        print(df_test["feature"])


if __name__ == '__main__':
    train = Train()
    train.run(os.path.join(root, 'data', 'intent_training.json'))
