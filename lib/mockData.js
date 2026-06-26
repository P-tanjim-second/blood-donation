// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA — replace with real API responses when backend is ready
// ─────────────────────────────────────────────────────────────────────────────

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const DONATION_STATUSES = ["pending", "inprogress", "done", "canceled"];

export const USER_ROLES = ["admin", "donor", "volunteer"];

// Blood type compatibility map
export const COMPATIBILITY = {
  "A+":  { canDonateTo: ["A+", "AB+"], canReceiveFrom: ["A+", "A-", "O+", "O-"] },
  "A-":  { canDonateTo: ["A+", "A-", "AB+", "AB-"], canReceiveFrom: ["A-", "O-"] },
  "B+":  { canDonateTo: ["B+", "AB+"], canReceiveFrom: ["B+", "B-", "O+", "O-"] },
  "B-":  { canDonateTo: ["B+", "B-", "AB+", "AB-"], canReceiveFrom: ["B-", "O-"] },
  "AB+": { canDonateTo: ["AB+"], canReceiveFrom: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
  "AB-": { canDonateTo: ["AB+", "AB-"], canReceiveFrom: ["A-", "B-", "AB-", "O-"] },
  "O+":  { canDonateTo: ["A+", "B+", "AB+", "O+"], canReceiveFrom: ["O+", "O-"] },
  "O-":  { canDonateTo: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], canReceiveFrom: ["O-"] },
};

// Bangladesh districts
export const DISTRICTS = [
  "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola",
  "Bogura", "Brahmanbaria", "Chandpur", "Chapai Nawabganj",
  "Chattogram", "Chuadanga", "Cox's Bazar", "Cumilla",
  "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha",
  "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore",
  "Jhalakathi", "Jhenaidah", "Joypurhat", "Khagrachari",
  "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur",
  "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur",
  "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon",
  "Narail", "Narayanganj", "Narsingdi", "Natore", "Netrokona",
  "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali",
  "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur",
  "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj",
  "Sylhet", "Tangail", "Thakurgaon",
];

export const UPAZILAS = {
  Dhaka: ["Dhanmondi", "Gulshan", "Mirpur", "Mohammadpur", "Motijheel", "Tejgaon", "Uttara", "Banani"],
  Chattogram: ["Kotwali", "Panchlaish", "Halishahar", "Pahartali", "Bayazid", "Chandgaon"],
  Sylhet: ["Sylhet Sadar", "Bianibazar", "Golapganj", "Kanaighat", "Zakiganj"],
  Rajshahi: ["Boalia", "Motihar", "Rajpara", "Shah Makhdum", "Paba"],
  Khulna: ["Daulatpur", "Khalishpur", "Khan Jahan Ali", "Khulna Sadar", "Sonadanga"],
  Barishal: ["Barishal Sadar", "Agailjhara", "Babuganj", "Bakerganj", "Banaripara"],
  Rangpur: ["Rangpur Sadar", "Badarganj", "Gangachhara", "Kaunia", "Mithapukur"],
  Mymensingh: ["Mymensingh Sadar", "Bhaluka", "Dhobaura", "Fulbaria", "Gaffargaon"],
};

// Mock users
export const mockUsers = [
  {
    _id: "u1", name: "Arif Rahman", email: "arif@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    bloodGroup: "O+", district: "Dhaka", upazila: "Dhanmondi",
    role: "donor", status: "active", createdAt: "2024-01-15",
  },
  {
    _id: "u2", name: "Nusrat Jahan", email: "nusrat@example.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    bloodGroup: "A+", district: "Chattogram", upazila: "Kotwali",
    role: "donor", status: "active", createdAt: "2024-02-10",
  },
  {
    _id: "u3", name: "Rahim Uddin", email: "rahim@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    bloodGroup: "B+", district: "Sylhet", upazila: "Sylhet Sadar",
    role: "volunteer", status: "active", createdAt: "2024-01-20",
  },
  {
    _id: "u4", name: "Fatema Begum", email: "fatema@example.com",
    avatar: "https://i.pravatar.cc/150?img=9",
    bloodGroup: "AB+", district: "Rajshahi", upazila: "Boalia",
    role: "donor", status: "blocked", createdAt: "2024-03-05",
  },
  {
    _id: "u5", name: "Karim Hossain", email: "karim@example.com",
    avatar: "https://i.pravatar.cc/150?img=11",
    bloodGroup: "O-", district: "Khulna", upazila: "Daulatpur",
    role: "admin", status: "active", createdAt: "2023-12-01",
  },
  {
    _id: "u6", name: "Sumaiya Akter", email: "sumaiya@example.com",
    avatar: "https://i.pravatar.cc/150?img=20",
    bloodGroup: "B-", district: "Barishal", upazila: "Barishal Sadar",
    role: "donor", status: "active", createdAt: "2024-04-12",
  },
];

