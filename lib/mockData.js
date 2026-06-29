// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA — replace with real API responses when backend is ready
// ─────────────────────────────────────────────────────────────────────────────

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const DONATION_STATUSES = ["pending", "inprogress", "done", "canceled"];

export const USER_ROLES = ["admin", "donor", "volunteer"];

// Blood type compatibility map
export const COMPATIBILITY = {
  "A+": { canDonateTo: ["A+", "AB+"], canReceiveFrom: ["A+", "A-", "O+", "O-"] },
  "A-": { canDonateTo: ["A+", "A-", "AB+", "AB-"], canReceiveFrom: ["A-", "O-"] },
  "B+": { canDonateTo: ["B+", "AB+"], canReceiveFrom: ["B+", "B-", "O+", "O-"] },
  "B-": { canDonateTo: ["B+", "B-", "AB+", "AB-"], canReceiveFrom: ["B-", "O-"] },
  "AB+": { canDonateTo: ["AB+"], canReceiveFrom: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
  "AB-": { canDonateTo: ["AB+", "AB-"], canReceiveFrom: ["A-", "B-", "AB-", "O-"] },
  "O+": { canDonateTo: ["A+", "B+", "AB+", "O+"], canReceiveFrom: ["O+", "O-"] },
  "O-": { canDonateTo: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], canReceiveFrom: ["O-"] },
};

// Bangladesh districts
export const DISTRICTS = [
  "Comilla",
  "Feni",
  "Brahmanbaria",
  "Rangamati",
  "Noakhali",
  "Chandpur",
  "Lakshmipur",
  "Chattogram",
  "Coxsbazar",
  "Khagrachhari",
  "Bandarban",
  "Sirajganj",
  "Pabna",
  "Bogura",
  "Rajshahi",
  "Natore",
  "Joypurhat",
  "Chapainawabganj",
  "Naogaon",
  "Jashore",
  "Satkhira",
  "Meherpur",
  "Narail",
  "Chuadanga",
  "Kushtia",
  "Magura",
  "Khulna",
  "Bagerhat",
  "Jhenaidah",
  "Jhalakathi",
  "Patuakhali",
  "Pirojpur",
  "Barisal",
  "Bhola",
  "Barguna",
  "Sylhet",
  "Moulvibazar",
  "Habiganj",
  "Sunamganj",
  "Narsingdi",
  "Gazipur",
  "Shariatpur",
  "Narayanganj",
  "Tangail",
  "Kishoreganj",
  "Manikganj",
  "Dhaka",
  "Munshiganj",
  "Rajbari",
  "Madaripur",
  "Gopalganj",
  "Faridpur",
  "Panchagarh",
  "Dinajpur",
  "Lalmonirhat",
  "Nilphamari",
  "Gaibandha",
  "Thakurgaon",
  "Rangpur",
  "Kurigram",
  "Sherpur",
  "Mymensingh",
  "Jamalpur",
  "Netrokona"
];

