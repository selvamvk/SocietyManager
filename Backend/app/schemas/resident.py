from pydantic import BaseModel
from typing import Optional


class ResidentCreate(BaseModel):
    society_id: int
    flat_no: str
    block_name: str
    owner_name: str
    mobile_no: str
    email: Optional[str] = None
    occupancy_status: str
    maintenance_amount: float


class ResidentUpdate(BaseModel):
    owner_name: str
    mobile_no: str
    email: Optional[str] = None
    occupancy_status: str
    maintenance_amount: float


class ResidentResponse(BaseModel):
    resident_id: int
    society_id: int
    flat_no: str
    block_name: str
    owner_name: str
    mobile_no: str
    email: Optional[str]

    model_config = {
        "from_attributes": True
    }