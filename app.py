from flask import Flask, render_template, request
import socket
import datetime

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html", pod=socket.gethostname(), now=datetime.datetime.now())

@app.route("/hello/<name>")
def hello(name):
    return f"Hello, {name}! This pod is {socket.gethostname()}"

@app.route("/info")
def info():
    return f"Current time: {datetime.datetime.now()} | Pod: {socket.gethostname()}"

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)

