from flask import Flask, render_template, abort, send_file, redirect, url_for, request
import os
import shutil

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

    return redirect("/dir/FILES")


@app.route("/add/<path:file_path>", methods=['GET'])
def add(file_path):
    return render_template("add.html")

@app.route("/addconf/<path:fpath>", methods=['GET', 'POST'])
def addfile(fpath):
    if request.method == "POST":
        #path = './static/FILES/' + fpath
        ftype = request.form
        print(ftype)
    
    return redirect("/dir/FILES")


@app.route('/service-worker.js', methods=['GET'])
def sw():
    return app.send_static_file('service-worker.js')

if __name__ == "__main__":
    app.run(debug=True)