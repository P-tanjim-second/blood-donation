import { serverUpdate } from "../core/core"

export const postDonationRequest = async (data) => {
    return await serverUpdate("/donation-request", data, "POST")
}