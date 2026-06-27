import { serverUpdate } from "../core/core"

export const postDonationRequest = async (data) => {
    return await serverUpdate("/donation-request", data, "POST")
}

export const updateRequest = async (id, data) => {
    return await serverUpdate(`/request/${id}`, data, "PATCH")
}

export const deleteRequest = async (id) => {
    return await serverUpdate(`/request/${id}`, {}, "DELETE")
}