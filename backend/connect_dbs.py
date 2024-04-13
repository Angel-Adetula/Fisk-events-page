import mysql.connector
import logging
logging.basicConfig(level=logging.INFO, filename = "connect_-log.log", filemode="w")

HOST = "localhost"
USERNAME = "fiskevents"
PASSWORD = "FiskEvents1"
DATABASE = "fiskevents"

def connect_to_sql():
    mydb = mysql.connector.connect(
        host = HOST,
        user = USERNAME,
        password = PASSWORD,
        database = DATABASE,
    )
    return mydb









