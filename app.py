from flask import Flask, render_template, abort, send_file
import os

app = Flask(__name__, template_folder='static/templates')


@app.route("/")
@app.route("/home")
def home(path=''):
    filepath = './FILES/' + path

    print('PATH', path)

    files = next(os.walk(filepath))[2]
    dirs = next(os.walk(filepath))[1]

    files.sort()
    dirs.sort()

    sw()

    return render_template("index.html", files=files, dirs=dirs, path=path)

@app.route("/dir/<string:req_path>")
def listDir(req_path):

    return home(req_path)

@app.route('/service-worker.js')
def sw():
    return app.send_static_file('service-worker.js')

if __name__ == "__main__":
    app.run(debug=True)



