from pydantic import BaseModel


class GenerateBillRequest(BaseModel):
    bill_month: int
    bill_year: int


class BillResponse(BaseModel):

    bill_id: int
    resident_id: int

    bill_month: int
    bill_year: int

    amount: float

    status: str

    model_config = {
        "from_attributes": True
    }

class BillResponse(BaseModel):

    bill_id: int

    resident_id: int

    bill_month: int

    bill_year: int

    amount: float

    status: str

    model_config = {
        "from_attributes": True
    }
