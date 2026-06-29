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
        res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-requests?status=${status}&page=${page}&limit=${limit}`);
    } else if (limit === "all") {
        res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-requests`);
    } else {
        res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-requests?page=${page}&limit=${limit}`);
    }
    return await res.json();
}

export const getUsersCount = async (userRole) => {
    if (userRole === 'donor' || userRole === 'volunteer' || userRole === 'admin') {
        return await serverFetch(`/users-count?userRole=${userRole}`);
    }
    return await serverFetch(`/users-count`);
}

export const getTotalFunding = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/total_funding`);
    return await res.json();
}

