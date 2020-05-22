from flask import Flask, render_template, abort, send_file, redirect, url_for, request, flash
from werkzeug.utils import secure_filename
import os
import shutil

app = Flask(__name__, template_folder='static/templates')


@app.route("/")
@app.route("/home")
def home(path='/FILES', filters=""):
    filepath = './static/FILES/' + path

    files = next(os.walk(filepath))[2]
    dirs = next(os.walk(filepath))[1]

    files2 = []
    dirs2 = []
    if filters != "":
        for f in files:
            if filters in f:
                files2.append(f)
        for d in dirs:
            if filters in d:
                dirs2.append(d)

        files = files2
        dirs = dirs2

    files.sort()
    dirs.sort()

    sw()

    return render_template("index.html", files=files, dirs=dirs, path=path)

@app.route("/dir/<path:req_path>", methods=['GET'])
def listDir(req_path):
    return home(req_path)

@app.route("/file/<path:file_path>", methods=['GET'])
def showFile(file_path):
    path = './static/FILES/' + file_path
    return send_file(path)

@app.route("/delete/<ftype>/<path:file_path>", methods=['GET'])
def dec_removefile(ftype, file_path):

    filename = file_path.split("/")[-1]
    if ftype == "file":
        remtype = "File"
    else:
        remtype = "Directory"

    return render_template("delete.html", name=filename, type=remtype, path=file_path)

@app.route("/delconf/<ftype>/<path:fpath>", methods=['GET'])
def removefile(ftype, fpath):
    path = './static/FILES/' + fpath

    if ftype == "file":
        os.remove(path)
    else:
        shutil.rmtree(path)

    path = fpath.split("/")[:-1]
    path = "/dir/" + "/".join(path)

    return redirect(path)


@app.route("/add/<path:file_path>", methods=['GET'])
def add(file_path):
    return render_template("add.html", path=file_path)

@app.route("/addconf/<ftype>/<path:fpath>", methods=['GET', 'POST'])
def addfile(ftype, fpath):
    path = './static/FILES/' + fpath

    if ftype == "dir":
        try:
            os.mkdir(path)
        except:
            pass

    path = fpath.split("/")[:-1]
    path = "/dir/" + "/".join(path)

    return redirect(path)

def correctname(filename=""):
    checkName = filename.rsplit('.', 1)

    if len(checkName[0]) > 10:
        checkName[0] = checkName[0][:11]

    checkName = '.'.join(checkName)
    return checkName

@app.route("/upload/<path:fpath>", methods=['POST', 'GET'])
def upload(fpath):
    if request.method == 'POST':
        path = './static/FILES/' + fpath
        app.config['UPLOAD_FOLDER'] = path
        f = request.files['ffile']

        if f.filename == '':
            flash('No selected file')
        else:
            filename = secure_filename(f.filename)

            name = correctname(filename)

            f.save(os.path.join(app.config['UPLOAD_FOLDER'], name))
    
    path = fpath.split("/")
    path = "/dir/" + "/".join(path)

    return redirect(path)

@app.route("/filter/<filters>/<path:fpath>")
def filter(filters, fpath):
    return home(fpath, filters)

@app.route('/service-worker.js', methods=['GET'])
def sw():
    return app.send_static_file('service-worker.js')

if __name__ == "__main__":
    app.run(debug=True)