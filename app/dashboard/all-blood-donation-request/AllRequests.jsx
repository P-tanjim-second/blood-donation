"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Button, Chip, Pagination,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  useDisclosure,
} from "@heroui/react";
import {
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
} from "@heroui/react";
import { donationRequestsAPI } from "@/lib/api";
import { getUser } from "@/lib/api/user/user";
import { toast } from "react-hot-toast"; // Make sure to import toast if you use it
import { getALlRequests } from "@/lib/api/server/action";
import TableSkeleton from "@/components/TableSkeleton";

const STATUS_OPTS = ["all", "pending", "inprogress", "done", "canceled"];
const STATUS_CHIP = {
  pending: { color: "warning", label: "Pending" },
  inprogress: { color: "primary", label: "In Progress" },
  done: { color: "success", label: "Done" },
  canceled: { color: "danger", label: "Canceled" },
};

export default function AllBloodDonationRequest({ status, page, limit }) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  // Fetch session on mount
  useEffect(() => {
    const session = async () => {
      try {
        const res = await getUser();
        if (res?.user) {
          setUser(res.user);
        }
      } catch (err) {
        console.error("Session fetch failed:", err);
      } finally {
        setSessionLoading(false);
      }
    };
    session();
  }, []);

  const isAdmin = user?.role === "admin";
  const isVolunteer = user?.role === "volunteer";

  // Role authorization check
  useEffect(() => {
    if (sessionLoading) return; // Wait until session is verified

    // Redirect if they are NEITHER an admin NOR a volunteer
    if (!isAdmin && !isVolunteer) {
      toast.error("You are not authorized to access this page");
      router.push("/unauthorized");
    }
  }, [user, sessionLoading, isAdmin, isVolunteer, router]);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  // Delete modal (admin only)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Sync with Server Actions / URL changes
  const load = async () => {
    setLoading(true);
    try {
      const res = await getALlRequests(status, page, limit);
      setRequests(res.requests || []);
      console.log(res);
      setTotalPages(Math.ceil(Number(res.total) / Number(limit)) || 1);
    } catch (error) {
      console.error("Failed to load requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin || isVolunteer) {
      load();
    }
  }, [status, page, limit, isAdmin, isVolunteer]);

  const handleNavigate = (newStatus, newPage) => {
    const params = new URLSearchParams();
    if (newStatus && newStatus !== "all") params.set("status", newStatus);
    if (newPage && Number(newPage) > 1) params.set("page", String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  const changeStatus = async (id, updatedStatus) => {
    await donationRequestsAPI.updateStatus(id, updatedStatus);
    setRequests((prev) => prev.map((r) => r._id === id ? { ...r, status: updatedStatus } : r));
  };

  const confirmDelete = async () => {
    setDeleting(true);
    await donationRequestsAPI.delete(deleteTarget);
    setRequests((prev) => prev.filter((r) => r._id !== deleteTarget));
    setDeleting(false);
    onClose();
  };

  // Prevent UI rendering while verifying initial session
  if (sessionLoading) {
    return (
      <TableSkeleton theads={[
        "Requester", "Recipient", "Blood", "Location", "Date", "Status",
        ...(isAdmin ? ["Donor Info"] : []),
        "Actions",
      ]} />
    );
  }

  // Double check authorization before layout render
  if (!isAdmin && !isVolunteer) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-medium text-charcoal">
          {isAdmin ? "All Requests" : "Donation Requests"}
        </h1>
        <p className="text-sm text-ash mt-1">
          {isAdmin
            ? "Manage every blood donation request across the platform"
            : "View and update donation request statuses"}
        </p>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 flex-wrap">
        {STATUS_OPTS.map((s) => (
          <button
            key={s}
            onClick={() => handleNavigate(s, 1)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border capitalize transition-all ${status === s
              ? "bg-wine text-white border-wine shadow-sm shadow-wine/20"
              : "bg-white border-border text-ash hover:text-charcoal hover:border-wine/30"
              }`}
          >
            {s === "all" ? "All" : s}
          </button>
        ))}
      </div>

      {/* Table container */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <TableSkeleton theads={[
            "Requester", "Recipient", "Blood", "Location", "Date", "Status",
            ...(isAdmin ? ["Donor Info"] : []),
            "Actions",
          ]} />
        ) : requests.length === 0 ? (
          <div className="p-12 text-center text-ash text-sm">
            No requests found for the selected filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-cream/50">
                  {[
                    "Requester", "Recipient", "Blood", "Location", "Date", "Status",
                    ...(isAdmin ? ["Donor Info"] : []),
                    "Actions",
                  ].map((h) => (
                    <th key={h}
                      className="text-left px-5 py-3.5 text-xs font-semibold text-ash uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {requests.map((req) => {
                  const st = STATUS_CHIP[req.status] || { color: "default", label: req.status };
                  return (
                    <tr key={req._id} className="hover:bg-cream/20 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-medium text-charcoal text-sm">{req.requesterName}</p>
                        <p className="text-xs text-ash">{req.requesterEmail}</p>
                      </td>
                      <td className="px-5 py-4 font-medium text-charcoal whitespace-nowrap">
                        {req.recipientName}
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-mono font-semibold text-wine text-xs bg-wine/10 px-2 py-1 rounded-lg">
                          {req.bloodGroup}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-ash whitespace-nowrap">
                        {req.recipientDistrict}, {req.recipientUpazila}
                      </td>
                      <td className="px-5 py-4 text-xs text-ash whitespace-nowrap">
                        {req.donationDate}
                      </td>
                      <td className="px-5 py-4">
                        <Chip size="sm" color={st.color} variant="flat" className="text-xs font-medium">
                          {st.label}
                        </Chip>
                      </td>

                      {/* Donor info (admin only) */}
                      {isAdmin && (
                        <td className="px-5 py-4">
                          {req.status === "inprogress" && req.donorName ? (
                            <div className="text-xs">
                              <p className="font-medium text-charcoal">{req.donorName}</p>
                              <p className="text-ash">{req.donorEmail}</p>
                            </div>
                          ) : (
                            <span className="text-ash text-xs">—</span>
                          )}
                        </td>
                      )}

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <Dropdown placement="bottom-end" className="bg-white border border-border z-50">
                          <DropdownTrigger>
                            <Button isIconOnly size="sm" variant="light" className="text-ash hover:text-charcoal rounded-lg">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="5" r="1.5" />
                                <circle cx="12" cy="12" r="1.5" />
                                <circle cx="12" cy="19" r="1.5" />
                              </svg>
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Request actions" itemClasses={{ title: "text-xs font-medium text-charcoal" }}>

                            {/* View Details (Available to Everyone) */}
                            <DropdownItem key="view" href={`/donation-requests/${req._id}`}>
                              View Details
                            </DropdownItem>

                            {/* Volunteer/Admin Status Updates */}
                            {req.status === "pending" ? (
                              <DropdownItem
                                key="inprogress"
                                color="primary"
                                onPress={() => changeStatus(req._id, "inprogress")}
                              >
                                Mark In Progress
                              </DropdownItem>
                            ) : null}

                            {req.status === "inprogress" ? (
                              <DropdownItem
                                key="done"
                                color="success"
                                className="text-success"
                                onPress={() => changeStatus(req._id, "done")}
                              >
                                Mark Done
                              </DropdownItem>
                            ) : null}

                            {req.status === "inprogress" ? (
                              <DropdownItem
                                key="cancel"
                                color="danger"
                                className="text-danger"
                                onPress={() => changeStatus(req._id, "canceled")}
                              >
                                Cancel Request
                              </DropdownItem>
                            ) : null}

                            {/* Admin-only destructive/management actions */}
                            {isAdmin ? (
                              <DropdownItem
                                key="edit"
                                showDivider
                              >
                                Edit Request
                              </DropdownItem>
                            ) : null}

                            {isAdmin ? (
                              <DropdownItem
                                key="delete"
                                color="danger"
                                className="text-danger"
                                onPress={() => { setDeleteTarget(req._id); onOpen(); }}
                              >
                                Delete Request
                              </DropdownItem>
                            ) : null}

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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border pt-4 px-2">
          <p className="text-xs text-ash">
            Showing page <span className="font-medium text-charcoal">{page}</span> of{" "}
            <span className="font-medium text-charcoal">{totalPages}</span>
          </p>
          <Pagination
            total={totalPages}
            page={Number(page)}
            onChange={(newPage) => handleNavigate(status, newPage)}
            color="danger"
            variant="faded"
            size="md"
            radius="lg"
            classNames={{
              wrapper: "gap-1 shadow-none",
              item: "bg-white hover:bg-cream text-charcoal text-xs shadow-none border border-border",
              cursor: "bg-wine text-white font-medium shadow-sm",
            }}
          />
        </div>
      )}

      {/* Delete modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="sm" backdrop="blur">
        <ModalContent>
          <ModalHeader className="font-display text-xl">Delete Request</ModalHeader>
          <ModalBody>
            <p className="text-ash text-sm">
              This will permanently remove the donation request. Are you sure?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose} className="rounded-lg">Cancel</Button>
            <Button color="danger" isLoading={deleting} onPress={confirmDelete} className="rounded-lg shadow-sm">
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}