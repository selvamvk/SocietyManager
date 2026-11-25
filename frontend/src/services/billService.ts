import api from "../api/api";

export const getBills = (
    page = 1,
    size = 10,
    status = "",
    billMonth = 0,
    billYear = 0
) => {

    return api.get("/bills", {
        params: {
            page,
            size,
            status,
            bill_month: billMonth,
            bill_year: billYear
        }
    });

};

export const generateBills = (
    billMonth: number,
    billYear: number
) => {

    return api.post(
        "/bills/generate",
        {
            bill_month: billMonth,
            bill_year: billYear
        }
    );

};
