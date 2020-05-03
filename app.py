from flask import Flask, render_template
import os

app = Flask(__name__)


@app.route("/")
@app.route("/home")
def home():
    return render_template("index.html")


@app.route("/list/")
def listFiles():
    path = "FILES"
    files = os.listdir(path)
    dirs = next(os.walk('./FILES'))[1]

    for directory in dirs:
        if directory in files:
            files.remove(directory)

    return render_template("index.html", files=files, dirs=dirs)

if __name__ == "__main__":
    app.run(debug=True)
