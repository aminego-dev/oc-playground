# backend/app.py
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

# Connect to PostgreSQL
DB_USER = os.environ.get("DB_USER", "todo_user")
DB_PASSWORD = os.environ.get("DB_PASSWORD", "todo_pass")
DB_HOST = os.environ.get("DB_HOST", "todo-db")
DB_NAME = os.environ.get("DB_NAME", "todo")

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:5432/{DB_NAME}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    done = db.Column(db.Boolean, default=False)

@app.route("/todos", methods=["GET"])
def get_todos():
    todos = Todo.query.all()
    return jsonify([{"id": t.id, "title": t.title, "done": t.done} for t in todos])

@app.route("/todos", methods=["POST"])
def create_todo():
    data = request.json
    todo = Todo(title=data["title"])
    db.session.add(todo)
    db.session.commit()
    return jsonify({"id": todo.id, "title": todo.title, "done": todo.done})

if __name__ == "__main__":
    db.create_all()
    app.run(host="0.0.0.0", port=8080)

