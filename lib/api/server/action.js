import { serverFetch } from "../core/core";

export const getMyDonationRequests = async (email, status, page = 1, limit = 10) => {
    if (status === 'pending' || status === 'inprogress' || status === 'done' || status === 'canceled') {
        return await serverFetch(`/my-donation-requests/${email}?status=${status}&page=${page}&limit=${limit}`);
    }
    return await serverFetch(`/my-donation-requests/${email}?page=${page}&limit=${limit}`);
}

export const getAllRequests = async (status, page = 1, limit = 10) => {
    if (status === 'pending' || status === 'inprogress' || status === 'done' || status === 'canceled') {
        return await serverFetch(`/all-requests?status=${status}&page=${page}&limit=${limit}`);
    }
    if (limit === "all") {
        return await serverFetch(`/all-requests`);
    }
    return await serverFetch(`/all-requests?page=${page}&limit=${limit}`);
}

export const getUsersCount = async (role) => {
    if (role === 'donor' || role === 'volunteer' || role === 'admin') {
        return await serverFetch(`/users-count?role=${role}`);
    }
    return await serverFetch(`/users-count`);
}

export const dashboardData = async () => {
    const data = [];
    const totalDonors = await getUsersCount('donor');
    const totalRequests = await getAllRequests("all", 1, "all");
    const totalFunding = await serverFetch(`/total_funding`);
    data.push(totalDonors, totalRequests, totalFunding);
    return data;
}