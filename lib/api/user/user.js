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
                role: userData.role, // required
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
    const { page = 1, limit = 10, status, role } = options
    const data = await serverFetch(`/all-users?page=${page}&limit=${limit}${role && role !== "" ? `&role=${role}` : ''}${status && status !== "" ? `&status=${status}` : ''}`)
    return data
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