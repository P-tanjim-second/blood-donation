'use server';
import { serverUpdate } from "../core/core"

export const postDonationRequest = async (data) => {
    return await serverUpdate("/donation-request", data, "POST")
}

export const updateRequest = async (id, data, method="PATCH") => {
    return await serverUpdate(`/request/${id}`, data, method)
}
