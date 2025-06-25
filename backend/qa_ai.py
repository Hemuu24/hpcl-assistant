import os
import google.generativeai as genai
from dotenv import load_dotenv

def configure_ai():
    """Configures the Google AI client."""
    load_dotenv()
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise ValueError("GOOGLE_API_KEY not found. Please set it in your .env file.")
    genai.configure(api_key=api_key)

def generate_ai_answer(question, context):
    """
    Generates a conversational answer using the Gemini model.

    Args:
        question (str): The user's original question.
        context (list): A list of relevant text chunks from the document.

    Returns:
        str: A generated, conversational answer.
    """
    if not context:
        # Use Gemini to answer the question directly, without context
        try:
            model = genai.GenerativeModel('gemini-1.5-flash')
            response = model.generate_content(question)
            return response.text
        except Exception as e:
            error_message = str(e)
            print(f"Error during AI generation: {error_message}")
            return f"An unexpected error occurred with the AI service. Details: {error_message}"

    # Combine the context chunks into a single string
    context_str = "\n\n".join(context)

    # Create the prompt for the language model
    prompt = f"""
    You are a professional Refinery Safety Assistant. Your task is to answer the user's question based *only* on the provided context from the safety manual. Do not use any external knowledge.

    If the context does not contain the answer, state that you cannot answer based on the provided document.

    Context from the safety manual:
    ---
    {context_str}
    ---

    User's Question: "{question}"

    Answer:
    """

    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        answer = response.text.strip()
        # If the answer is a "cannot answer" message, fallback to Gemini general
        if "cannot answer based on the provided document" in answer.lower():
            response = model.generate_content(question)
            return response.text
        return answer
    except Exception as e:
        error_message = str(e)
        print(f"Error during AI generation: {error_message}")
        if "quota" in error_message.lower():
            return "AI generation failed: The Google API quota was exceeded. This usually means the 'Generative Language API' has not been enabled in your Google Cloud project. Please enable it and try again."
        
        # Return the specific error to the frontend for better debugging
        return f"An unexpected error occurred with the AI service. Details: {error_message}" 