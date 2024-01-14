# Dependencies
import keras
import cv2
import numpy as np
import json

# The code `model = keras.models.load_model('trained.h5', compile=False)` is loading a pre-trained
# model from a file called 'trained.h5'. The `compile=False` argument is used to prevent the model
# from being compiled after loading.
model = keras.models.load_model('trained.h5', compile=False)
model.compile()

# The `class_name` variable is a tuple that contains the names of the different classes or categories
# that the model can predict. In this case, the classes are represented by the strings 'b1', 'b2',
# 'b3', 'b4', and 'b5'.
class_name = ('b1', 'b2', 'b3', 'b4', 'b5')

birads = {
    'b1': {
        'name': 'BI-RADS 1',
        'comments':  ['Negative']
    },
    'b2': {
        'name': 'BI-RADS 2',
        'comments': ['Benign']
    },
    'b3': {
        'name': 'BI-RADS 3',
        'comments': ['Probably Benign']
    },
    'b4': {
        'name': 'BI-RADS 4',
        'comments': ['Suspicious']
    },
    'b5': {
        'name': 'BI-RADS 5',
        'comments': ['Highly Susceptive of Malignancy']
    },
}


def process_single_image(image_path: str, modality: str = '', width: int = None, height: int = None):
    """
    The function takes an image path, modality, width, and height as inputs, processes the image by
    resizing it and reshaping it, predicts the class of the image using a pre-trained model, and returns
    the class name, accuracy, and birad value of the prediction.
    
    :param image_path: The path to the image file that you want to process
    :type image_path: str
    :param modality: The "modality" parameter is a string that represents the type of medical imaging
    modality used to capture the image. Examples of modalities include X-ray, MRI, CT scan, etc
    :type modality: str
    :param width: The width parameter is used to specify the desired width of the image. If a value is
    provided, the image will be resized to that width. If no value is provided, the original width of
    the image will be used
    :type width: int
    :param height: The height parameter is used to specify the desired height of the image. If a value
    is provided for height, the image will be resized to that height. If no value is provided, the
    original height of the image will be used
    :type height: int
    :return: a dictionary containing the following information:
    - 'class_name': the predicted class name of the image
    - 'accuracy': the accuracy or confidence score of the prediction
    - 'birad': the corresponding BI-RADS category for the predicted class name.
    """
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
