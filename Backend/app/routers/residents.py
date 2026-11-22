from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.resident import ResidentCreate
from app.schemas.resident import ResidentUpdate
from app.schemas.resident import ResidentResponse

from app.database import get_db
from app.models.resident import Resident
from app.schemas.resident import (
    ResidentCreate,
    ResidentUpdate
)
from sqlalchemy import or_

router = APIRouter(
    prefix="/residents",
    tags=["Residents"]
)

from fastapi import Query

@router.get("/")
def get_residents(
    search: str = "",
    page: int = Query(default=1, ge=1),
    size: int = Query(default=10, ge=1, le=100),
    db: Session = Depends(get_db)
):

    offset = (page - 1) * size

    query = (
        db.query(Resident)
        .filter(Resident.is_active == True)
    )

    if search:
        query = query.filter(
            or_(
            Resident.owner_name.ilike(f"%{search}%"),
            Resident.flat_no.ilike(f"%{search}%"),
            Resident.mobile_no.ilike(f"%{search}%")
            )
        )

    total_records = query.count()

    sort_by: str = "owner_name"

    residents = (
        query.order_by(Resident.resident_id)
        .offset(offset)
        .limit(size)
        .all()
    )

    return {
        "page": page,
        "size": size,
        "total_records": total_records,
        "data": residents
    }


@router.get(
    "/{resident_id}",
    response_model=ResidentResponse
)
def get_resident_by_id(
    resident_id: int,
    db: Session = Depends(get_db)
):

    resident = (
        db.query(Resident)
        .filter(
            Resident.resident_id == resident_id
        )
        .first()
    )

    if resident is None:
        raise HTTPException(
            status_code=404,
            detail="Resident not found"
        )

    return resident

@router.post("/")
def create_resident(
    resident: ResidentCreate,
    db: Session = Depends(get_db)
):

    existing_resident = (
        db.query(Resident)
        .filter(
            Resident.flat_no == resident.flat_no,
            Resident.block_name == resident.block_name
        )
        .first()
    )

    if existing_resident:
        raise HTTPException(
            status_code=400,
            detail="Flat already exists"
        )

    db_resident = Resident(**resident.model_dump())

    db_resident.is_active = True

    db.add(db_resident)
    db.commit()
    db.refresh(db_resident)

    return db_resident

@router.put("/{resident_id}")
def update_resident(
    resident_id: int,
    resident_data: ResidentUpdate,
    db: Session = Depends(get_db)
):

    resident = (
        db.query(Resident)
        .filter(
            Resident.resident_id == resident_id
        )
        .first()
    )

    if resident is None:
        raise HTTPException(
            status_code=404,
            detail="Resident not found"
        )

    update_data = resident_data.model_dump()

    for field, value in update_data.items():
        setattr(resident, field, value)

    db.commit()

    db.refresh(resident)

    return resident

@router.delete("/{resident_id}")
def delete_resident(
    resident_id: int,
    db: Session = Depends(get_db)
):

    resident = (
        db.query(Resident)
        .filter(
            Resident.resident_id == resident_id
        )
        .first()
    )

    if resident is None:
        raise HTTPException(
            status_code=404,
            detail="Resident not found"
        )

    resident.is_active = False

    db.commit()

    return {
        "message": "Resident deactivated successfully",
        "resident_id": resident_id
    }

@router.put("/{resident_id}/restore")
def restore_resident(
    resident_id: int,
    db: Session = Depends(get_db)
):

    resident = (
        db.query(Resident)
        .filter(
            Resident.resident_id == resident_id
        )
        .first()
    )

    if resident is None:
        raise HTTPException(
            status_code=404,
            detail="Resident not found"
        )

    resident.is_active = True

    db.commit()

    return {
        "message": "Resident restored successfully"
    }