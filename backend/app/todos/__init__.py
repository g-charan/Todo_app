from flask import Blueprint

todos_bp = Blueprint('todos', __name__)

from . import routes