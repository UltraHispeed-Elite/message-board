from fastapi import FastAPI 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3

class Item(BaseModel):
    name: str
    message: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def sqlTest(val1, val2):
    conn = sqlite3.connect('test.db')

    cursor = conn.cursor()

    cursor.execute('''CREATE TABLE IF NOT EXISTS messages
                    (name, contents)''')
    cursor.execute("INSERT INTO messages VALUES ('"+str(val1)+"','"+str(val2)+"')")

    conn.commit()
    
    conn.close()

def sqlTest2():
    conn = sqlite3.connect('test.db')

    cursor = conn.cursor()

    cursor.execute('select * from messages')
    data = cursor.fetchall()

    conn.close()

    return data
    

@app.get("/message_list")
async def list():
    return {"data": sqlTest2()}


@app.post("/messaged")
async def test(item: Item):
    print(item)
    print(item.message)
    sqlTest(item.name, item.message)
    return item