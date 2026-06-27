import AllBloodDonationRequest from "./AllRequests";

export default async function AllBloodDonationRequestPage({ searchParams }) {
    const { status = "all", page = 1, limit = 10 } = await searchParams;
    return (
        <AllBloodDonationRequest status={status}
            page={page}
            limit={limit}></AllBloodDonationRequest>
    )
}