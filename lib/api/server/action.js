import { serverFetch } from "../core/core";

export const getMyDonationRequests = async (email, status, page = 1, limit = 10) => {
    if (status === 'pending' || status === 'inprogress' || status === 'done' || status === 'canceled') {
        return await serverFetch(`/my-donation-requests/${email}?status=${status}&page=${page}&limit=${limit}`);
    }
    return await serverFetch(`/my-donation-requests/${email}?page=${page}&limit=${limit}`);
}