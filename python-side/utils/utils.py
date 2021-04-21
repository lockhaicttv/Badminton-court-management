import os
import sys
from pathlib import Path

sys.path.append(os.path.join('..'))
root = Path(os.path.abspath(__file__)).parents[1]

import pandas as pd
import json
import codecs
import numpy as np
import codecs


def load_json(json_path):
    return pd.read_json(json_path)


def save_json(data, json_path, prefix=None, orient="records"):
    """
    :param data: data or dataframe
    :param json_path: path saved
    :param prefix: True or False. Ex: {"intents: []}
    :param orient: split, records, index, columns, values, table
    :return:
    """

    if prefix:
        with codecs.open(json_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    else:
        df = pd.DataFrame(data)
        df.to_json(json_path, orient=orient)
    print("===>Json successfully saved at {}".format(json_path))


def load_csv(csv_path, sep=None, usecols=None):
    return pd.read_csv(csv_path, sep=sep, encoding='utf-8', usecols=usecols, engine="python")


def save_excel(dataframe, excel_path):
    print("===>Excel successfully saved at {}".format(excel_path))
    return dataframe.to_excel(excel_path, index=False)


def load_excel(excel_path, sheetname=None):
    return pd.read_excel(excel_path, sheetname)


def duplicate_object(object, time):
    arr = []
    for i in range(time):
        arr.append(object)
    return arr



def hello_utils():
    print("hello utils")