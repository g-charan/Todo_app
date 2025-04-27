from . import todos_bp
from flask import Blueprint, request, jsonify


data = [
    {"name":"task1","pos":1},
    {"name":"task2","pos":2},
    {"name":"task3","pos":3},
    
]


@todos_bp.route('/getTodos', methods=['GET'])
def home():
    return jsonify(data)

@todos_bp.route("/postTodos",methods=['POST'])
def post_todo():
    name = request.json
    data.append({"name": name['name'], "pos": len(data) + 1})
    return jsonify(data), 201

@todos_bp.route("/deleteTodos/<pos>",methods=['DELETE'])
def delete_todo(pos):
    try:
        pos = int(pos)
        for i in range(len(data)):
            if data[i]['pos'] == pos:
                data.pop(i)
                break
        for i in range(len(data)):
            if data[i]['pos'] > pos:
                data[i]['pos'] -= 1
        return jsonify(data), 200
        return jsonify(pos), 200
    except Exception as e:
        return "error"