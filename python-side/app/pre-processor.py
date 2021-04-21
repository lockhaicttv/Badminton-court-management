import os
import sys
from pathlib import Path

sys.path.append(os.path.join('..'))
root = Path(os.path.abspath(__file__)).parents[1]

import utils.utils as utils
import utils.nlp_utils as nlp


class PreProcessor:
    def run(self, sentence):
        print("====Start to preprocess sentences====")
        sentence = nlp.tokenize(sentence)
        print(sentence)
        return sentence


if __name__ == "__main__":
    pp = PreProcessor()
    d = os.path.join(root, "../data", "intent_training.json")
    print(utils.read_json(d))

