import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
from dotenv import load_dotenv
from neo4j import GraphDatabase
from typing import List
from ssl import create_default_context


load_dotenv(verbose=True)

url = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
key = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
NEO_4J_URI = os.getenv("NEXT_PUBLIC_NEO_4J_URI")
NEO_4J_USER = os.getenv("NEXT_PUBLIC_NEO_4J_USERNAME")
NEO_4J_PASSWORD = os.getenv("NEXT_PUBLIC_NEO_4J_PASSWORD")


db: Client = create_client(url, key)
NEO_4J_URI = os.getenv("NEXT_PUBLIC_NEO_4J_URI")
NEO_4J_USER = os.getenv("NEXT_PUBLIC_NEO_4J_USERNAME")
NEO_4J_PASSWORD = os.getenv("NEXT_PUBLIC_NEO_4J_PASSWORD")


with GraphDatabase.driver(NEO_4J_URI, auth=(NEO_4J_USER, NEO_4J_PASSWORD)) as driver:
    driver.verify_connectivity()

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class User(BaseModel):
    email: str
    password: str
    user_type: str  # 'club' or 'student'

class Event(BaseModel):
    name: str
    description: str
    date: str  # or datetime if needed
    start_time: str
    end_time: str
    location: str
    long: str
    lat: str
    type: str
    image: str = "img.png"
    email: str

class Pin(BaseModel):
    event_id: int
    lat: float
    long: float

class ClubInfo(BaseModel):
    club_email: str
    club_description: str
    image_url: str

class StudentInfo(BaseModel):
    student_email: str
    club_description: str
    image_url: str

class RSVP(BaseModel):
    email: str
    event_name: str

    
# redirect only occurs if path extends /api (ex. /api/healthchecker (:path) )
@app.get("/api/healthchecker")
async def health():
    response = db.table("notes").select("*").execute()
    records, summary, keys = driver.execute_query(
        "MATCH (s:Student)-[r]->(m) return s,r,m", database="neo4j"
    )
    return {
        "status": "ok",
        "notes": response,
        "exists": not (db == None),
        "graph data": list(records),
    }


@app.post("/api/create-user")
async def create_user(user: User):
    role = "Student" if user.user_type == "student" else "Club"
    try:
        query = f"""CREATE (s:{role} {{email: '{user.email}', password: '{user.password}', user_points: 0, club_description: '', image_url: '', name: '' }}) RETURN s"""
        records, _, _ = driver.execute_query(query, database="neo4j")
        return {"status": "ok", "user": records[0]}
    except Exception as e:
        return {"status": "error", "error": str(e)} 
    
@app.get("/api/events")
async def get_events():
    try:
        query = "MATCH (e:Event) RETURN e"
        records, _, _ = driver.execute_query(query, database="neo4j")
        return {"status": "ok", "events": list(records)}
    except Exception as e:
        return {"status": "error", "error": str(e)}
    
 
@app.get("/api/students")
async def get_students():
    try:
        query = "MATCH (e:Student) RETURN e"
        records, _, _ = driver.execute_query(query, database="neo4j")
        return {"status": "ok", "events": list(records)}
    except Exception as e:
        return {"status": "error", "error": str(e)}
    

@app.get("/api/topStudents")
async def get_students():
    try:
        query = "MATCH (s:Student) RETURN s.email ORDER BY s.user_points DESC"
        records, _, _ = driver.execute_query(query, database="neo4j")
        return {"status": "ok", "events": list(records)}
    except Exception as e:
        return {"status": "error", "error": str(e)}
    

@app.get("/api/clubs")
async def get_events():
    try:
        query = "MATCH (e:Club) RETURN e"
        records, _, _ = driver.execute_query(query, database="neo4j")
        return {"status": "ok", "events": list(records)}
    except Exception as e:
        return {"status": "error", "error": str(e)}


@app.get("/api/topClubs")
async def get_students():
    try:
        query = "MATCH (c:Club) RETURN c.name ORDER BY c.club_points DESC"
        records, _, _ = driver.execute_query(query, database="neo4j")
        return {"status": "ok", "events": list(records)}
    except Exception as e:
        return {"status": "error", "error": str(e)}


@app.post("/api/createEvents")
async def create_event(event: Event):
    print(event) 
    try:
        query = f"\
        CREATE (n:Event {{\
            date: '{event.date}',\
            image: '{event.image}', \
            start_time: '{event.start_time}', \
            name: '{event.name}', \
            end_time: '{event.end_time}', \
            description: '{event.description}', \
            location: '{event.location}', \
            type: '{event.type}', \
            long: '{event.long}', \
            lat: '{event.lat}', \
            email: '{event.email}' \
        }})<-[r:RUNNING]-(c:Club {{email: '{event.email}'}}) RETURN ID(n) \
        "
        
        records, _, _ = driver.execute_query(query, database="neo4j")
        return {"status": "ok", "event": records[0]}
    except Exception as e:
        return {"status": "error", "error": str(e)}
    

@app.post("/api/updateEventLocation/")
async def update_event_location(pin: Pin):
    event_id = pin.event_id
    lat = pin.lat
    long = pin.long
    try:
        query = f"""
        MATCH (e:Event)
        WHERE ID(e) = {event_id}
        SET e.lat = '{lat}', e.long = '{long}'
        RETURN e
        """
        records, _, _ = driver.execute_query(query, database="neo4j")
        return {"status": "ok", "event": records[0]}
    except Exception as e:
        return {"status": "error", "error": str(e)}
    
@app.post("/api/updateClubInfo")
async def update_club_info(club_info: ClubInfo):
    try:
        club_email = club_info.club_email
        club_description = club_info.club_description
        image_url = club_info.image_url
        
        query = f"""
        MATCH (c:Club)
        WHERE c.email = '{club_email}'
        SET c.club_description = '{club_description}', c.image_url = '{image_url}'
        RETURN c
        """
        
        records, _, _ = driver.execute_query(query, database="neo4j")
        return {"status": "ok", "club": records[0]}
    except Exception as e:
        return {"status": "error", "error": str(e)}

@app.post("/api/updateStudentInfo")
async def update_student_info(student_info: StudentInfo):
    try:
        student_email = student_info.student_email
        club_description = student_info.club_description
        image_url = student_info.image_url
        
        query = f"""
        MATCH (s:Student)
        WHERE s.email = '{student_email}'
        SET s.club_description = '{club_description}', s.image_url = '{image_url}'
        RETURN s
        """
        
        records, _, _ = driver.execute_query(query, database="neo4j")
        return {"status": "ok", "student": records[0]}
    except Exception as e:
        return {"status": "error", "error": str(e)}
    

@app.post("/api/rsvp")
async def rsvp(rsvp: RSVP):
    email = rsvp.email
    event_name = rsvp.event_name
    try:
        query = f"""
        MATCH (e:Event)
        WHERE e.name = '{event_name}'
        SET e.people = COALESCE(e.people, []) + ['{email}']
        RETURN e
        """
        records, _, _ = driver.execute_query(query, database="neo4j")
        return {"status": "ok", "event": records[0]}
    except Exception as e:
        return {"status": "error", "error": str(e)}
