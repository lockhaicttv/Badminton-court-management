import os
import sys
from pathlib import Path

sys.path.append(os.path.join('../'))
root = Path(os.path.abspath(__file__)).parents[1]

from app.intent_recognize import IntentRecognize
import pandas as pd
import utils.utils as utils
from time import gmtime, strftime

ir = IntentRecognize()
test_cases = ["hello", "bạn tên gì", "tôi muốn xem thông tin bánh bò", "tôi muốn xem thông tin sân thanh bảo",
              "gợi ý cho tôi các loại quần áo đi bạn", "gợi ý cho tôi vài cái bánh giá dưới 20000 đi",
              "gợi ý cho tôi vài sản phẩm giá dưới 20000 đi bạn",
              "bên bạn có quần áo nào giá dưới 1000000 mà trên 10000 không dạ",
              "shop có bánh nào dưới 20000 với lại nước dưới 50000 hông",
              "bên bạn có cây vợt cầu lông nào giá 100000 không",
              "làm sao để mình thanh toán đơn hàng được bạn",
              "bạn chỉ mình cách lựa vợt được khônng. mình chưa biết gì hết. huhuhuhu",
              "bạn gợi ý mình cái bánh nào giá 60000 đi",
              "hôm nay tui buồn một mình trên phố đông người",
              "bạn có yêu tui không, có muốn về nhà với tui không",
              "gợi ý sản phẩm",
              "tui đang rất là vui, đừng chọc tui nha bạn",
              "bạn có thể giúp gì được cho tui dạ bạn"
              ]
results = []
court_id = "60207b5a3dd41d22d8861cd0"

for case in test_cases:
    results.append(ir.run(case, court_id))
    print(ir.run("hello", court_id))

df = pd.DataFrame(results)
utils.save_excel(df, os.path.join(root, "test_cases", f"test_case_{strftime('%Y-%m-%d_%H-%M-%S', gmtime())}.xlsx"))
