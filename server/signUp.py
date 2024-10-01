from fastapi import FastAPI 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import uuid

class UserInfo(BaseModel):
    fname: str
    lname: str
    email: str
    psswrd: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def sqlTest(data):
    conn = sqlite3.connect('test.db')

    cursor = conn.cursor()

    cursor.execute('''CREATE TABLE IF NOT EXISTS accounts
                    (first_name, last_name, password, email, uuid)''')
    cursor.execute("INSERT INTO accounts VALUES ('"+str(data["first_name"])+"','"+str(data["last_name"])+"','"+str(data["password"])+"','"+str(data["email"])+"','"+str(data["uuid"])+"')")

    conn.commit()
    
    conn.close()

@app.post("/registerNewAccount")
def createNewAccount(data: UserInfo):
    new_uuid = uuid.uuid4()
    data = {
        "first_name": data.fname,
        "last_name": data.lname,
        "email": data.email,
        "password": data.psswrd,
        "uuid": new_uuid
    }

    sqlTest(data)

    return data