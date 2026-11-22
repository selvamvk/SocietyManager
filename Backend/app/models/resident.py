from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from sqlalchemy import BigInteger
from sqlalchemy import String
from sqlalchemy import Numeric
from sqlalchemy import Boolean
from sqlalchemy import Date
from sqlalchemy import Text
from sqlalchemy import TIMESTAMP

from app.models.base import Base

from pydantic import BaseModel
from typing import Optional

class Base(DeclarativeBase):
    pass

class Resident(Base):
    __tablename__ = "residents"

    resident_id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True
    )

    society_id: Mapped[int] = mapped_column(
        BigInteger
    )

    flat_no: Mapped[str] = mapped_column(
        String(20)
    )

    block_name: Mapped[str] = mapped_column(
        String(20)
    )

    owner_name: Mapped[str] = mapped_column(
        String(100)
    )

    mobile_no: Mapped[str] = mapped_column(
        String(15)
    )

    email: Mapped[str] = mapped_column(
        String(100)
    )

    occupancy_status: Mapped[str] = mapped_column(
        String(10)
    )

    maintenance_amount: Mapped[float] = mapped_column(
        Numeric(10,2)
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean
    )

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


