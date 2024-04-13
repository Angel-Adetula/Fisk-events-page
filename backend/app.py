from flask import Flask, jsonify, request, session
from flask_restful import Api
from flask_cors import CORS
from back_end import Backend
import logging
logging.basicConfig(level=logging.INFO)


app = Flask(__name__)
api= Api(app)
CORS(app)

backend = Backend()

@app.route("/", methods=['GET'])
def testing():
    return "Running flask"

@app.route("/signin", methods=['POST'])
def sign_in():
    pwd= request.json["password"]
    usr = request.json["email"]
    hashed_pwd = backend.hash_pwd(username=usr, password=pwd)
    print(hashed_pwd)
    user = (hashed_pwd, usr)
    err, usr_name = backend.authenticate_user(user)
    err_message = None
    if err and err != 404:
        err = err.args[0]
        err_message = err.args[1]
    elif err:
        err_message = f"{usr} does not have an account. Please sign up"
    result = {"error": err, "error_message":err_message, "username":usr_name} 
    return jsonify(result)   


@app.route("/signup", methods=['POST'])
def sign_up():
    pwd= request.json["password"]
    usr = request.json["email"]
    hashed_pwd = backend.hash_pwd(username=usr, password=pwd)
    new_user = {"name":request.json["display_name"], "pwd":hashed_pwd, "email":usr}
    err = backend.add_new_user(new_user=new_user)
    err_message = None
    if err:
        err_message = err.args[1]
        err = str(err.args[0])+"-"+str(err.args[2])
    username = request.json["display_name"][0].upper() + request.json["display_name"][1:]
    result = {"error": err, "error_message":err_message, "username":username} 
    return jsonify(result)
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port = 8080)
