import os
import sys
from pathlib import Path

sys.path.append(os.path.join('..'))
root = (Path(os.path.abspath(__file__))).parents[0]

from flask import Flask, jsonify, request
from app.intent_recognize import IntentRecognize
from app.train import Train
from app.db_connector import Products

from utils import utils

from datetime import datetime

app = Flask(__name__)

ir = IntentRecognize()
MAX_TIME = 300


@app.route('/chat-bot/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        message = data.get('input')['message']
        output = ir.run(message)

        print(output)
        return jsonify(output)
    except Exception as err:
        print(err)
        return jsonify({'message': 'Không nhận được'})


@app.route('/chat-bot/update-entities', methods=['POST'])
def update_entities():
    try:
        data = request.get_json()
        entities = data.get('data')
        if entities is not None:
            utils.save_json(data=entities,
                            prefix=True,
                            json_path=os.path.join(root, 'data', 'entities.json'))
        ir.__init__()
        return jsonify({'message': 'Cập nhật entities thất bại!', 'message_Status': 'success'})
    except:
        return jsonify({'message': 'Cập nhật entities thất bại', 'message_status': 'fail'})


if __name__ == '__main__':
    app.run(debug=True)