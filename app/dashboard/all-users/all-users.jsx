"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Button, Chip, Avatar,
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
  Pagination,
} from "@heroui/react";
import { getAllUsers, userUpdate } from "@/lib/api/user/user";
import toast from "react-hot-toast";
import TableSkeleton from "@/components/TableSkeleton";

const STATUS_FILTER = ["all", "active", "blocked"];
const ROLE_CHIP = {
  admin: { color: "danger", label: "Admin" },
  volunteer: { color: "warning", label: "Volunteer" },
  donor: { color: "primary", label: "Donor" },
};

export default function AllUsers({ currentStatusFilter, currentPage }) {
  const router = useRouter();
  const pathname = usePathname();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;


  const checkUser = async () => {
    try {
      const session = await getUser();
      if (session?.user) {
        if (session.user.userRole !== "admin") {
          toast.error("Access denied. Admins only.");
          router.push("/unauthorized");
          return;
        }
        else{
          loadUsers();
        }
      }
      else{
        router.push("/login");
      }
    } catch {
      console.error("Error checking user session:");
      router.push("/login");
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const options = {
        page: currentPage,
        limit: itemsPerPage,
      };

      if (currentStatusFilter !== "all") {
        options.status = currentStatusFilter;
      }

      const data = await getAllUsers(options);
      setUsers(data.users || []);

      if (data.totalPages) {
        setTotalPages(data.totalPages);
      } else if (data.totalCount) {
        setTotalPages(Math.ceil(data.totalCount / itemsPerPage));
      } else {
        setTotalPages(1);
      }
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [currentStatusFilter, currentPage]);

  const handleFilterChange = (status) => {
    const params = new URLSearchParams();

    if (status !== "all") {
      params.set("status", status);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (page) => {
    const params = new URLSearchParams();

    if (currentStatusFilter !== "all") {
      params.set("status", currentStatusFilter);
    }

    if (page > 1) {
      params.set("page", page.toString());
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleRoleChange = async (userId, userRole, name) => {
    const data = await userUpdate(userId, {userRole: userRole});
    if (data.modifiedCount > 0) {
      setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, userRole } : u));
      toast.success(`${name} is now ${userRole}`);
    } else {
      toast.error("Something went wrong. Please try again later");
    }
  };

  const handleStatusToggle = async (userId, currentStatus, name) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    const data = await userUpdate(userId, { status: newStatus });
    if (data.modifiedCount > 0) {
      if (currentStatusFilter !== "all" && currentStatusFilter !== newStatus) {
        setUsers((prev) => prev.filter((u) => u.id !== userId));
      } else {
        setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, status: newStatus } : u));
      }
      toast.success(`${name} is now ${newStatus}`);
    } else {
      toast.error("Something went wrong. Please try again later");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-medium text-charcoal">All Users</h1>
        <p className="text-sm text-ash mt-1">Manage donor accounts, roles, and access</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        {STATUS_FILTER.map((s) => (
          <button
            key={s}
            onClick={() => handleFilterChange(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border capitalize transition-all ${currentStatusFilter === s
                ? "bg-wine text-white border-wine"
                : "bg-white border-border text-ash hover:text-charcoal"
              }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="bg-white border border-border rounded-2xl overflow-hidden flex flex-col gap-4">
        {loading ? (
          <TableSkeleton theads={["User", "Blood Group", "Role", "Status", "Actions"]} />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-cream">
                    {["User", "Blood Group", "Role", "Status", "Actions"].map((h) => (
                      <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-ash uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-ash text-sm">
                        No users found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => {
                      const roleCfg = ROLE_CHIP[u.userRole] || { color: "default", label: u.userRole };
                      return (
                        <tr key={u._id} className="hover:bg-cream/40 transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <Avatar src={u.avatar} name={u.name} size="sm" />
                              <div>
                                <p className="font-semibold text-charcoal text-sm">{u.name}</p>
                                <p className="text-ash text-xs">{u.email}</p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <span className="font-mono font-semibold text-wine text-xs bg-wine/5 px-2 py-1 rounded-lg">
                              {u.bloodGroup}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <Chip size="sm" color={roleCfg.color} variant="flat" className="text-xs capitalize">
                              {roleCfg.label}
                            </Chip>
                          </td>

                          <td className="px-5 py-4">
                            <Chip
                              size="sm"
                              color={u.status === "active" ? "success" : "danger"}
                              variant="flat"
                              className="text-xs capitalize"
                            >
                              {u.status}
                            </Chip>
                          </td>

                          <td className="px-5 py-4">
                            <Dropdown placement="bottom-end">
                              <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light" className="text-ash">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
                                  </svg>
                                </Button>
                              </DropdownTrigger>
                              <DropdownMenu aria-label="User actions">
                                {u.status === "active" ? (
                                  <DropdownItem key="block" color="danger" className="text-danger"
                                    onPress={() => handleStatusToggle(u.id, u.status, u.name)}>
                                    Block User
                                  </DropdownItem>
                                ) : (
                                  <DropdownItem key="unblock" color="success"
                                    onPress={() => handleStatusToggle(u.id, u.status, u.name)}>
                                    Unblock User
                                  </DropdownItem>
                                )}
                                {u.userRole !== "volunteer" && (
                                  <DropdownItem key="volunteer"
                                    onPress={() => handleRoleChange(u.id, "volunteer", u.name)}>
                                    Make Volunteer
                                  </DropdownItem>
                                )}
                                {u.userRole !== "admin" && (
                                  <DropdownItem key="admin" color="warning"
                                    onPress={() => handleRoleChange(u.id, "admin", u.name)}>
                                    Make Admin
                                  </DropdownItem>
                                )}
                              </DropdownMenu>
                            </Dropdown>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center pb-4 pt-2 border-t border-border">
                <Pagination
                  isCompact
                  showControls
                  color="danger"
                  total={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  classNames={{
                    wrapper: "gap-1 shadow-none",
                    item: "text-charcoal bg-transparent hover:bg-cream rounded-xl font-medium",
                    cursor: "bg-wine text-white rounded-xl font-semibold",
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}