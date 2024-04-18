import mysql.connector
# import mysqlx
from pymongo import MongoClient
import logging
logging.basicConfig(level=logging.INFO, filename = "connect_-log.log", filemode="w")

HOST = "localhost"
USERNAME = "fiskevents"
PASSWORD = "FiskEvents1"
DATABASE = "fiskevents"

CONNECTION_STRING = "mongodb+srv://adetulaangel1:7G0v3tSqbThLYvoH@cluster0.ec0htqg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

def connect_to_sql():
    mydb = mysql.connector.connect(
        host = HOST,
        user = USERNAME,
        password = PASSWORD,
        database = DATABASE,
    )
    return mydb

def connect_to_mongo():
    client = MongoClient(CONNECTION_STRING)
    return client["Fisk-Events-Page"]













