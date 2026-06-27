"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation"; // Added Next.js navigation hooks
import {
  Button, Chip, Avatar,
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
} from "@heroui/react";
import { usersAPI } from "@/lib/api";
import { getAllUsers, userUpdate } from "@/lib/api/user/user";
import toast from "react-hot-toast";
import TableSkeleton from "@/components/TableSkeleton";

const STATUS_FILTER = ["all", "active", "blocked"];
const ROLE_CHIP = {
  admin:     { color: "danger",  label: "Admin" },
  volunteer: { color: "warning", label: "Volunteer" },
  donor:     { color: "primary", label: "Donor" },
};

export default function AllUsersPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Read initial state directly from URL query param, fallback to "all"
  const currentStatusFilter = searchParams.get("status") || "all";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Main data-fetching logic dependent on URL parameter
  const loadUsers = async () => {
    setLoading(true);
    try {
      const options = {};
      if (currentStatusFilter !== "all") {
        options.status = currentStatusFilter;
      }
      const data = await getAllUsers(options);
      setUsers(data.users || []);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // 3. Re-run fetching anytime the URL parameter changes
  useEffect(() => {
    loadUsers();
  }, [currentStatusFilter]);

  // 4. Update URL when a filter button is clicked
  const handleFilterChange = (status) => {
    const params = new URLSearchParams(searchParams.toString());
    if (status === "all") {
      params.delete("status"); // Keep clean URLs for default state
    } else {
      params.set("status", status);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleRoleChange = async (userId, role) => {
    const data = await userUpdate(userId, {role}, 'updateRole')
    if (data.message.user?.id) {
      setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, role } : u));
      toast.success(`${data.message.user.name} is now ${data.message.user.role}`)
    } else {
      toast.error("Something went wrong. Please try again later")
    }
  };

  const handleStatusToggle = async (userId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    const data = await userUpdate(userId, {status: newStatus}, 'updateStatus')
    if (data.message?.id) {
      // If the current view is filtering by a status, remove the user from the list upon changing it
      if (currentStatusFilter !== "all" && currentStatusFilter !== newStatus) {
        setUsers((prev) => prev.filter((u) => u.id !== userId));
      } else {
        setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, status: newStatus } : u));
      }
      toast.success(`${data.message.name} is now ${data.message.status}`)
    } else {
      toast.error("Something went wrong. Please try again later")
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
            onClick={() => handleFilterChange(s)} // Triggers URL update instead of local state
            className={`px-4 py-1.5 rounded-full text-sm font-medium border capitalize transition-all ${
              currentStatusFilter === s
                ? "bg-wine text-white border-wine"
                : "bg-white border-border text-ash hover:text-charcoal"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="bg-white border border-border rounded-2xl overflow-hidden">
        {loading ? (
          <TableSkeleton theads={["User", "Blood Group", "Role", "Status", "Actions"]}/>
        ) : (
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
                {users.map((u) => {
                  const roleCfg = ROLE_CHIP[u.role] || { color: "default", label: u.role };
                  return (
                    <tr key={u.id} className="hover:bg-cream/40 transition-colors">
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
                        <span className="font-mono font-semibold text-wine text-xs bg-wine/8 px-2 py-1 rounded-lg">
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
                                onPress={() => handleStatusToggle(u.id, u.status)}>
                                Block User
                              </DropdownItem>
                            ) : (
                              <DropdownItem key="unblock" color="success"
                                onPress={() => handleStatusToggle(u.id, u.status)}>
                                Unblock User
                              </DropdownItem>
                            )
                            }
                            {u.role !== "volunteer" && (
                              <DropdownItem key="volunteer"
                                onPress={() => handleRoleChange(u.id, "volunteer")}>
                                Make Volunteer
                              </DropdownItem>
                            )}
                            {u.role !== "admin" && (
                              <DropdownItem key="admin" color="warning"
                                onPress={() => handleRoleChange(u.id, "admin")}>
                                Make Admin
                              </DropdownItem>
                            )}
                          </DropdownMenu>
                        </Dropdown>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}