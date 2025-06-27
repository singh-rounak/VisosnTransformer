from transformers import TrOCRProcessor, VisionEncoderDecoderModel
from transformers import pipeline
from PIL import Image
import torch

class ImageTextTranslator:
    def __init__(self):
        # Initialize OCR processor and model
        self.ocr_processor = TrOCRProcessor.from_pretrained("microsoft/trocr-base-printed")
        self.ocr_model = VisionEncoderDecoderModel.from_pretrained("microsoft/trocr-base-printed")
        
        # Initialize translation pipeline
        self.translator = pipeline(
            "translation",
            model="Helsinki-NLP/opus-mt-mul-en",
            device=0 if torch.cuda.is_available() else -1
        )
    
    def extract_text(self, image_path):
        """Extract text from image using OCR"""
        image = Image.open(image_path).convert("RGB")
        pixel_values = self.ocr_processor(image, return_tensors="pt").pixel_values
        generated_ids = self.ocr_model.generate(pixel_values)
        return self.ocr_processor.batch_decode(generated_ids, skip_special_tokens=True)[0]
    
    def translate_text(self, text, target_lang="en"):
        """Translate extracted text to English"""
        if not text.strip():
            return ""
        return self.translator(text)[0]['translation_text']
    
    def process_image(self, image_path):
        """End-to-end processing: OCR + translation"""
        extracted_text = self.extract_text(image_path)
        translated_text = self.translate_text(extracted_text)
        return {
            "original_text": extracted_text,
            "translated_text": translated_text
        }