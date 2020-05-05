from flask import Flask, render_template, abort, send_file
import os
import re

app = Flask(__name__)

@app.route("/")
@app.route("/home")
def home(path=''):
    filepath = './FILES/' + path

    files = next(os.walk(filepath))[2]
    dirs = next(os.walk(filepath))[1]

    return render_template("index.html", files=files, dirs=dirs, path=path)

@app.route("/<path:req_path>")
def listDir(req_path):
    path = os.path.join(req_path)
    
    while path[:6] == 'FILES/':
        path = path[6:]

    return home(path)

if __name__ == "__main__":
    app.run(debug=True)



