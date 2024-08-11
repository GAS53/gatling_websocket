from pydantic import BaseModel

class Base(BaseModel):
    first_name: str
    age: int