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
    resident_id: int | None = None
    society_id: int
    flat_no: str
    block_name: str
    owner_name: str
    mobile_no: str
    email: str | None = None
    occupancy_status: str = "OWNER"
    maintenance_amount: float = 2500


class ResidentResponse(BaseModel):
    resident_id: int
    society_id: int
    flat_no: str
    block_name: str
    owner_name: str
    mobile_no: str
    email: Optional[str]
    occupancy_status: str
    maintenance_amount: float

    model_config = {
        "from_attributes": True
    }