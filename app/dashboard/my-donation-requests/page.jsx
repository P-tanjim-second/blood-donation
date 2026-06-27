import MyDonationRequestsPage from "./donation-requests";

export default function DonationRequestPage({searchParams}) {
    const {status, page} = searchParams;
    return (
        <div>
            <MyDonationRequestsPage status={status} page={page} />
        </div>
    )
}