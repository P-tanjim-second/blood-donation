import MyDonationRequestsPage from "./donation-requests";

export default async function DonationRequestPage({searchParams}) {
    const {status, page} = await searchParams;
    return (
        <div>
            <MyDonationRequestsPage status={status} page={page} />
        </div>
    )
}