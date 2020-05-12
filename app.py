from flask import Flask, render_template, abort, send_file, redirect, url_for
import os

app = Flask(__name__, template_folder='static/templates')


@app.route("/")
@app.route("/home")
def home(path=''):
    filepath = './static/FILES/' + path

    files = next(os.walk(filepath))[2]
    dirs = next(os.walk(filepath))[1]

    files.sort()
    dirs.sort()

    sw()

    return render_template("index.html", files=files, dirs=dirs, path=path)

@app.route("/dir/<path:req_path>", methods=['GET'])
def listDir(req_path):

    return home(req_path)

@app.route("/delete/file/<path:file_path>")
def dec_removefile(file_path):

    filename = file_path.split("/")[-1]
    #file_path = './FILES/' + file_path

    return render_template("delete.html", name=filename, type="File", path=file_path)

@app.route("/delete/dir/<path:file_path>")
def dec_removedir(file_path):

    filename = file_path.split("/")[-1]
    file_path = './static/FILES/' + file_path

    return render_template("delete.html", name=filename, type="Directory")

@app.route("/delconf/file/<path:file_path>")
def removefile(file_path):
    file_path = './static/FILES/' + file_path
    os.remove(file_path)

    return redirect(url_for('home'))

@app.route('/service-worker.js')
def sw():
    return app.send_static_file('service-worker.js')

if __name__ == "__main__":
    app.run(debug=True)



