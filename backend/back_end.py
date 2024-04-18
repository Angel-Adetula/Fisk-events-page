import hashlib
from connect_dbs import *

SITE_SECRET = "cami"

class Backend:

    def __init__(self):
        self.sql_conn = connect_to_sql()
        self.sql_cursor = self.sql_conn.cursor(buffered=True)
        self.mongo_conn = connect_to_mongo()

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
            insert_string = "INSERT INTO users (name, password, email) VALUES (%s, %s, %s);"
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
            query = "SELECT name FROM users WHERE (password = %s) AND (email = %s);"
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

    def retrieve_user_events(self, userId):
        events =  self.mongo_conn["Events"]
        cursor = events.find({"user_id":userId})
        user_events = []
        for event in cursor:
            del event["_id"]
            user_events.append(event)
        return user_events

    def add_events(self, event):
        events =  self.mongo_conn["Events"]
        cursor = events.insert_one(event)
        if not cursor.acknowledged:
            logging.error("Error: Event not added")
            return False
        else:
            logging.info("Success: Event added")
            return True
        
    def add_new_org(self, org_name, user):
        try:
            org_id_query = "SELECT COUNT(*) from organizations;"
            self.sql_cursor.execute(org_id_query)
            result = self.sql_cursor.fetchone()[0]
            orgID = f"O{1001 + result}"
            logging.info("reach")
            insert_string = "INSERT INTO organizations (OrgID, name) VALUES (%s, %s);"
            self.sql_cursor.execute(insert_string, (orgID, org_name,))
            insert_string = "INSERT INTO userorg (OrgID, user, role, approved) VALUES (%s, %s, %s, %s);"
            self.sql_cursor.execute(insert_string, (orgID, user, "Executive", 1,))
            self.sql_conn.commit()
        except Exception as e:
            logging.error(f"ERROR: An error has occured: {e}")
            return (e, None)
        else:
            logging.info(f"Organization {org_name} added successfully")
            return (None, orgID)
    
    def leave_org(self, org_id, user):
        try:
            org_id_query = "DELETE from userorg WHERE OrgID= %s AND user = %s;"
            self.sql_cursor.execute(org_id_query, (org_id, user))
            self.sql_conn.commit()
        except Exception as e:
            logging.error(f"ERROR: An error has occured: {e}")
            return e
        else:
            logging.info(f"User {user} left Organization {org_id} ")
            return None
        
    def join_org(self, user_info):
        try:
            if len(user_info) == 3:
                org_id_query = "INSERT INTO userorg (OrgID, user, role, approved) VALUES (%s, %s, %s, NULL);"
            elif len(user_info) == 4:
                org_id_query = "INSERT INTO userorg (OrgID, user, role, approved) VALUES (%s, %s, %s, %s);"
            else:
                raise Exception(user_info)
            self.sql_cursor.execute(org_id_query, user_info)
            self.sql_conn.commit()
        except Exception as e:
            logging.error(f"ERROR: An error has occured: {e}")
            return e
        else:
            logging.info(f"User {user_info[1]} joined Organization {user_info[0]} ")
            return None
    
    def retrieve_orgs(self):
        try:
            orgs_query = "SELECT * FROM organizations;"
            self.sql_cursor.execute(orgs_query)
            result = self.sql_cursor.fetchall()
        except Exception as e:
            logging.error(f"ALL ORGS ERROR: An error has occured: {e}")
            return (None, e)
        else:
            return (result, None)
    
    def retrieve_user_orgs(self, usr):
        try:
            orgs_query = "SELECT * from userorg WHERE user = %s;"
            
            self.sql_cursor.execute(orgs_query, (usr,))
            result = self.sql_cursor.fetchall()
        except Exception as e:
            logging.error(f"USER ORG ERROR: An error has occured: {e}")
            return (None, e)
        else:
            logging.info(f"Organizations retrieved successfully")
            return (result, None)
    
    def retrieve_users_org_only(self, usr):
        try:
            orgs_query = '''SELECT name FROM organizations 
                WHERE orgid IN (
                    SELECT OrgID FROM userorg 
                    WHERE user = %s AND role = 'Executive'
                );'''
            
            self.sql_cursor.execute(orgs_query, (usr,))
            result = self.sql_cursor.fetchall()
        except Exception as e:
            logging.error(f"USER ORG ONLY ERROR: An error has occured: {e}")
            return (None, e)
        else:
            logging.info(f"User Organizations retrieved successfully")
            return (result, None)

