from sqlalchemy import BigInteger
from sqlalchemy import SmallInteger
from sqlalchemy import Numeric
from sqlalchemy import Date
from sqlalchemy import String
from sqlalchemy import TIMESTAMP
from sqlalchemy import ForeignKey

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.models.base import Base

from datetime import datetime

from app.models.resident import Resident

class Bill(Base):

    __tablename__ = "bills"

    bill_id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True
    )

    resident_id: Mapped[int] = mapped_column(
        BigInteger,
        
    )

    bill_month: Mapped[int] = mapped_column(
        SmallInteger
    )

    bill_year: Mapped[int] = mapped_column(
        SmallInteger
    )

    amount: Mapped[float] = mapped_column(
        Numeric(10, 2)
    )

    due_date: Mapped[Date] = mapped_column(
        Date
    )

    generated_on: Mapped[Date] = mapped_column(
        Date
    )

    status: Mapped[str] = mapped_column(
        String(20)
    )

    created_at: Mapped[TIMESTAMP] = mapped_column(
        TIMESTAMP
    )

    created_by: Mapped[str] = mapped_column(
        String(100)
    )

    updated_at: Mapped[TIMESTAMP] = mapped_column(
        TIMESTAMP
    )

    updated_by: Mapped[str] = mapped_column(
        String(100)
    )

  