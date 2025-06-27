# VisosnTransformer
An end-to-end system that extracts text from images and translates it to English using Vision Transformers and machine translation.

## The Big Idea

Imagine you take a photo of a sign in French or Chinese with your phone, and your phone magically shows you what it says in English. That's exactly what we're building!

## Building Blocks:
* The Eye (OCR)- First, our program looks at the picture and reads the text, just like you read words from a book.
* The Language Detective - Then it figures out what language the text is in - French, Spanish, Chinese, etc.
* The Translator - Finally, it translates the parsed words to English.

## Setting Up:
* import all the files listed in 'requirements.txt'
* Web Interface - Clean website where a user can - drag and drop an image and see translation.


## Features

- Extract text from images (OCR)
- Automatic language detection
- Translation to English
- Web interface for easy use

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/vision-text-translator.git
cd vision-text-translator
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

### Web Application
```bash
python app/app.py
```
Then open http://localhost:5000 in your browser

### Command Line
```python
from models.text_translator import ImageTextTranslator

translator = ImageTextTranslator()
result = translator.process_image("path/to/your/image.jpg")
print(result)
```

## Docker
```bash
docker build -t vision-text-translator .
docker run -p 5000:5000 vision-text-translator
```

## Models Used
- OCR: [TrOCR (microsoft/trocr-base-printed)](https://huggingface.co/microsoft/trocr-base-printed)
- Translation: [OPUS-MT (Helsinki-NLP/opus-mt-mul-en)](https://huggingface.co/Helsinki-NLP/opus-mt-mul-en)