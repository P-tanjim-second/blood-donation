// /**
//  * VITAE API LAYER
//  * ─────────────────────────────────────────────────────────────────────────────
//  * All functions are wired to mock data now.
//  * To connect to your backend, replace the mock returns with real fetch calls.
//  * The commented-out fetch templates show you exactly how to do it.
//  * ─────────────────────────────────────────────────────────────────────────────
//  */

import {mockFunds
} from "./mockData";

// const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// // ─── Helper ────────────────────────────────────────────────────────────────
// async function apiFetch(endpoint, options = {}) {
//   const token = typeof window !== "undefined"
//     ? localStorage.getItem("vitae_token")
//     : null;

//   const res = await fetch(`${API_BASE}${endpoint}`, {
//     headers: {
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     },
//     ...options,
//   });

//   if (!res.ok) throw new Error(`API error ${res.status}`);
//   return res.json();
// }

// // ─── Auth ──────────────────────────────────────────────────────────────────
// export const authAPI = {
//   login: async ({ email, password }) => {
//     // TODO: return await apiFetch("/auth/login", { method:"POST", body: JSON.stringify({ email, password }) });
//     await delay(400);
//     return {
//       success: true,
//       token: "mock-jwt-token",
//       user: { ...mockCurrentUser, email },
//     };
//   },

//   register: async (userData) => {
//     // TODO: return await apiFetch("/auth/register", { method:"POST", body: JSON.stringify(userData) });
//     await delay(500);
//     return { success: true };
//   },

//   getMe: async () => {
//     // TODO: return await apiFetch("/auth/me");
//     await delay(200);
//     return mockCurrentUser;
//   },
// };

// // ─── Users ─────────────────────────────────────────────────────────────────
// export const usersAPI = {
//   getAll: async ({ status, page = 1, limit = 10 } = {}) => {
//     // TODO: return await apiFetch(`/users?status=${status||""}&page=${page}&limit=${limit}`);
//     await delay(300);
//     const filtered = status
//       ? mockUsers.filter((u) => u.status === status)
//       : mockUsers;
//     return { users: filtered, total: filtered.length, page };
//   },

//   updateRole: async (userId, role) => {
//     // TODO: return await apiFetch(`/users/${userId}/role`, { method:"PATCH", body: JSON.stringify({ role }) });
//     await delay(300);
//     return { success: true };
//   },

//   updateStatus: async (userId, status) => {
//     // TODO: return await apiFetch(`/users/${userId}/status`, { method:"PATCH", body: JSON.stringify({ status }) });
//     await delay(300);
//     return { success: true };
//   },

//   updateProfile: async (userId, data) => {
//     // TODO: return await apiFetch(`/users/${userId}`, { method:"PATCH", body: JSON.stringify(data) });
//     await delay(400);
//     return { success: true };
//   },
// };

// // ─── Donation Requests ────────────────────────────────────────────────────
// export const donationRequestsAPI = {
//   getAll: async ({ status, page = 1, limit = 10 } = {}) => {
//     // TODO: return await apiFetch(`/donations?status=${status||""}&page=${page}&limit=${limit}`);
//     await delay(300);
//     const filtered = status
//       ? mockRequests.filter((r) => r.status === status)
//       : mockRequests;
//     const start = (page - 1) * limit;
//     return {
//       requests: filtered.slice(start, start + limit),
//       total: filtered.length,
//       page, limit,
//       totalPages: Math.ceil(filtered.length / limit),
//     };
//   },

//   getPending: async () => {
//     // TODO: return await apiFetch("/donations?status=pending&limit=20");
//     await delay(300);
//     return { requests: mockRequests.filter((r) => r.status === "pending") };
//   },

//   getMyRequests: async ({ status, page = 1, limit = 10, userId } = {}) => {
//     // TODO: return await apiFetch(`/donations/my?status=${status||""}&page=${page}&limit=${limit}`);
//     await delay(300);
//     let mine = mockRequests.filter(
//       (r) => r.requesterEmail === mockCurrentUser.email
//     );
//     if (status) mine = mine.filter((r) => r.status === status);
//     return { requests: mine.slice(0, limit), total: mine.length, page };
//   },

//   getById: async (id) => {
//     // TODO: return await apiFetch(`/donations/${id}`);
//     await delay(200);
//     return mockRequests.find((r) => r._id === id) || mockRequests[0];
//   },

//   create: async (data) => {
//     // TODO: return await apiFetch("/donations", { method:"POST", body: JSON.stringify(data) });
//     await delay(500);
//     return { success: true, id: `r${Date.now()}` };
//   },

//   update: async (id, data) => {
//     // TODO: return await apiFetch(`/donations/${id}`, { method:"PATCH", body: JSON.stringify(data) });
//     await delay(400);
//     return { success: true };
//   },

//   delete: async (id) => {
//     // TODO: return await apiFetch(`/donations/${id}`, { method:"DELETE" });
//     await delay(300);
//     return { success: true };
//   },

//   updateStatus: async (id, status) => {
//     // TODO: return await apiFetch(`/donations/${id}/status`, { method:"PATCH", body: JSON.stringify({ status }) });
//     await delay(300);
//     return { success: true };
//   },

//   donate: async (requestId, { donorName, donorEmail }) => {
//     // TODO: return await apiFetch(`/donations/${requestId}/donate`, { method:"POST", body: JSON.stringify({ donorName, donorEmail }) });
//     await delay(500);
//     return { success: true };
//   },
// };

// // ─── Search ────────────────────────────────────────────────────────────────
// export const searchAPI = {
//   searchDonors: async ({ bloodGroup, district, upazila } = {}) => {
//     // TODO: return await apiFetch(`/search?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`);
//     await delay(600);
//     return { donors: mockDonors };
//   },
// };

// // ─── Stats ─────────────────────────────────────────────────────────────────
// export const statsAPI = {
//   getDashboardStats: async () => {
//     // TODO: return await apiFetch("/stats/dashboard");
//     await delay(200);
//     return dashboardStats;
//   },
// };

// ─── Funding ───────────────────────────────────────────────────────────────
export const fundingAPI = {
  getAll: async ({ page = 1, limit = 10 } = {}) => {
    // TODO: return await apiFetch(`/funds?page=${page}&limit=${limit}`);
    await delay(300);
    return { funds: mockFunds, total: mockFunds.length };
  },

  createPaymentIntent: async (amount) => {
    // TODO: return await apiFetch("/funds/create-payment-intent", { method:"POST", body: JSON.stringify({ amount }) });
    await delay(400);
    return { clientSecret: "mock_secret_" + Date.now() };
  },

  confirmPayment: async (paymentData) => {
    // TODO: return await apiFetch("/funds/confirm", { method:"POST", body: JSON.stringify(paymentData) });
    await delay(600);
    return { success: true };
  },
};

// ─── Utility ───────────────────────────────────────────────────────────────
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
