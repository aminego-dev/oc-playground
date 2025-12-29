import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DATABASE_URL", "sqlite:///:memory:"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    done = db.Column(db.Boolean, default=False)


# ✅ Flask 3 compatible DB init
with app.app_context():
    db.create_all()


@app.route("/")
def index():
    return "Todo API with DB is running ✅"


@app.route("/todos", methods=["GET"])
def get_todos():
    todos = Todo.query.all()
    return jsonify(
        [{"id": t.id, "title": t.title, "done": t.done} for t in todos]
    )


@app.route("/todos", methods=["POST"])
def create_todo():
    data = request.get_json()
    todo = Todo(title=data["title"])
    db.session.add(todo)
    db.session.commit()
    return jsonify(
        {"id": todo.id, "title": todo.title, "done": todo.done}
    ), 201


@app.route("/todos/<int:todo_id>", methods=["PUT"])
def update_todo(todo_id):
    todo = Todo.query.get_or_404(todo_id)
    data = request.get_json()
    todo.title = data.get("title", todo.title)
    todo.done = data.get("done", todo.done)
    db.session.commit()
    return jsonify(
        {"id": todo.id, "title": todo.title, "done": todo.done}
    )


@app.route("/todos/<int:todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    todo = Todo.query.get_or_404(todo_id)
    db.session.delete(todo)
    db.session.commit()
    return "", 204

@app.route("/health")
def health():
    return "ok", 200


@app.route("/ready")
def ready():
    try:
        db.session.execute("SELECT 1")
        return "ready", 200
    except Exception as e:
        app.logger.warning(f"DB not ready: {e}")
        return "not ready", 503

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)

