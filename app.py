from flask import Flask, render_template, abort, send_file
import os

app = Flask(__name__)


@app.route("/")
@app.route("/home")
def home(path=''):
    filepath = './FILES/' + path

    print('PATH', path)

    files = next(os.walk(filepath))[2]
    dirs = next(os.walk(filepath))[1]

    files.sort()
    dirs.sort()

    return render_template("index.html", files=files, dirs=dirs, path=path)

@app.route("/<path:req_path>")
def listDir(req_path):

    return home(req_path)

if __name__ == "__main__":
    app.run(debug=True)



