import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from dotenv import load_dotenv
load_dotenv(verbose=True)

url = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
key = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
db: Client = create_client(url, key) 


app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# redirect only occurs if path extends /api (ex. /api/healthchecker (:path) )
@app.get("/api/healthchecker")
async def health():
    response = db.table('notes').select('*').execute()
    return {"status": "ok", "notes": response, "exists": not (db == None)}
