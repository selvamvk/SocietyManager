import api from "../api/api";

export const getResidents = (
    search = "",
    page = 1,
    size = 10
) => {
    return api.get(
        `/residents?search=${search}&page=${page}&size=${size}`
    );
};

export const deleteResident = (
    residentId: number
) => {
    return api.delete(
        `/residents/${residentId}`
    );
};
