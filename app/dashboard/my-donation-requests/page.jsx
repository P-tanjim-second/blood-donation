"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Button, Chip,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  useDisclosure, Pagination,
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem
} from "@heroui/react";
import { donationRequestsAPI } from "@/lib/api";
import TableSkeleton from "@/components/TableSkeleton";

const STATUS_OPTIONS = ["all", "pending", "inprogress", "done", "canceled"];
const STATUS_CHIP = {
  pending: { color: "warning", label: "Pending" },
  inprogress: { color: "primary", label: "In Progress" },
  done: { color: "success", label: "Done" },
  canceled: { color: "danger", label: "Canceled" },
};

export default function MyDonationRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Delete modal
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const res = await donationRequestsAPI.getMyRequests({
        status: statusFilter === "all" ? undefined : statusFilter,
        page,
        limit: 6,
      });
      setRequests(res.requests);
      setTotalPages(Math.ceil(res.total / 6) || 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadRequests(); }, [statusFilter, page]);

  const handleStatusChange = async (reqId, newStatus) => {
    await donationRequestsAPI.updateStatus(reqId, newStatus);
    setRequests((prev) =>
      prev.map((r) => r._id === reqId ? { ...r, status: newStatus } : r)
    );
  };

  const confirmDelete = async () => {
    setDeleting(true);
    await donationRequestsAPI.delete(deleteTarget);
    setRequests((prev) => prev.filter((r) => r._id !== deleteTarget));
    setDeleting(false);
    onDeleteClose();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-medium text-charcoal">My Requests</h1>
          <p className="text-sm text-ash mt-1">All your blood donation requests</p>
        </div>
        <Link href="/dashboard/create-donation-request">
          <Button className="bg-wine text-white font-semibold rounded-full hover:bg-wine-dark">
            + New Request
          </Button>
        </Link>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s}
            onClick={() => { setStatusFilter(s); setPage(1); }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border capitalize transition-all ${statusFilter === s
                ? "bg-wine text-white border-wine"
                : "bg-white border-border text-ash hover:text-charcoal hover:border-wine/30"
              }`}
          >
            {s === "all" ? "All" : s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden">
        {loading ? (
          <TableSkeleton theads={["Recipient", "Location", "Blood", "Date", "Status", "Donor Info", "Actions"]}/>
        ) : requests.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-ash text-sm mb-4">No requests found.</p>
            <Link href="/dashboard/create-donation-request">
              <Button className="bg-wine text-white rounded-full font-semibold">
                Create a Request
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-cream">
                  {["Recipient", "Location", "Blood", "Date", "Status", "Donor Info", "Actions"].map((h) => (
                    <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-ash uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {requests.map((req) => {
                  const st = STATUS_CHIP[req.status] || { color: "default", label: req.status };
                  return (
                    <tr key={req._id} className="hover:bg-cream/40 transition-colors">
                      <td className="px-5 py-4 font-medium text-charcoal whitespace-nowrap">{req.recipientName}</td>
                      <td className="px-5 py-4 text-ash text-xs whitespace-nowrap">{req.recipientDistrict}, {req.recipientUpazila}</td>
                      <td className="px-5 py-4">
                        <span className="font-mono font-semibold text-wine text-xs bg-wine/8 px-2 py-1 rounded-lg">
                          {req.bloodGroup}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-ash text-xs whitespace-nowrap">{req.donationDate} {req.donationTime}</td>
                      <td className="px-5 py-4">
                        <Chip size="sm" color={st.color} variant="flat" className="text-xs">{st.label}</Chip>
                      </td>
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
                      <td className="px-5 py-4">
                        {/* Dropdown Actions Menu */}
                        <Dropdown placement="bottom-end" className="min-w-[100px] rounded-2xl">
                          <DropdownTrigger>
                            <Button isIconOnly size="sm" variant="light" className="text-ash">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="5" r="1.5" />
                                <circle cx="12" cy="12" r="1.5" />
                                <circle cx="12" cy="19" r="1.5" />
                              </svg>
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Request actions" className="w-32">
                            {/* In-progress state actions */}
                            {req.status === "inprogress" ? [
                              <DropdownItem
                                key="done"
                                color="success"
                                className="text-success rounded-xl"
                                onPress={() => handleStatusChange(req._id, "done")}
                              >
                                Mark Done
                              </DropdownItem>,
                              <DropdownItem
                                key="cancel"
                                color="danger"
                                className="text-danger rounded-xl"
                                onPress={() => handleStatusChange(req._id, "canceled")}
                              >
                                Cancel Request
                              </DropdownItem>
                            ] : []}

                            {/* Standard actions */}
                            <DropdownItem
                              key="view"
                              as={Link}
                              href={`/donation-requests/${req._id}`}
                              className=" rounded-xl"
                            >
                              View Details
                            </DropdownItem>

                            <DropdownItem
                              key="edit"
                              as={Link}
                              href={`/dashboard/my-donation-requests/${req._id}/edit`}
                              className=" rounded-xl"
                            >
                              Edit
                            </DropdownItem>

                            <DropdownItem
                              key="delete"
                              color="danger"
                              className="text-danger rounded-xl"
                              onPress={() => { setDeleteTarget(req._id); onDeleteOpen(); }}
                            >
                              Delete
                            </DropdownItem>
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
        <div className="flex justify-center">
          <Pagination total={totalPages} page={page} onChange={setPage}
            color="primary" variant="flat" size="sm" />
        </div>
      )}

      {/* Delete confirmation modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} size="sm">
        <ModalContent>
          <ModalHeader className="font-display text-xl">Delete Request</ModalHeader>
          <ModalBody>
            <p className="text-ash text-sm">
              Are you sure you want to delete this donation request? This action cannot be undone.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onDeleteClose}>Cancel</Button>
            <Button color="danger" isLoading={deleting} onPress={confirmDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}