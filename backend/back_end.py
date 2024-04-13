import hashlib
from connect_dbs import *

SITE_SECRET = "cami"

class Backend:

    def __init__(self):
        self.sql_conn = connect_to_sql()
        self.sql_cursor = self.sql_conn.cursor()
        # self.mongo_conn = connect_to_mongo()

    def hash_pwd(self, username, password):
        '''
        This method takes in a username and password, and returns the hashed password.
        '''
        user_name = username.lower()
        with_salt = f"{user_name}{SITE_SECRET}{password}"
        hashed_pwd = hashlib.blake2b(with_salt.encode()).hexdigest()
        return hashed_pwd
    
    def add_new_user(self, new_user) :
        try:
            insert_string = "INSERT INTO users (name, password, email) VALUES (%s, %s, %s)"
            user_details = (new_user["name"], new_user["pwd"], new_user["email"])
            self.sql_cursor.execute(insert_string, user_details)
            self.sql_conn.commit()
        except Exception as e:
            logging.error(f"ERROR: An error has occured: {e}")
            return e
        else:
            logging.info(f"User {new_user['name']} added successfully")
            return None
    
    def authenticate_user(self, pwd_email:tuple):
        try:
            query = "SELECT name FROM users WHERE (password = %s) AND (email = %s)"
            self.sql_cursor.execute(query, pwd_email)
        except Exception as e:
            logging.error(f"ERROR: An error has occured: {e}")
            return e
        else:
            result = self.sql_cursor.fetchall()
            if not result:
                logging.info(f"{pwd_email[1]} does not have an account")  
                return (404, None)
            else:
                user= result[0][0]
                user = user[0].upper() + user[1:]
                return(None, user)       