// Mock donation requests
export const mockRequests = [
  {
    _id: "r1",
    requesterName: "Arif Rahman", requesterEmail: "arif@example.com",
    recipientName: "Hasan Ali",
    recipientDistrict: "Dhaka", recipientUpazila: "Dhanmondi",
    hospitalName: "Dhaka Medical College Hospital",
    fullAddress: "Zahir Raihan Rd, Dhaka 1000",
    bloodGroup: "O+",
    donationDate: "2025-07-20", donationTime: "10:00 AM",
    requestMessage: "My father needs urgent blood for surgery. Please help.",
    status: "pending",
    donorName: null, donorEmail: null,
    createdAt: "2025-06-18",
  },
  {
    _id: "r2",
    requesterName: "Nusrat Jahan", requesterEmail: "nusrat@example.com",
    recipientName: "Rohima Khatun",
    recipientDistrict: "Chattogram", recipientUpazila: "Kotwali",
    hospitalName: "Chittagong Medical College Hospital",
    fullAddress: "K.B. Fazlul Kader Rd, Chittagong",
    bloodGroup: "A+",
    donationDate: "2025-07-22", donationTime: "02:00 PM",
    requestMessage: "Child needs blood transfusion post-surgery. Urgent.",
    status: "inprogress",
    donorName: "Karim Hossain", donorEmail: "karim@example.com",
    createdAt: "2025-06-17",
  },
  {
    _id: "r3",
    requesterName: "Sumaiya Akter", requesterEmail: "sumaiya@example.com",
    recipientName: "Milon Chowdhury",
    recipientDistrict: "Sylhet", recipientUpazila: "Sylhet Sadar",
    hospitalName: "Sylhet MAG Osmani Medical College Hospital",
    fullAddress: "Sylhet Sadar, Sylhet 3100",
    bloodGroup: "B+",
    donationDate: "2025-07-18", donationTime: "09:00 AM",
    requestMessage: "Accident victim, needs blood immediately.",
    status: "done",
    donorName: "Arif Rahman", donorEmail: "arif@example.com",
    createdAt: "2025-06-15",
  },
  {
    _id: "r4",
    requesterName: "Karim Hossain", requesterEmail: "karim@example.com",
    recipientName: "Jahanara Begum",
    recipientDistrict: "Rajshahi", recipientUpazila: "Boalia",
    hospitalName: "Rajshahi Medical College Hospital",
    fullAddress: "Medical College Rd, Rajshahi",
    bloodGroup: "AB-",
    donationDate: "2025-07-25", donationTime: "11:30 AM",
    requestMessage: "Patient with rare blood type AB- needed for scheduled operation.",
    status: "pending",
    donorName: null, donorEmail: null,
    createdAt: "2025-06-19",
  },
  {
    _id: "r5",
    requesterName: "Arif Rahman", requesterEmail: "arif@example.com",
    recipientName: "Tamim Islam",
    recipientDistrict: "Dhaka", recipientUpazila: "Mirpur",
    hospitalName: "BIRDEM General Hospital",
    fullAddress: "120 Kazi Nazrul Islam Ave, Dhaka",
    bloodGroup: "O+",
    donationDate: "2025-07-30", donationTime: "03:00 PM",
    requestMessage: "Thalassemia patient needs regular transfusion.",
    status: "canceled",
    donorName: null, donorEmail: null,
    createdAt: "2025-06-10",
  },
  {
    _id: "r6",
    requesterName: "Nusrat Jahan", requesterEmail: "nusrat@example.com",
    recipientName: "Sabrina Ahmed",
    recipientDistrict: "Dhaka", recipientUpazila: "Gulshan",
    hospitalName: "Square Hospital",
    fullAddress: "18/F Bir Uttam Qazi Nuruzzaman Sarak, Dhaka",
    bloodGroup: "B-",
    donationDate: "2025-08-01", donationTime: "01:00 PM",
    requestMessage: "Patient undergoing chemotherapy, needs B- urgently.",
    status: "pending",
    donorName: null, donorEmail: null,
    createdAt: "2025-06-20",
  },
];

// Mock funds
export const mockFunds = [
  { _id: "f1", donorName: "Arif Rahman", amount: 500, date: "2025-06-10", transactionId: "TXN-001" },
  { _id: "f2", donorName: "Nusrat Jahan", amount: 1000, date: "2025-06-12", transactionId: "TXN-002" },
  { _id: "f3", donorName: "Anonymous", amount: 2000, date: "2025-06-14", transactionId: "TXN-003" },
  { _id: "f4", donorName: "Sumaiya Akter", amount: 500, date: "2025-06-16", transactionId: "TXN-004" },
  { _id: "f5", donorName: "Karim Hossain", amount: 3000, date: "2025-06-18", transactionId: "TXN-005" },
];

// Mock donor search results
export const mockDonors = [
  {
    _id: "d1", name: "Arif Rahman", bloodGroup: "O+",
    district: "Dhaka", upazila: "Dhanmondi",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastDonated: "2025-03-15", available: true,
  },
  {
    _id: "d2", name: "Rahim Uddin", bloodGroup: "O+",
    district: "Dhaka", upazila: "Mirpur",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastDonated: "2025-01-10", available: true,
  },
  {
    _id: "d3", name: "Karim Hossain", bloodGroup: "O+",
    district: "Dhaka", upazila: "Gulshan",
    avatar: "https://i.pravatar.cc/150?img=11",
    lastDonated: "2025-04-20", available: false,
  },
];

// Dashboard stats
export const dashboardStats = {
  totalUsers: 2847,
  totalFunding: 125000,
  totalRequests: 1203,
  monthlyData: [
    { month: "Jan", requests: 78 },
    { month: "Feb", requests: 91 },
    { month: "Mar", requests: 105 },
    { month: "Apr", requests: 88 },
    { month: "May", requests: 124 },
    { month: "Jun", requests: 137 },
  ],
};

// Logged-in mock user (simulating auth)
export const mockCurrentUser = {
  _id: "u1",
  name: "Arif Rahman",
  email: "arif@example.com",
  avatar: "https://i.pravatar.cc/150?img=1",
  bloodGroup: "O+",
  district: "Dhaka",
  upazila: "Dhanmondi",
  role: "admin", // change to "donor" or "volunteer" for different views
  status: "active",
};
