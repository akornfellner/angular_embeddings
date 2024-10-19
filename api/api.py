from flask import Flask, request, jsonify
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer("all-mpnet-base-v2")


def similarity(text1, text2):
    embeddings1 = model.encode(text1)
    embeddings2 = model.encode(text2)
    return np.dot(embeddings1, embeddings2)


app = Flask(__name__)
CORS(app)


@app.route("/similarity", methods=["POST"])
def sum_numbers():
    data = request.get_json()
    text1 = data.get("text1")
    text2 = data.get("text2")
    if text1 is None or text2 is None:
        return jsonify({"error": "Invalid input"}), 400
    try:
        result = int(similarity(text1, text2) * 1000)
    except ValueError:
        return jsonify({"error": "Invalid numbers"}), 400
    return jsonify({"similarity": result})


if __name__ == "__main__":
    app.run(debug=True)
