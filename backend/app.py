from flask import Flask, jsonify, request, session
from flask_restful import Api
# import requests
# from requests.adapters import HTTPAdapter
# from urllib3.poolmanager import PoolManager
# import ssl
from flask_cors import CORS
from back_end import Backend
import logging
logging.basicConfig(level=logging.INFO)


app = Flask(__name__)
api= Api(app)
CORS(app)

backend = Backend()

# class MyAdapter(HTTPAdapter):
#     def init_poolmanager(self, connections, maxsize, block=False):
#         self.poolmanager = PoolManager(num_pools=connections,
#                                        maxsize=maxsize,
#                                        block=block,
#                                        ssl_version=ssl.PROTOCOL_TLSv1)

# s = requests.Session()
# s.mount('https://', MyAdapter())

@app.route("/", methods=['GET'])
def testing():
    return "Running flask"

@app.route("/signin", methods=['POST'])
def sign_in():
    pwd= request.json["password"]
    usr = request.json["email"]
    hashed_pwd = backend.hash_pwd(username=usr, password=pwd)
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


# @app.route("/user-events/<userId>", methods=['GET'])
# def get_user_events(userId):
#     userEvents = backend.retrieve_user_events(userId=userId)
#     return jsonify({"userEvents": userEvents})

@app.route("/events", methods=['POST'])
def add_event():
    event = request.json["event"]
    event_added = backend.add_events(event)
    return jsonify({"event_added": event_added})

@app.route("/orgs", methods=['POST'])
def add_org():
    org_name = request.json["org_name"]
    usr = request.json["usr"]
    err, orgID = backend.add_new_org(org_name=org_name, user=usr)
    if err:
        result = {"error": err.args, "orgID":None, "orgName": None}
    else:
        result = {"error": None, "orgID":orgID, "orgName":org_name}
    return jsonify(result)

@app.route("/join-orgs", methods=['POST'])
def join_org():
    user_info = request.json["user_info"]
    err = backend.join_org(user_info)
    if err:
        result = {"error": err.args}
    else:
        result = {"error": None}
    return jsonify(result)

@app.route("/orgs", methods=['DELETE'])
def leave_org():
    org_id = request.json["org_id"]
    usr = request.json["usr"]
    err = backend.leave_org(org_id=org_id, user=usr)
    if err:
        result = {"error": err.args}
    else:
        result = {"error": None}
    return jsonify(result)


@app.route("/orgs", methods=['GET'])
def retrieve_orgs():
    r, err = backend.retrieve_orgs()
    if err:
        result = {"error": err.args, "result":None}
    else:
        result = {"error": None, "result": r}
    return jsonify(result) 

@app.route("/orgs/<userId>", methods=['GET'])
def get_user_orgs(userId):
    userOrgs = backend.retrieve_user_orgs(usr=userId)
    err = userOrgs[1]
    if userOrgs[1]:
        err= userOrgs[1].args
    return jsonify({"error":err, "result":userOrgs[0]})

@app.route("/user-orgs/<userId>", methods=['GET'])
def get_user_org(userId):
    userOrgs = backend.retrieve_users_org_only(usr=userId)
    err = userOrgs[1]
    if userOrgs[1]:
        err= userOrgs[1].args
    return jsonify({"error":err, "result":userOrgs[0]})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port = 8080)