import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
import nltk
from dotenv import load_dotenv
import google.generativeai as genai
import json

from utils import parse_pdf, chunk_text
from model import DocumentSearch
from routing import load_map, find_route
from qa_ai import configure_ai, generate_ai_answer

# Load environment variables
load_dotenv()

# Configuration
UPLOAD_FOLDER = 'data'
ALLOWED_EXTENSIONS = {'pdf'}
INCIDENTS_FILE = 'data/incidents.json'

# App Initialization
app = Flask(__name__, static_folder='public', static_url_path='')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

# Configure Generative AI
try:
    genai.configure(api_key=os.environ['GOOGLE_API_KEY'])
    generation_model = genai.GenerativeModel('gemini-pro')
except Exception as e:
    print(f"Error configuring Generative AI: {e}")
    generation_model = None

# Download NLTK data
for resource in ['punkt', 'punkt_tab']:
    try:
        nltk.data.find(f'tokenizers/{resource}')
    except LookupError:
        nltk.download(resource)

# Configure AI
configure_ai()

# Initialize models
doc_search = DocumentSearch()
refinery_graph = load_map()

def allowed_file(filename):
    """Checks if a file has an allowed extension."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def load_incidents():
    if not os.path.exists(INCIDENTS_FILE):
        return []
    with open(INCIDENTS_FILE, 'r') as f:
        return json.load(f)

def save_incidents(incidents):
    os.makedirs(os.path.dirname(INCIDENTS_FILE), exist_ok=True)
    with open(INCIDENTS_FILE, 'w') as f:
        json.dump(incidents, f)

@app.route('/', methods=['GET'])
def index():
    """Serves the frontend's index.html file."""
    return app.send_static_file('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    """
    Handles PDF file uploads, processes them, and indexes the content.
    """
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        file.save(filepath)

        # Process the PDF
        text = parse_pdf(filepath)
        chunks = chunk_text(text)
        doc_search.embed_and_index(chunks)

        return jsonify({"message": "File processed and indexed successfully."}), 200
    else:
        return jsonify({"error": "File type not allowed"}), 400

@app.route('/ask', methods=['POST'])
def ask_question():
    """
    Accepts a question and returns relevant text chunks from indexed documents.
    """
    data = request.get_json()
    if not data or 'question' not in data:
        return jsonify({"error": "Invalid request body"}), 400
    
    question = data['question']
    chunks = doc_search.search(question)
    
    # Generate a conversational answer using the AI model
    answer = generate_ai_answer(question, chunks)
    
    return jsonify({"answer": answer}), 200

@app.route('/route', methods=['POST'])
def get_route():
    """
    Calculates the fastest route in the refinery, avoiding blocked nodes.
    """
    data = request.get_json()
    if not data or 'from' not in data or 'to' not in data:
        return jsonify({"error": "Invalid request body"}), 400
    
    start_node = data['from']
    end_node = data['to']
    blocked_nodes = data.get('blocked', [])

    route = find_route(refinery_graph, start_node, end_node, blocked_nodes)

    if route:
        return jsonify({"route": route}), 200
    else:
        return jsonify({"error": "No path found"}), 404

@app.route('/report-incident', methods=['POST'])
def report_incident():
    data = request.get_json()
    required = ['hazard_type', 'description', 'location']
    if not data or not all(k in data for k in required):
        return jsonify({'error': 'Missing required fields'}), 400
    incidents = load_incidents()
    incident = {
        'hazard_type': data['hazard_type'],
        'description': data['description'],
        'location': data['location'],
        'timestamp': data.get('timestamp') or __import__('datetime').datetime.now().isoformat()
    }
    incidents.append(incident)
    save_incidents(incidents)
    return jsonify({'message': 'Incident reported successfully.'}), 200

@app.route('/incidents', methods=['GET'])
def get_incidents():
    incidents = load_incidents()
    return jsonify({'incidents': incidents}), 200

if __name__ == '__main__':
    app.run(debug=True) 