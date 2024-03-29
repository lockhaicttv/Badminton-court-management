from pyvi import ViTokenizer, ViPosTagger
from sklearn.base import TransformerMixin, BaseEstimator


class FeatureTransformer(BaseEstimator, TransformerMixin):
    def __init__(self):
        pass
        # self.tokenizer = ViTokenizer
        # self.pos_tagger = ViPosTagger.postagging

    def fit(self, *_):
        return self

    def transform(self, X, y=None, **fit_params):
        result = X.apply(lambda text: ViTokenizer.tokenize(text))
        return result
