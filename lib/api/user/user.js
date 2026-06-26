'use server'
import { headers } from "next/headers";
import { auth } from "../../auth";
import { serverUpdate } from "../core/core"

export async function getUser() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session
}

export const userUpdate = async (userId, userData) => {
    return await serverUpdate(`/user/${userId}/update`, data=userData, method="PATCH")
}