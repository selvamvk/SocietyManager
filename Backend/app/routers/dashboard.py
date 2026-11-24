from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.resident import Resident

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/summary")
def get_dashboard_summary(
    db: Session = Depends(get_db)
):

    total_residents = (
        db.query(
            func.count(
                Resident.resident_id
            )
        )
        .scalar()
    )

    active_residents = (
        db.query(
            func.count(
                Resident.resident_id
            )
        )
        .filter(
            Resident.is_active == True
        )
        .scalar()
    )

    owner_count = (
        db.query(
            func.count(Resident.resident_id)
        )
        .filter(
            Resident.occupancy_status == "OWNER",
            Resident.is_active == True
        )
        .scalar()
    )

    tenant_count = (
        db.query(
            func.count(Resident.resident_id)
        )
        .filter(
            Resident.occupancy_status == "TENANT",
            Resident.is_active == True
        )
        .scalar()
    )

    vacant_count = (
        db.query(
            func.count(Resident.resident_id)
        )
        .filter(
            Resident.occupancy_status == "VACANT",
            Resident.is_active == True
        )
        .scalar()
    )

    return {
        "total_residents": total_residents,
        "active_residents": active_residents,
        "owner_count": owner_count,
        "tenant_count": tenant_count,
        "vacant_count": vacant_count,
        "total_bills": 0,
        "outstanding_amount": 0
    }
