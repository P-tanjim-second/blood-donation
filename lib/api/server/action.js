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
    if (status === 'pending' || status === 'inprogress' || status === 'done' || status === 'canceled') {
        return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-requests?status=${status}&page=${page}&limit=${limit}`);
    }
    if (limit === "all") {
        return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-requests`);
    }
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-requests?page=${page}&limit=${limit}`);
}

export const getUsersCount = async (userRole) => {
    if (userRole === 'donor' || userRole === 'volunteer' || userRole === 'admin') {
        return await serverFetch(`/users-count?userRole=${userRole}`);
    }
    return await serverFetch(`/users-count`);
}

export const getTotalFunding = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/total_funding`);
}