export const UPAZILAS = {
  Comilla: ["Debidwar", "Barura", "Brahmanpara", "Chandina", "Chauddagram", "Daudkandi", "Homna", "Laksam", "Muradnagar", "Nangalkot", "Comilla Sadar", "Meghna", "Monohargonj", "Sadarsouth", "Titas", "Burichang", "Lalmai"],
  Feni: ["Chhagalnaiya", "Feni Sadar", "Sonagazi", "Fulgazi", "Parshuram", "Daganbhuiyan"],
  Brahmanbaria: ["Brahmanbaria Sadar", "Kasba", "Nasirnagar", "Sarail", "Ashuganj", "Akhaura", "Nabinagar", "Bancharampur", "Bijoynagar"],
  Rangamati: ["Rangamati Sadar", "Kaptai", "Kawkhali", "Baghaichari", "Barkal", "Langadu", "Rajasthali", "Belaichari", "Juraichari", "Naniarchar"],
  Noakhali: ["Noakhali Sadar", "Companiganj", "Begumganj", "Hatia", "Subarnachar", "Kabirhat", "Senbug", "Chatkhil", "Sonaimori"],
  Chandpur: ["Haimchar", "Kachua", "Shahrasti", "Chandpur Sadar", "Matlab South", "Hajiganj", "Matlab North", "Faridgonj"],
  Lakshmipur: ["Lakshmipur Sadar", "Kamalnagar", "Raipur", "Ramgati", "Ramganj"],
  Chattogram: ["Pahartali","Akbar Shah", "Bayezid Bostami","Bakoli", "Bandar", "Chawkbazar","Chandanaish", "Double Mooring","Halishahar", "Hathazari", "Karnafuli","Kutubdia","Lohagara","Mirsharai","Mohra","Patiya","Patharghata","Potenga","Raozan","Satkania","Sitakunda","Sandwip","Agrabad","Agrabad Commercial Area","Akber Shah","Ansari Lane","Badshah Miar Road","Bakalia","Bandar","Bayezid Bostami","Boalkhali","Chaktai","Chandgaon","Chittagong University Road","Dampara","Double Mooring","Fauzdarhat","Feni Road","Halishahar","Halishahar Housing Society","Hathazari","Jamtal","Jubilee Road","Kadam Bari","Karnaphuli","Kotwali","Kumira","Lalkhan Bazar","Lohagara","Lohagora","Lohagora Road","Lohagara Road Extended","Mahamuni","Mansurabad","Mirsharai","Mohanpur","Nandankanan","Nathia Colony","Pahartali","Pahartali Union Road","Patiya","Polerhat","Potiya","Qutubdia","Raozan","Sandwip","Satkania","Sent Martin","Sholosho Shahar","Shyampur","Sital Para","Sitakunda","Suborno Char","Syedur Rahman Road","Tangail Road","Tangail Road Extension","Tejgaon Industrial Area","Tin Pool","Wasania High School Road","Wasania High School Road Extension","WASA Road","WASA Road Extension" ,"Rangunia", "Sitakunda", "Mirsharai", "Patiya", "Sandwip", "Banshkhali", "Boalkhali", "Anwara", "Chandanaish", "Satkania", "Lohagara", "Hathazari", "Fatikchhari", "Raozan", "Karnafuli"],
  Coxsbazar: ["Coxsbazar Sadar", "Chakaria", "Kutubdia", "Ukhiya", "Moheshkhali", "Pekua", "Ramu", "Teknaf"],
  Khagrachhari: ["Khagrachhari Sadar", "Dighinala", "Panchari", "Laxmichhari", "Mohalchari", "Manikchari", "Ramgarh", "Matiranga", "Guimara"],
  Bandarban: ["Bandarban Sadar", "Alikadam", "Naikhongchhari", "Rowangchhari", "Lama", "Ruma", "Thanchi"],
  Sirajganj: ["Belkuchi", "Chauhali", "Kamarkhand", "Kazipur", "Raigonj", "Shahjadpur", "Sirajganj Sadar", "Tarash", "Ullapara"],
  Pabna: ["Sujanagar", "Ishurdi", "Bhangura", "Pabna Sadar", "Bera", "Atghoria", "Chatmohar", "Santhia", "Faridpur"],
  Bogura: ["Kahaloo", "Bogra Sadar", "Shariakandi", "Shajahanpur", "Dupchanchia", "Adamdighi", "Nondigram", "Sonatala", "Dhunot", "Gabtali", "Sherpur", "Shibganj"],
  Rajshahi: ["Paba", "Durgapur", "Mohonpur", "Charghat", "Puthia", "Bagha", "Godagari", "Tanore", "Bagmara"],
  Natore: ["Natore Sadar", "Singra", "Baraigram", "Bagatipara", "Lalpur", "Gurudaspur", "Naldanga"],
  Joypurhat: ["Akkelpur", "Kalai", "Khetlal", "Panchbibi", "Joypurhat Sadar"],
  Chapainawabganj: ["Chapainawabganj Sadar", "Gomostapur", "Nachol", "Bholahat", "Shibganj"],
  Naogaon: ["Mohadevpur", "Badalgachi", "Patnitala", "Dhamoirhat", "Niamatpur", "Manda", "Atrai", "Raninagar", "Naogaon Sadar", "Porsha", "Sapahar"],
  Sylhet: ["Jaintiapur", "Kanaighat", "Sylhet Sadar", "Zakiganj", "Dakshinsurma", "Osmaninagar"],
  Moulvibazar: ["Barlekha", "Kamolganj", "Kulaura", "Moulvibazar Sadar", "Rajnagar", "Sreemangal", "Juri"],
  Habiganj: ["Nabiganj", "Bahubal", "Ajmiriganj", "Baniachong", "Lakhai", "Chunarughat", "Habiganj Sadar", "Madhabpur"],
  Sunamganj: ["Sunamganj Sadar", "South Sunamganj", "Bishwambarpur", "Chhatak", "Jagannathpur", "Dowarabazar", "Tahirpur", "Dharmapasha", "Jamalganj", "Shalla", "Derai"],
  Narsingdi: ["Belabo", "Monohardi", "Narsingdi Sadar", "Palash", "Raipura", "Shibpur"],
  Gazipur: ["Kaliganj", "Kaliakair", "Kapasia", "Gazipur Sadar", "Sreepur"],
  Shariatpur: ["Shariatpur Sadar", "Naria", "Zajira", "Gosairhat", "Bhedarganj", "Damudya"],
  Narayanganj: ["Araihazar", "Bandar", "Rupganj", "Sonargaon", "Narayanganj Sadar", "Fatullah-Godnaghail"],
  Kishoreganj: ["Kishoreganj Sadar", "Hossainpur", "Karimganj", "Tarail", "Bajitpur", "Kuliarchar", "Bhairab", "Nikli", "Itna", "Mithamain", "Austagram", "Pakundia", "Katiadi"],
  Manikganj: ["Manikganj Sadar", "Singair", "Shivalaya", "Saturia", "Harirampur", "Ghior", "Daulatpur"],
  Dhaka: ["Dhanmondi", "Gulshan", "Mirpur", "Mohammadpur", "Motijheel", "Tejgaon", "Uttara", "Banani", "Savar", "Dhamrai", "Keraniganj", "Nawabganj", "Dohar"],
  Munshiganj: ["Munshiganj Sadar", "Sreenagar", "Sirajdikhan", "Lohajang", "Tongibari", "Gazaria"],
  Rajbari: ["Rajbari Sadar", "Goalanda", "Pangsha", "Baliakandi", "Kalukhali"],
  Madaripur: ["Madaripur Sadar", "Shibchar", "Kalkini", "Rajoir"],
  Gopalganj: ["Gopalganj Sadar", "Kashiani", "Kotalipara", "Muksudpur", "Tungipara"],
  Faridpur: ["Faridpur Sadar", "Madhukhali", "Boalmari", "Alfadanga", "Saltha", "Nagarkanda", "Bhanga", "Sadarpur", "Charbhadrasan"],
  Panchagarh: ["Panchagarh Sadar", "Boda", "Debiganj", "Atwari", "Tetulia"],
  Dinajpur: ["Dinajpur Sadar", "Birganj", "Kaharole", "Bochaganj", "Birol", "Chirirbandar", "Parbatipur", "Phulbari", "Nawabganj", "Hakimpur", "Ghoraghat", "Khansama"],
  Lalmonirhat: ["Lalmonirhat Sadar", "Kaliganj", "Aditmari", "Hatibandha", "Patgram"],
  Nilphamari: ["Nilphamari Sadar", "Saidpur", "Jaldhaka", "Kishoreganj", "Domar", "Dimla"],
  Gaibandha: ["Gaibandha Sadar", "Sadullapur", "Palashbari", "Gobindaganj", "Sundarganj", "Saghata", "Phulchhari"],
  Thakurgaon: ["Thakurgaon Sadar", "Baliadangi", "Ranisankail", "Haripur", "Pirganj"],
  Rangpur: ["Rangpur Sadar", "Badarganj", "Gangachhara", "Kaunia", "Mithapukur", "Pirgachha", "Pirganj", "Taraganj"],
  Kurigram: ["Kurigram Sadar", "Nageshwari", "Bhurungamari", "Phulbari", "Rajarhat", "Ulipur", "Chilmari", "Roumari", "Char Rajibpur"],
  Sherpur: ["Sherpur Sadar", "Nalitabari", "Sreebardi", "Karpa", "Jhenaigati"],
  Mymensingh: ["Mymensingh Sadar", "Bhaluka", "Dhobaura", "Fulbaria", "Gaffargaon", "Gauripur", "Haluaghat", "Ishwarganj", "Muktagachha", "Nandail", "Phulpur", "Trishal", "Tarafund"],
  Jamalpur: ["Jamalpur Sadar", "Bakshiganj", "Dewanganj", "Isampur", "Madarganj", "Melandaha", "Sarishabari"],
  Netrokona: ["Netrokona Sadar", "Barhatta", "Durgapur", "Kendua", "Atpara", "Madan", "Khaliajuri", "Kalmakanda", "Mohanganj", "Purbadhala"]
};

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


