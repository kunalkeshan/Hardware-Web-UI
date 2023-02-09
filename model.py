import keras
import cv2
import numpy as np
import json

model = keras.models.load_model('trained.h5')

class_name = ('b1', 'b2', 'b3', 'b4', 'b5')

birads = {
    'b1': {
        'name': 'BI-RADS 1',
        'comments':  ('Negative')
    },
    'b2': {
        'name': 'BI-RADS 2',
        'comments': ('Benign')
    },
    'b3': {
        'name': 'BI-RADS 3',
        'comments': ('Probably Benign')
    },
    'b4': {
        'name': 'BI-RADS 4',
        'comments': ('Suspicious')
    },
    'b5': {
        'name': 'BI-RADS 5',
        'comments': ('Highly Susceptive of Malignancy')
    },
}


def process_single_image(image_path: str, modality: str = '', width: int = None, height: int = None):
    img = cv2.imread(image_path)

    img_width, img_height, img_channels = img.shape
    if width:
        img_width = width
    if height:
        img_height = height

    img = cv2.resize(img, [224, 224])
    img = np.reshape(img, [1, 224, 224, 3])
    prediction = model.predict(img)

    result_class_name = class_name[np.argmax(prediction[0])]
    results = {
        'class_name': result_class_name,
        'accuracy': round(np.max(prediction[0]), 2),
        'birad': birads[result_class_name]
    }

    return results


# print(process_single_image('uploads/1668659386014.jpeg'))
