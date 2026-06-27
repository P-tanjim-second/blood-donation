'use server'
import { headers } from "next/headers";
import { auth } from "../../auth";
import { revalidatePath } from "next/cache";

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
    const { userId, role, limit = 100, offset = 0, status, ...otherFilters } = options;

    // 1. Start with standard query parameters
    const query = {
        limit,
        offset,
        status,
        ...otherFilters
    };

    // 2. Only add the filter if a valid role is actually provided
    if (role && role.trim() !== "") {
        query.filterField = "role";
        query.filterValue = role;
        query.filterOperator = "eq";
    }

    if (status) {
        query.filterField = "status";
        query.filterValue = status;
        query.filterOperator = 'eq';
    }

    const users = await auth.api.listUsers({
        query: query,
        headers: await headers(),
    });

    return users;
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