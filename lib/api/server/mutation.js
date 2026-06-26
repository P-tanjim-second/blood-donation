import { serverUpdate } from "../core/core"

export const postDonationRequest = async (data) => {
    return await serverUpdate(path="/donation-request", data, method="POST")
}