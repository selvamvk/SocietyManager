import api from "../api/api";
import type { Resident } from "../interfaces/Resident";

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

export const createResident = (
    resident: Resident
) => {
    return api.post(
        "/residents",
        resident
    );
};

export const getResidentById = (
    residentId: number
) => {
    return api.get(
        `/residents/${residentId}`
    );
};

export const updateResident = (
    residentId: number,
    resident: any
) => {
    return api.put(
        `/residents/${residentId}`,
        resident
    );
};
