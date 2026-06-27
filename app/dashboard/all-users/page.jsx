import AllUsers from "./all-users";

export default async function AllUsersPage({searchParams}) {
    const {status="all"} = await searchParams;
    return (
        <AllUsers searchParams={status}></AllUsers>
    )

}