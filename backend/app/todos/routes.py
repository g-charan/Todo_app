from . import todos_bp
from flask import Blueprint, request, jsonify
from .models import Todo
from app.extensions import db
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Session

data = [
    {"name":"task1","pos":1},
    {"name":"task2","pos":2},
    {"name":"task3","pos":3},
    
]


@todos_bp.route('/getTodos', methods=['GET'])
def home():
    todos = Todo.query.all()
    data1 = []
    for todo in todos:
        data1.append({
            "name": todo.title,
            "pos": todo.todo_id
        })
    return jsonify(data1)

@todos_bp.route("/postTodos",methods=['POST'])
def post_todo():
    name = request.json
    data.append({"name": name['name'], "pos": len(data) + 1})
    return jsonify(data), 201

@todos_bp.route("/deleteTodos/<todo_id>",methods=['DELETE'])
def delete_todo(todo_id):
    try:
        session: Session = db.session
        todo_to_delete = session.get(Todo, todo_id)
        # todo_to_delete = session.query(Todo).filter_by(todo_id=todo_id).first()
        # todo_to_delete = session.query(Todo).filter(Todo.todo_id == todo_id).first()
        if todo_to_delete:
            session.delete(todo_to_delete)
            session.commit()
            return jsonify({"message": "Todo deleted successfully"}), 200
        else:
            return jsonify({"message": "Todo not found"}), 404
    except Exception as e:
        return "error"