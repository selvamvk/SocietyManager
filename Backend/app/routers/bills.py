from datetime import date

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.resident import Resident
from app.models.bill import Bill

from app.schemas.bill import GenerateBillRequest

from datetime import datetime

router = APIRouter(
    prefix="/bills",
    tags=["Bills"]
)

@router.post("/generate")
def generate_bills(
    request: GenerateBillRequest,
    db: Session = Depends(get_db)
):

    residents = (
        db.query(Resident)
        .filter(
            Resident.is_active == True
        )
        .all()
    )

    generated_count = 0

    for resident in residents:

        existing_bill = (
            db.query(Bill)
            .filter(
                Bill.resident_id ==
                resident.resident_id,

                Bill.bill_month ==
                request.bill_month,

                Bill.bill_year ==
                request.bill_year
            )
            .first()
        )

        if existing_bill:
            continue

        bill = Bill(

            resident_id=
                resident.resident_id,

            bill_month=
                request.bill_month,

            bill_year=
                request.bill_year,

            amount=
                resident.maintenance_amount,

            due_date=
                date(
                    request.bill_year,
                    request.bill_month,
                    10
                ),

            generated_on=
                date.today(),

            status="PENDING",
            created_at=datetime.now(),
            created_by="SYSTEM",
            updated_at=datetime.now(),
            updated_by="SYSTEM"


        )

        db.add(bill)

        generated_count += 1

    db.commit()

    return {
        "message":
            f"{generated_count} bills generated",
        "generated_count":
            generated_count
    }

@router.get("/")
def get_bills(
    page: int = 1,
    size: int = 10,
    db: Session = Depends(get_db)
):

    offset = (page - 1) * size

    query = db.query(Bill)

    total_records = query.count()

    bills = (
        query
        .order_by(Bill.bill_id.desc())
        .offset(offset)
        .limit(size)
        .all()
    )

    return {
        "page": page,
        "size": size,
        "total_records": total_records,
        "data": bills
    }
