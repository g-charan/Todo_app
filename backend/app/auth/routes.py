from . import auth_bp
from flask import request, jsonify

@auth_bp.route('/', methods=['GET'])
def test():
    return "Hello, World!"