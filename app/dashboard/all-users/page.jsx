import AllUsers from "./all-users";

export default async function AllUsersPage({ searchParams }) {
  const resolvedParams = await searchParams;
  
  const status = resolvedParams?.status || "all";
  const page = parseInt(resolvedParams?.page || "1", 10);

  return (
    <AllUsers 
      currentStatusFilter={status} 
      currentPage={page} 
    />
  );
}