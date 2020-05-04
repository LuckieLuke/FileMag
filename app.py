from flask import Flask, render_template
import os

app = Flask(__name__)


@app.route("/")
@app.route("/home")
@app.route("/list/")
def home():
    files = next(os.walk('./FILES'))[2]
    dirs = next(os.walk('./FILES'))[1]

    return render_template("index.html", files=files, dirs=dirs)

if __name__ == "__main__":
    app.run(debug=True)
