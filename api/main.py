from fastapi import FastAPI, Header, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
import os
import datetime
from sqlmodel import SQLModel, Session, create_engine, Field, select
from typing import Optional

class BlogPost(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    category: str
    description: str
    thumbnail_url: str
    body: str
    date: str = Field(default_factory=lambda: datetime.datetime.now().isoformat())

engine = create_engine(os.environ.get("DATABASE_URL") or "sqlite:///ckay9dev.db")
def get_session():
    with Session(engine) as session:
        yield session

SQLModel.metadata.create_all(engine)

def verify_auth_token(authorization: Annotated[str | None, Header()] = None):
    if not authorization:
        return False

    secret = os.environ.get("SECRET_AUTH_KEY")
    print(secret, authorization)
    return secret == authorization

app = FastAPI()

origins = (os.environ.get("ALLOWED_HOSTS") or "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/blog/page/{page}")
def get_posts(
    page: int,
    session: Session = Depends(get_session),
):
    offset = (page - 1) * 20
    statement = select(BlogPost).offset(offset).limit(20)
    return session.exec(statement).all()



@app.get("/blog/projects")
def get_projects(session: Session = Depends(get_session)):
    statement = select(BlogPost).where(BlogPost.category == "project")
    return session.exec(statement).all()


@app.get("/blog/{blog_id}")
def get_post(
    blog_id: int,
    session: Session = Depends(get_session),
):
    post = session.get(BlogPost, blog_id)
    if not post:
        raise HTTPException(404)
    return post



@app.post("/blog")
def create_post(
    blog: BlogPost,
    authorization: str | None = Header(None),
    session: Session = Depends(get_session),
):
    if not verify_auth_token(authorization):
        raise HTTPException(status_code=401)

    session.add(blog)
    session.commit()
    session.refresh(blog)
    return blog
