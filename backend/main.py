from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


data = [
    {"name":"task1","pos":1},
    {"name":"task2","pos":2},
    {"name":"task3","pos":3},
]

@app.route('/getTodos', methods=['GET'])
def home():
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)