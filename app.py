from flask import Flask
import socket
import os
import time

app = Flask(__name__)

@app.route("/")
def hello():
    return f"""
Hello from OpenShift!

Pod: {socket.gethostname()}
Time: {time.time()}
"""

@app.route("/healthz")
def healthz():
    if os.path.exists("/tmp/down"):
        return "NOT READY", 500
    return "OK"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
