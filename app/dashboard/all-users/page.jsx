"use client";
import { useState, useEffect } from "react";
import {
  Button, Chip, Avatar,
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
} from "@heroui/react";
import { usersAPI } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

const STATUS_FILTER = ["all", "active", "blocked"];
const ROLE_CHIP = {
  admin:     { color: "danger",  label: "Admin" },
  volunteer: { color: "warning", label: "Volunteer" },
  donor:     { color: "primary", label: "Donor" },
};

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  const loadUsers = async () => {
    setLoading(true);
    const { data: users, error } = await authClient.admin.listUsers() 
    console.log(users)
    setUsers(users.users);
    setLoading(false);
  };

  useEffect(() => { loadUsers(); }, []);

  const handleRoleChange = async (userId, role) => {
    await usersAPI.updateRole(userId, role);
    setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, role } : u));
  };

  const handleStatusToggle = async (userId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    await usersAPI.updateStatus(userId, newStatus);
    setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, status: newStatus } : u));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-medium text-charcoal">All Users</h1>
        <p className="text-sm text-ash mt-1">Manage donor accounts, roles, and access</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {STATUS_FILTER.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border capitalize transition-all ${
              statusFilter === s
                ? "bg-wine text-white border-wine"
                : "bg-surface border-border text-ash hover:text-charcoal"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-cream animate-pulse" />
                <div className="flex-1 h-6 rounded-lg bg-cream animate-pulse" />
              </div>
            ))}
          </div>
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
                      {/* User info */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar src={u.avatar} name={u.name} size="sm" />
                          <div>
                            <p className="font-semibold text-charcoal text-sm">{u.name}</p>
                            <p className="text-ash text-xs">{u.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Blood */}
                      <td className="px-5 py-4">
                        <span className="font-mono font-semibold text-wine text-xs bg-wine/8 px-2 py-1 rounded-lg">
                          {u.bloodGroup}
                        </span>
                      </td>

                      {/* Role */}
                      <td className="px-5 py-4">
                        <Chip size="sm" color={roleCfg.color} variant="flat" className="text-xs capitalize">
                          {roleCfg.label}
                        </Chip>
                      </td>

                      {/* Status */}
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

                      {/* Actions — three-dot dropdown */}
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
                            {u.status === "Active" ? (
                              <DropdownItem key="block" color="danger" className="text-danger"
                                onPress={() => handleStatusToggle(u.id, u.status)}>
                                Block User
                              </DropdownItem>
                            ) : (
                              <DropdownItem key="unblock" color="success"
                                onPress={() => handleStatusToggle(u.id, u.status)}>
                                Unblock User
                              </DropdownItem>
                            )}
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
