
import pickle
from tensorflow.keras.models import load_model
from nltk.stem import WordNetLemmatizer
import numpy as np
import nltk
import random
import json
import os


class Bot:

    def __init__(self):

        nltk.download('punkt')
        nltk.download('wordnet')
        nltk.download('omw-1.4')
        self.lemmatizer = WordNetLemmatizer()

    def clean_up_sentence(self, sentence):
        # tokenize the pattern - split words into array
        sentence_words = nltk.word_tokenize(sentence)
        # stem each word - create short form for word
        sentence_words = [self.lemmatizer.lemmatize(
            word.lower()) for word in sentence_words]
        return sentence_words

    def bow(self, sentence, words, show_details=True):
        # tokenize the pattern
        sentence_words = self.clean_up_sentence(sentence)
        # bag of words - matrix of N words, vocabulary matrix
        bag = [0]*len(words)
        for s in sentence_words:
            for i, w in enumerate(words):
                if w == s:
                    # assign 1 if current word is in the vocabulary position
                    bag[i] = 1
                    if show_details:
                        print("found in bag: %s" % w)
        return(np.array(bag))

    def predict_class(self, sentence, model):
        # filter out predictions below a threshold
        p = self.bow(sentence, self.words, show_details=False)
        res = model.predict(np.array([p]))[0]
        ERROR_THRESHOLD = 0.25
        results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
        # sort by strength of probability
        results.sort(key=lambda x: x[1], reverse=True)
        return_list = []
        for r in results:
            return_list.append(
                {"intent": self.classes[r[0]], "probability": str(r[1])})
        return return_list

    def getResponse(self, ints, ChatBot_Data):
        tag = ints[0]['intent']
        list_of_intents = ChatBot_Data
        for i in list_of_intents:
            if(i['tag'] == tag):
                result = random.choice(i['responses'])
                break
        return result

    def predict_from_query(self, folder_path, query):
        self.words = pickle.load(
            open(os.path.join(folder_path, 'wordsPkl.pkl'), 'rb'))
        self.classes = pickle.load(
            open(os.path.join(folder_path, 'classesPkl.pkl'), 'rb'))

        model = load_model(os.path.join(folder_path, 'chatbotModel.h5'))

        ChatBot_Data = json.loads(open(os.path.join(
            folder_path, 'EnglishDataWithoutObjectName.json'), encoding="utf8").read())

        ints = self.predict_class(query, model)
        res = self.getResponse(ints, ChatBot_Data)

        return res
