'use server'
import { serverFetch } from "../core/core";

export const getMyDonationRequests = async (email, status, page = 1, limit = 10) => {
    if (status === 'pending' || status === 'inprogress' || status === 'done' || status === 'canceled') {
        return await serverFetch(`/my-donation-requests/${email}?status=${status}&page=${page}&limit=${limit}`);
    }
    return await serverFetch(`/my-donation-requests/${email}?page=${page}&limit=${limit}`);
}

export const getRequestById = async (id) => {
    return await serverFetch(`/request/${id}`);
}

export const getAllRequests = async (status, page = 1, limit = 10) => {
    let res;
    if (status === 'pending' || status === 'inprogress' || status === 'done' || status === 'canceled') {
        res = await serverFetch(`/all-requests?status=${status}&page=${page}&limit=${limit}`);
    } else if (limit === "all") {
        res = await serverFetch(`/all-requests`);
    } else {
        res = await serverFetch(`/all-requests?page=${page}&limit=${limit}`);
    }
    return res;
}

export const getPendingRequests = async (page = 1, limit = 10) => {
    return await serverFetch(`/pending-requests?page=${page}&limit=${limit}`);
}

export const getTotalFunding = async () => {
    const res = await serverFetch(`/total_funding`);
    return res;
}

