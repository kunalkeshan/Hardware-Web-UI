import keras
import cv2
import numpy as np
import json

model = keras.models.load_model('trained.h5')

class_name = ('b1', 'b2', 'b3', 'b4', 'b5')

birads = {
    'b1': {
        'name': 'BI-RADS 1',
        'comments':  ('no finding is present in an imaging modality (not even a benign finding)', 'there is nothing to comment on',  'a normal examination')
    },
    'b2': {
        'name': 'BI-RADS 2',
        'comments': ('is a benign category',  'A finding placed in this category should have a 100% chance of being benign', 'The lesion can be one among the following, calcified fibroadenomas, multiple secretory calcifications, fat-containing lesions such as oil cysts, breast lipomas, galactoceles, mixed density hamartomas, cutaneous neurofibromas,  intramammary lymph nodes, breast sebaceous cysts, simple breast cysts, breast implants')
    },
    'b3': {
        'name': 'BI-RADS 3',
        'comments': ('A finding placed in this category is considered probably benign', ' With a risk of malignancy of > 0% and ≤ 2%4',  'Grouped round calcifications',  'Circumscribed, round or oval mass without calcification',  'Focal asymmetry without calcification or architectural distortion')
    },
    'b4': {
        'name': 'BI-RADS 4',
        'comments': ('Suspicious for malignancy with 2-94% probability of malignancy', 'BI-RADS 4 lesions may not have the characteristic morphology of breast cancer but have a definite probability of being malignant', 'A biopsy is recommended for these lesions')
    },
    'b5': {
        'name': 'BI-RADS 5',
        'comments': ('Malignant spiculated or irregular mass',  'High density',  'Fine linear or linear branching segmental calcifications')
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
