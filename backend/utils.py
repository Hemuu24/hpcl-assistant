from PyPDF2 import PdfReader
import re

def parse_pdf(file_path):
    """
    Parses a PDF file and extracts text.

    Args:
        file_path (str): The path to the PDF file.

    Returns:
        str: The extracted text from the PDF.
    """
    text = ""
    with open(file_path, "rb") as f:
        reader = PdfReader(f)
        for page in reader.pages:
            text += page.extract_text()
    return text

def chunk_text(text, chunk_size=150):
    """
    Chunks text into smaller segments of a specified word count.

    Args:
        text (str): The text to be chunked.
        chunk_size (int): The approximate number of words per chunk.

    Returns:
        list: A list of text chunks.
    """
    words = re.split(r'(\s+)', text)
    chunks = []
    current_chunk = []
    current_word_count = 0

    for word in words:
        current_chunk.append(word)
        if word.strip():
            current_word_count += 1
        
        if current_word_count >= chunk_size:
            chunks.append("".join(current_chunk))
            current_chunk = []
            current_word_count = 0
    
    if current_chunk:
        chunks.append("".join(current_chunk))

    return [chunk.strip() for chunk in chunks if chunk.strip()] 