import os
import pickle
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer

class DocumentSearch:
    def __init__(self, model_name='all-MiniLM-L6-v2', index_path='embeddings/index.pkl'):
        """
        Initializes the DocumentSearch model without loading the heavy model.
        """
        self.model_name = model_name
        self.model = None  # The model will be loaded on first use
        self.index_path = index_path
        self.index = None
        self.chunks = []
        self._load_index()

    def _get_model(self):
        """Loads the sentence transformer model if it's not already loaded."""
        if self.model is None:
            print("Loading sentence transformer model into memory...")
            self.model = SentenceTransformer(self.model_name)
            print("Model loaded successfully.")
        return self.model

    def _load_index(self):
        """Loads the FAISS index and text chunks from disk if they exist."""
        if os.path.exists(self.index_path):
            with open(self.index_path, 'rb') as f:
                data = pickle.load(f)
                self.chunks = data['chunks']
                index_data = data['index']
                self.index = faiss.deserialize_index(index_data)

    def _save_index(self):
        """Saves the FAISS index and text chunks to disk."""
        if self.index is not None:
            os.makedirs(os.path.dirname(self.index_path), exist_ok=True)
            index_data = faiss.serialize_index(self.index)
            with open(self.index_path, 'wb') as f:
                pickle.dump({'chunks': self.chunks, 'index': index_data}, f)

    def embed_and_index(self, text_chunks):
        """
        Creates embeddings for text chunks and adds them to the FAISS index.

        Args:
            text_chunks (list): A list of text chunks to be indexed.
        """
        model = self._get_model()
        new_embeddings = model.encode(text_chunks, convert_to_tensor=False)
        new_embeddings = np.array(new_embeddings).astype('float32')

        if self.index is None:
            dimension = new_embeddings.shape[1]
            self.index = faiss.IndexFlatL2(dimension)
        
        self.index.add(new_embeddings)
        self.chunks.extend(text_chunks)
        self._save_index()

    def search(self, question, k=3):
        """
        Searches the index for the most relevant text chunks for a given question.

        Args:
            question (str): The user's question.
            k (int): The number of results to return.

        Returns:
            list: A list of the most relevant text chunks.
        """
        if self.index is None:
            return []
            
        model = self._get_model()
        question_embedding = model.encode([question], convert_to_tensor=False)
        question_embedding = np.array(question_embedding).astype('float32')
        
        distances, indices = self.index.search(question_embedding, k)
        
        results = [self.chunks[i] for i in indices[0] if i < len(self.chunks)]
        return results 