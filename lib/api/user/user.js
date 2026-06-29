'use server'
import { headers } from "next/headers";
import { auth } from "../../auth";
import { revalidatePath } from "next/cache";
import { serverFetch } from "../core/core";

export async function getUser() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session
}

export const getUserById = async (userId) => {
    const data = await auth.api.getUser({
        query: {
            id: userId, // required
        },
        headers: await headers(),
    })
    return data
}

export const userUpdate = async (userId, userData, action) => {
    if (action == 'updateRole') {
        const data = await auth.api.setRole({
            body: {
                userId: userId,
                userRole: userData.userRole, // required
            },
            headers: await headers(),
        });
        return validateData(data)
    }
    if (action == 'updateStatus' || action == 'updateProfile') {
        const data = await auth.api.adminUpdateUser({
            body: {
                userId: userId, // required
                data: userData, // required
            },
            headers: await headers(),
        });
        return validateData(data)
    }
}

export const getAllUsers = async (options = {}) => {
    const { page = 1, limit = 10, status, userRole } = options;
    const data = await serverFetch(`/all-users?page=${page}&limit=${limit}${userRole && userRole !== "" ? `&userRole=${userRole}` : ''}${status && status !== "" ? `&status=${status}` : ''}`)
    return data
};

export const getAllDonors = async (options = {}) => {
    const { bloodGroup, district, upazila } = options;
    const params = new URLSearchParams();

    if (bloodGroup && bloodGroup !== "") params.set("bloodGroup", bloodGroup.trim());
    if (district && district !== "") params.set("district", district.trim());
    if (upazila && upazila !== "") params.set("upazila", upazila.trim());

    const query = params.toString();
    const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/donors${query ? `?${query}` : ""}`);
    return data;
};

const validateData = (data) => {
    switch (data.status) {
        case 200:
        case 201:
            return data;

        case 401:
            redirect('/login')

        case 403:
            redirect('/forbidden')

        case 404:
            redirect('/not-found')

        case 500:
            return { message: "Internal Server Error!" }

        default:
            return { message: data || "Something went wrong!" }
    }
}