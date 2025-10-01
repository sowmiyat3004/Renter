export interface IndianState {
  name: string
  code: string
  cities: string[]
  districts?: string[]
}

export interface IndianLocation {
  state: string
  city: string
  district?: string
  lat: number
  lng: number
}

export interface IndianDistrict {
  state: string
  district: string
  cities: string[]
}

// Major Indian states with their major cities
export const indianStates: IndianState[] = [
  {
    name: "Andhra Pradesh",
    code: "AP",
    cities: ["Hyderabad", "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati", "Kadapa", "Anantapur", "Chittoor"]
  },
  {
    name: "Arunachal Pradesh",
    code: "AR",
    cities: ["Itanagar", "Naharlagun", "Pasighat", "Tezpur", "Bomdila", "Ziro", "Along", "Roing", "Daporijo", "Anini"]
  },
  {
    name: "Assam",
    code: "AS",
    cities: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Bongaigaon", "Dhubri", "Diphu"]
  },
  {
    name: "Bihar",
    code: "BR",
    cities: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Purnia", "Ara", "Begusarai", "Katihar", "Munger"]
  },
  {
    name: "Chhattisgarh",
    code: "CG",
    cities: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon", "Durg", "Raigarh", "Jagdalpur", "Ambikapur", "Dhamtari"]
  },
  {
    name: "Goa",
    code: "GA",
    cities: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Mormugao", "Bicholim", "Valpoi", "Sanguem", "Canacona"]
  },
  {
    name: "Gujarat",
    code: "GJ",
    cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Nadiad", "Morbi"]
  },
  {
    name: "Haryana",
    code: "HR",
    cities: ["Gurgaon", "Faridabad", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Bhiwani"]
  },
  {
    name: "Himachal Pradesh",
    code: "HP",
    cities: ["Shimla", "Dharamshala", "Solan", "Mandi", "Palampur", "Kullu", "Chamba", "Una", "Baddi", "Nahan"]
  },
  {
    name: "Jharkhand",
    code: "JH",
    cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Phusro", "Hazaribagh", "Giridih", "Ramgarh", "Medininagar"]
  },
  {
    name: "Karnataka",
    code: "KA",
    cities: ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga", "Davanagere", "Bellary", "Bijapur", "Shimoga"]
  },
  {
    name: "Kerala",
    code: "KL",
    cities: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Malappuram", "Kannur", "Kasaragod"]
  },
  {
    name: "Madhya Pradesh",
    code: "MP",
    cities: ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa"]
  },
  {
    name: "Maharashtra",
    code: "MH",
    cities: ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Amravati", "Kolhapur", "Sangli"]
  },
  {
    name: "Manipur",
    code: "MN",
    cities: ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Senapati", "Tamenglong", "Chandel", "Ukhrul", "Kakching", "Jiribam"]
  },
  {
    name: "Meghalaya",
    code: "ML",
    cities: ["Shillong", "Tura", "Jowai", "Nongstoin", "Williamnagar", "Baghmara", "Nongpoh", "Mairang", "Khliehriat", "Amlarem"]
  },
  {
    name: "Mizoram",
    code: "MZ",
    cities: ["Aizawl", "Lunglei", "Saiha", "Champhai", "Kolasib", "Serchhip", "Lawngtlai", "Mamit", "Saitual", "Hnahthial"]
  },
  {
    name: "Nagaland",
    code: "NL",
    cities: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Phek", "Kiphire", "Longleng", "Peren"]
  },
  {
    name: "Odisha",
    code: "OR",
    cities: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada", "Jharsuguda"]
  },
  {
    name: "Punjab",
    code: "PB",
    cities: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Firozpur", "Batala", "Moga"]
  },
  {
    name: "Rajasthan",
    code: "RJ",
    cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Bharatpur", "Alwar", "Bhilwara", "Sikar"]
  },
  {
    name: "Sikkim",
    code: "SK",
    cities: ["Gangtok", "Namchi", "Mangan", "Gyalshing", "Ravangla", "Singtam", "Rangpo", "Jorethang", "Pakyong", "Rongli"]
  },
  {
    name: "Tamil Nadu",
    code: "TN",
    cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Erode", "Vellore", "Thoothukkudi"]
  },
  {
    name: "Telangana",
    code: "TG",
    cities: ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Ramagundam", "Mahabubnagar", "Nalgonda", "Adilabad", "Suryapet"]
  },
  {
    name: "Tripura",
    code: "TR",
    cities: ["Agartala", "Dharmanagar", "Udaipur", "Ambassa", "Kailashahar", "Belonia", "Khowai", "Teliamura", "Sabroom", "Amarpur"]
  },
  {
    name: "Uttar Pradesh",
    code: "UP",
    cities: ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut", "Allahabad", "Bareilly", "Ghaziabad", "Moradabad", "Aligarh"]
  },
  {
    name: "Uttarakhand",
    code: "UK",
    cities: ["Dehradun", "Haridwar", "Roorkee", "Kashipur", "Rudrapur", "Haldwani", "Rishikesh", "Ramnagar", "Pithoragarh", "Almora"]
  },
  {
    name: "West Bengal",
    code: "WB",
    cities: ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Malda", "Baharampur", "Habra", "Kharagpur", "Shantipur"]
  },
  {
    name: "Delhi",
    code: "DL",
    cities: ["New Delhi", "Central Delhi", "East Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"]
  },
  {
    name: "Jammu and Kashmir",
    code: "JK",
    cities: ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Sopore", "Kathua", "Udhampur", "Punch", "Rajauri", "Doda"]
  },
  {
    name: "Ladakh",
    code: "LA",
    cities: ["Leh", "Kargil", "Drass", "Zanskar", "Nubra", "Changthang", "Suru", "Aryan Valley", "Dah", "Hanu"]
  },
  {
    name: "Puducherry",
    code: "PY",
    cities: ["Puducherry", "Karaikal", "Mahe", "Yanam"]
  }
]

// Major Indian districts with their cities
export const indianDistricts: IndianDistrict[] = [
  // Maharashtra
  { state: "Maharashtra", district: "Mumbai", cities: ["Mumbai", "Thane", "Navi Mumbai", "Kalyan", "Vasai-Virar"] },
  { state: "Maharashtra", district: "Pune", cities: ["Pune", "Pimpri-Chinchwad", "Alandi", "Lonavala", "Khandala"] },
  { state: "Maharashtra", district: "Nagpur", cities: ["Nagpur", "Wardha", "Amravati", "Akola", "Yavatmal"] },
  { state: "Maharashtra", district: "Nashik", cities: ["Nashik", "Malegaon", "Dhule", "Jalgaon", "Nandurbar"] },
  { state: "Maharashtra", district: "Aurangabad", cities: ["Aurangabad", "Jalna", "Beed", "Latur", "Osmanabad"] },
  
  // Karnataka
  { state: "Karnataka", district: "Bangalore Urban", cities: ["Bangalore", "Electronic City", "Whitefield", "Marathahalli", "Koramangala"] },
  { state: "Karnataka", district: "Mysore", cities: ["Mysore", "Srirangapatna", "Nanjangud", "Chamrajanagar", "Hunsur"] },
  { state: "Karnataka", district: "Hubli-Dharwad", cities: ["Hubli", "Dharwad", "Gadag", "Haveri", "Koppal"] },
  { state: "Karnataka", district: "Mangalore", cities: ["Mangalore", "Udupi", "Kundapur", "Karkala", "Bantwal"] },
  
  // Tamil Nadu
  { state: "Tamil Nadu", district: "Chennai", cities: ["Chennai", "Tambaram", "Avadi", "Ambattur", "Pallavaram"] },
  { state: "Tamil Nadu", district: "Coimbatore", cities: ["Coimbatore", "Tiruppur", "Pollachi", "Mettupalayam", "Sulur"] },
  { state: "Tamil Nadu", district: "Madurai", cities: ["Madurai", "Melur", "Usilampatti", "Thirumangalam", "Vadipatti"] },
  { state: "Tamil Nadu", district: "Salem", cities: ["Salem", "Namakkal", "Rasipuram", "Attur", "Mettur"] },
  
  // Delhi
  { state: "Delhi", district: "Central Delhi", cities: ["New Delhi", "Daryaganj", "Paharganj", "Karol Bagh", "Connaught Place"] },
  { state: "Delhi", district: "North Delhi", cities: ["Civil Lines", "Kashmere Gate", "Timarpur", "Malka Ganj", "Kamla Nagar"] },
  { state: "Delhi", district: "South Delhi", cities: ["Saket", "Malviya Nagar", "Hauz Khas", "Greater Kailash", "Lajpat Nagar"] },
  { state: "Delhi", district: "East Delhi", cities: ["Shahdara", "Seelampur", "Gokulpuri", "Karawal Nagar", "Vivek Vihar"] },
  { state: "Delhi", district: "West Delhi", cities: ["Rajouri Garden", "Punjabi Bagh", "Janakpuri", "Uttam Nagar", "Dwarka"] },
  
  // West Bengal
  { state: "West Bengal", district: "Kolkata", cities: ["Kolkata", "Salt Lake", "Howrah", "Dum Dum", "Baranagar"] },
  { state: "West Bengal", district: "North 24 Parganas", cities: ["Barasat", "Basirhat", "Bangaon", "Bidhannagar", "Madhyamgram"] },
  { state: "West Bengal", district: "South 24 Parganas", cities: ["Alipore", "Diamond Harbour", "Kakdwip", "Canning", "Baruipur"] },
  { state: "West Bengal", district: "Howrah", cities: ["Howrah", "Uluberia", "Amta", "Domjur", "Bagnan"] },
  
  // Gujarat
  { state: "Gujarat", district: "Ahmedabad", cities: ["Ahmedabad", "Gandhinagar", "Sanand", "Dholka", "Viramgam"] },
  { state: "Gujarat", district: "Surat", cities: ["Surat", "Navsari", "Bardoli", "Vyara", "Mahuva"] },
  { state: "Gujarat", district: "Vadodara", cities: ["Vadodara", "Anand", "Bharuch", "Nadiad", "Petlad"] },
  { state: "Gujarat", district: "Rajkot", cities: ["Rajkot", "Gondal", "Jetpur", "Upleta", "Dhoraji"] },
  
  // Uttar Pradesh
  { state: "Uttar Pradesh", district: "Lucknow", cities: ["Lucknow", "Barabanki", "Unnao", "Rae Bareli", "Sitapur"] },
  { state: "Uttar Pradesh", district: "Kanpur", cities: ["Kanpur", "Kanpur Dehat", "Unnao", "Fatehpur", "Kannauj"] },
  { state: "Uttar Pradesh", district: "Agra", cities: ["Agra", "Firozabad", "Mathura", "Mainpuri", "Etah"] },
  { state: "Uttar Pradesh", district: "Varanasi", cities: ["Varanasi", "Chandauli", "Ghazipur", "Jaunpur", "Mirzapur"] },
  
  // Rajasthan
  { state: "Rajasthan", district: "Jaipur", cities: ["Jaipur", "Dausa", "Sikar", "Tonk", "Alwar"] },
  { state: "Rajasthan", district: "Jodhpur", cities: ["Jodhpur", "Pali", "Barmer", "Jaisalmer", "Jalore"] },
  { state: "Rajasthan", district: "Udaipur", cities: ["Udaipur", "Rajsamand", "Banswara", "Dungarpur", "Pratapgarh"] },
  { state: "Rajasthan", district: "Kota", cities: ["Kota", "Bundi", "Baran", "Jhalawar", "Baran"] },
  
  // Kerala
  { state: "Kerala", district: "Thiruvananthapuram", cities: ["Thiruvananthapuram", "Neyyattinkara", "Attingal", "Nedumangad", "Chirayinkeezhu"] },
  { state: "Kerala", district: "Kochi", cities: ["Kochi", "Ernakulam", "Aluva", "Kalamassery", "Thripunithura"] },
  { state: "Kerala", district: "Kozhikode", cities: ["Kozhikode", "Vadakara", "Koyilandy", "Thalassery", "Kannur"] },
  { state: "Kerala", district: "Thrissur", cities: ["Thrissur", "Chalakudy", "Kodungallur", "Guruvayur", "Irinjalakuda"] },
  
  // Andhra Pradesh
  { state: "Andhra Pradesh", district: "Hyderabad", cities: ["Hyderabad", "Secunderabad", "Cyberabad", "Rangareddy", "Medchal"] },
  { state: "Andhra Pradesh", district: "Visakhapatnam", cities: ["Visakhapatnam", "Vizianagaram", "Srikakulam", "Anakapalle", "Bheemunipatnam"] },
  { state: "Andhra Pradesh", district: "Vijayawada", cities: ["Vijayawada", "Guntur", "Tenali", "Mangalagiri", "Tadepalli"] },
  { state: "Andhra Pradesh", district: "Tirupati", cities: ["Tirupati", "Chittoor", "Puttur", "Srikalahasti", "Renigunta"] },
  
  // Telangana
  { state: "Telangana", district: "Hyderabad", cities: ["Hyderabad", "Secunderabad", "Cyberabad", "Rangareddy", "Medchal"] },
  { state: "Telangana", district: "Warangal", cities: ["Warangal", "Hanamkonda", "Kazipet", "Jangaon", "Parkal"] },
  { state: "Telangana", district: "Nizamabad", cities: ["Nizamabad", "Kamareddy", "Bodhan", "Armoor", "Yellareddy"] },
  { state: "Telangana", district: "Khammam", cities: ["Khammam", "Kothagudem", "Bhadrachalam", "Paloncha", "Madhira"] },
  
  // Punjab
  { state: "Punjab", district: "Chandigarh", cities: ["Chandigarh", "Mohali", "Panchkula", "Zirakpur", "Kharar"] },
  { state: "Punjab", district: "Ludhiana", cities: ["Ludhiana", "Jagraon", "Raikot", "Samrala", "Payal"] },
  { state: "Punjab", district: "Amritsar", cities: ["Amritsar", "Tarn Taran", "Ajnala", "Majitha", "Beas"] },
  { state: "Punjab", district: "Jalandhar", cities: ["Jalandhar", "Nakodar", "Phillaur", "Nawanshahr", "Shahkot"] },
  
  // Haryana
  { state: "Haryana", district: "Gurgaon", cities: ["Gurgaon", "Faridabad", "Palwal", "Nuh", "Rewari"] },
  { state: "Haryana", district: "Panipat", cities: ["Panipat", "Samalkha", "Israna", "Bapoli", "Madlauda"] },
  { state: "Haryana", district: "Ambala", cities: ["Ambala", "Yamunanagar", "Kurukshetra", "Kaithal", "Naraingarh"] },
  { state: "Haryana", district: "Rohtak", cities: ["Rohtak", "Jhajjar", "Sonipat", "Bahadurgarh", "Gohana"] },
  
  // Madhya Pradesh
  { state: "Madhya Pradesh", district: "Bhopal", cities: ["Bhopal", "Sehore", "Raisen", "Vidisha", "Berasia"] },
  { state: "Madhya Pradesh", district: "Indore", cities: ["Indore", "Dewas", "Ujjain", "Mhow", "Sanwer"] },
  { state: "Madhya Pradesh", district: "Gwalior", cities: ["Gwalior", "Morena", "Bhind", "Datia", "Gohad"] },
  { state: "Madhya Pradesh", district: "Jabalpur", cities: ["Jabalpur", "Katni", "Narsinghpur", "Mandla", "Dindori"] },
  
  // Bihar
  { state: "Bihar", district: "Patna", cities: ["Patna", "Nalanda", "Bhojpur", "Buxar", "Kaimur"] },
  { state: "Bihar", district: "Gaya", cities: ["Gaya", "Nawada", "Aurangabad", "Jehanabad", "Arwal"] },
  { state: "Bihar", district: "Bhagalpur", cities: ["Bhagalpur", "Banka", "Munger", "Lakhisarai", "Sheikhpura"] },
  { state: "Bihar", district: "Muzaffarpur", cities: ["Muzaffarpur", "Vaishali", "Sitamarhi", "Sheohar", "East Champaran"] },
  
  // Odisha
  { state: "Odisha", district: "Bhubaneswar", cities: ["Bhubaneswar", "Cuttack", "Puri", "Khordha", "Nayagarh"] },
  { state: "Odisha", district: "Rourkela", cities: ["Rourkela", "Sundargarh", "Jharsuguda", "Sambalpur", "Deogarh"] },
  { state: "Odisha", district: "Berhampur", cities: ["Berhampur", "Ganjam", "Gajapati", "Kandhamal", "Boudh"] },
  { state: "Odisha", district: "Balasore", cities: ["Balasore", "Bhadrak", "Mayurbhanj", "Keonjhar", "Jajpur"] },
  
  // Jharkhand
  { state: "Jharkhand", district: "Ranchi", cities: ["Ranchi", "Khunti", "Gumla", "Lohardaga", "Simdega"] },
  { state: "Jharkhand", district: "Jamshedpur", cities: ["Jamshedpur", "East Singhbhum", "West Singhbhum", "Seraikela", "Kharsawan"] },
  { state: "Jharkhand", district: "Dhanbad", cities: ["Dhanbad", "Bokaro", "Giridih", "Hazaribagh", "Ramgarh"] },
  { state: "Jharkhand", district: "Deoghar", cities: ["Deoghar", "Dumka", "Jamtara", "Pakur", "Sahebganj"] },
  
  // Assam
  { state: "Assam", district: "Guwahati", cities: ["Guwahati", "Kamrup", "Nalbari", "Barpeta", "Bongaigaon"] },
  { state: "Assam", district: "Silchar", cities: ["Silchar", "Cachar", "Hailakandi", "Karimganj", "Dima Hasao"] },
  { state: "Assam", district: "Dibrugarh", cities: ["Dibrugarh", "Tinsukia", "Sivasagar", "Jorhat", "Golaghat"] },
  { state: "Assam", district: "Nagaon", cities: ["Nagaon", "Morigaon", "Hojai", "Karbi Anglong", "Dima Hasao"] },
  
  // Goa
  { state: "Goa", district: "North Goa", cities: ["Panaji", "Mapusa", "Ponda", "Bicholim", "Pernem"] },
  { state: "Goa", district: "South Goa", cities: ["Margao", "Vasco da Gama", "Mormugao", "Quepem", "Canacona"] },
  
  // Himachal Pradesh
  { state: "Himachal Pradesh", district: "Shimla", cities: ["Shimla", "Solan", "Sirmaur", "Kinnaur", "Lahaul Spiti"] },
  { state: "Himachal Pradesh", district: "Dharamshala", cities: ["Dharamshala", "Kangra", "Una", "Hamirpur", "Bilaspur"] },
  { state: "Himachal Pradesh", district: "Mandi", cities: ["Mandi", "Kullu", "Lahaul Spiti", "Chamba", "Bilaspur"] },
  
  // Uttarakhand
  { state: "Uttarakhand", district: "Dehradun", cities: ["Dehradun", "Haridwar", "Rishikesh", "Mussoorie", "Chakrata"] },
  { state: "Uttarakhand", district: "Nainital", cities: ["Nainital", "Almora", "Bageshwar", "Champawat", "Pithoragarh"] },
  { state: "Uttarakhand", district: "Udham Singh Nagar", cities: ["Rudrapur", "Kashipur", "Bazpur", "Khatima", "Sitarganj"] },
  
  // Chhattisgarh
  { state: "Chhattisgarh", district: "Raipur", cities: ["Raipur", "Bhilai", "Durg", "Rajnandgaon", "Balod"] },
  { state: "Chhattisgarh", district: "Bilaspur", cities: ["Bilaspur", "Korba", "Janjgir-Champa", "Mungeli", "Sakti"] },
  { state: "Chhattisgarh", district: "Jagdalpur", cities: ["Jagdalpur", "Bastar", "Kanker", "Narayanpur", "Dantewada"] },
  
  // Jammu and Kashmir
  { state: "Jammu and Kashmir", district: "Srinagar", cities: ["Srinagar", "Ganderbal", "Budgam", "Pulwama", "Shopian"] },
  { state: "Jammu and Kashmir", district: "Jammu", cities: ["Jammu", "Kathua", "Samba", "Udhampur", "Reasi"] },
  { state: "Jammu and Kashmir", district: "Anantnag", cities: ["Anantnag", "Kulgam", "Shopian", "Pulwama", "Awantipora"] },
  
  // Ladakh
  { state: "Ladakh", district: "Leh", cities: ["Leh", "Kargil", "Drass", "Zanskar", "Nubra"] },
  
  // Puducherry
  { state: "Puducherry", district: "Puducherry", cities: ["Puducherry", "Karaikal", "Mahe", "Yanam"] }
]

// Major Indian cities with coordinates
export const indianCities: IndianLocation[] = [
  // Major metros
  { state: "Maharashtra", city: "Mumbai", district: "Mumbai", lat: 19.0760, lng: 72.8777 },
  { state: "Delhi", city: "New Delhi", district: "Central Delhi", lat: 28.6139, lng: 77.2090 },
  { state: "Karnataka", city: "Bangalore", district: "Bangalore Urban", lat: 12.9716, lng: 77.5946 },
  { state: "Tamil Nadu", city: "Chennai", district: "Chennai", lat: 13.0827, lng: 80.2707 },
  { state: "West Bengal", city: "Kolkata", district: "Kolkata", lat: 22.5726, lng: 88.3639 },
  { state: "Gujarat", city: "Ahmedabad", district: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
  { state: "Maharashtra", city: "Pune", district: "Pune", lat: 18.5204, lng: 73.8567 },
  { state: "Haryana", city: "Gurgaon", district: "Gurgaon", lat: 28.4595, lng: 77.0266 },
  { state: "Haryana", city: "Faridabad", district: "Gurgaon", lat: 28.4089, lng: 77.3178 },
  { state: "Uttar Pradesh", city: "Lucknow", lat: 26.8467, lng: 80.9462 },
  { state: "Uttar Pradesh", city: "Kanpur", lat: 26.4499, lng: 80.3319 },
  { state: "Uttar Pradesh", city: "Agra", lat: 27.1767, lng: 78.0081 },
  { state: "Uttar Pradesh", city: "Varanasi", lat: 25.3176, lng: 82.9739 },
  { state: "Rajasthan", city: "Jaipur", lat: 26.9124, lng: 75.7873 },
  { state: "Rajasthan", city: "Jodhpur", lat: 26.2389, lng: 73.0243 },
  { state: "Rajasthan", city: "Udaipur", lat: 24.5854, lng: 73.7125 },
  { state: "Madhya Pradesh", city: "Bhopal", lat: 23.2599, lng: 77.4126 },
  { state: "Madhya Pradesh", city: "Indore", lat: 22.7196, lng: 75.8577 },
  { state: "Gujarat", city: "Surat", lat: 21.1702, lng: 72.8311 },
  { state: "Gujarat", city: "Vadodara", lat: 22.3072, lng: 73.1812 },
  { state: "Gujarat", city: "Rajkot", lat: 22.3039, lng: 70.8022 },
  { state: "Karnataka", city: "Mysore", lat: 12.2958, lng: 76.6394 },
  { state: "Karnataka", city: "Hubli", lat: 15.3647, lng: 75.1240 },
  { state: "Karnataka", city: "Mangalore", lat: 12.9141, lng: 74.8560 },
  { state: "Kerala", city: "Thiruvananthapuram", lat: 8.5241, lng: 76.9366 },
  { state: "Kerala", city: "Kochi", lat: 9.9312, lng: 76.2673 },
  { state: "Kerala", city: "Kozhikode", lat: 11.2588, lng: 75.7804 },
  { state: "Andhra Pradesh", city: "Hyderabad", lat: 17.3850, lng: 78.4867 },
  { state: "Andhra Pradesh", city: "Visakhapatnam", lat: 17.6868, lng: 83.2185 },
  { state: "Andhra Pradesh", city: "Vijayawada", lat: 16.5062, lng: 80.6480 },
  { state: "Telangana", city: "Hyderabad", lat: 17.3850, lng: 78.4867 },
  { state: "Telangana", city: "Warangal", lat: 17.9689, lng: 79.5941 },
  { state: "Tamil Nadu", city: "Coimbatore", lat: 11.0168, lng: 76.9558 },
  { state: "Tamil Nadu", city: "Madurai", lat: 9.9252, lng: 78.1198 },
  { state: "Tamil Nadu", city: "Tiruchirappalli", lat: 10.7905, lng: 78.7047 },
  { state: "Bihar", city: "Patna", lat: 25.5941, lng: 85.1376 },
  { state: "Bihar", city: "Gaya", lat: 24.7960, lng: 85.0039 },
  { state: "Bihar", city: "Bhagalpur", lat: 25.2445, lng: 86.9718 },
  { state: "Odisha", city: "Bhubaneswar", lat: 20.2961, lng: 85.8245 },
  { state: "Odisha", city: "Cuttack", lat: 20.4625, lng: 85.8820 },
  { state: "Odisha", city: "Rourkela", lat: 22.2604, lng: 84.8536 },
  { state: "Jharkhand", city: "Ranchi", lat: 23.3441, lng: 85.3096 },
  { state: "Jharkhand", city: "Jamshedpur", lat: 22.8046, lng: 86.2029 },
  { state: "Jharkhand", city: "Dhanbad", lat: 23.7957, lng: 86.4304 },
  { state: "Assam", city: "Guwahati", lat: 26.1445, lng: 91.7362 },
  { state: "Assam", city: "Silchar", lat: 24.8167, lng: 92.8000 },
  { state: "Punjab", city: "Chandigarh", lat: 30.7333, lng: 76.7794 },
  { state: "Punjab", city: "Ludhiana", lat: 30.9010, lng: 75.8573 },
  { state: "Punjab", city: "Amritsar", lat: 31.6340, lng: 74.8723 },
  { state: "Himachal Pradesh", city: "Shimla", lat: 31.1048, lng: 77.1734 },
  { state: "Himachal Pradesh", city: "Dharamshala", lat: 32.2200, lng: 76.3200 },
  { state: "Uttarakhand", city: "Dehradun", lat: 30.3165, lng: 78.0322 },
  { state: "Uttarakhand", city: "Haridwar", lat: 29.9457, lng: 78.1642 },
  { state: "Uttarakhand", city: "Rishikesh", lat: 30.0869, lng: 78.2676 },
  { state: "Goa", city: "Panaji", lat: 15.4909, lng: 73.8278 },
  { state: "Goa", city: "Margao", lat: 15.2730, lng: 73.9573 },
  { state: "Chhattisgarh", city: "Raipur", lat: 21.2514, lng: 81.6296 },
  { state: "Chhattisgarh", city: "Bhilai", lat: 21.2092, lng: 81.4285 },
  { state: "Manipur", city: "Imphal", lat: 24.8170, lng: 93.9368 },
  { state: "Meghalaya", city: "Shillong", lat: 25.5788, lng: 91.8933 },
  { state: "Mizoram", city: "Aizawl", lat: 23.7271, lng: 92.7176 },
  { state: "Nagaland", city: "Kohima", lat: 25.6751, lng: 94.1106 },
  { state: "Tripura", city: "Agartala", lat: 23.8315, lng: 91.2862 },
  { state: "Sikkim", city: "Gangtok", lat: 27.3314, lng: 88.6138 },
  { state: "Arunachal Pradesh", city: "Itanagar", lat: 28.2180, lng: 94.7278 },
  { state: "Jammu and Kashmir", city: "Srinagar", lat: 34.0837, lng: 74.7973 },
  { state: "Jammu and Kashmir", city: "Jammu", lat: 32.7266, lng: 74.8570 },
  { state: "Ladakh", city: "Leh", lat: 34.1526, lng: 77.5771 },
  { state: "Puducherry", city: "Puducherry", lat: 11.9416, lng: 79.8083 }
]

// Helper functions
export function getStates(): IndianState[] {
  return indianStates
}

export function getDistricts(): IndianDistrict[] {
  return indianDistricts
}

export function getDistrictsByState(stateName: string): IndianDistrict[] {
  return indianDistricts.filter(d => d.state === stateName)
}

export function getCitiesByState(stateName: string): string[] {
  const state = indianStates.find(s => s.name === stateName)
  return state ? state.cities : []
}

export function getCitiesByDistrict(stateName: string, districtName: string): string[] {
  const district = indianDistricts.find(d => d.state === stateName && d.district === districtName)
  return district ? district.cities : []
}

export function getLocationByCity(cityName: string): IndianLocation | null {
  return indianCities.find(location => 
    location.city.toLowerCase() === cityName.toLowerCase()
  ) || null
}

export function searchCities(query: string, limit: number = 10): IndianLocation[] {
  const lowercaseQuery = query.toLowerCase()
  return indianCities
    .filter(location => 
      location.city.toLowerCase().includes(lowercaseQuery) ||
      location.state.toLowerCase().includes(lowercaseQuery) ||
      (location.district && location.district.toLowerCase().includes(lowercaseQuery))
    )
    .slice(0, limit)
}

export function searchDistricts(query: string, limit: number = 10): IndianDistrict[] {
  const lowercaseQuery = query.toLowerCase()
  return indianDistricts
    .filter(district => 
      district.district.toLowerCase().includes(lowercaseQuery) ||
      district.state.toLowerCase().includes(lowercaseQuery)
    )
    .slice(0, limit)
}

export function getNearbyCities(lat: number, lng: number, radiusKm: number = 50): IndianLocation[] {
  return indianCities.filter(location => {
    const distance = calculateDistance(lat, lng, location.lat, location.lng)
    return distance <= radiusKm
  })
}

export function getComprehensiveLocationData(query: string, limit: number = 10) {
  const lowercaseQuery = query.toLowerCase()
  
  const cities = indianCities
    .filter(location => 
      location.city.toLowerCase().includes(lowercaseQuery) ||
      location.state.toLowerCase().includes(lowercaseQuery) ||
      (location.district && location.district.toLowerCase().includes(lowercaseQuery))
    )
    .slice(0, limit)
  
  const districts = indianDistricts
    .filter(district => 
      district.district.toLowerCase().includes(lowercaseQuery) ||
      district.state.toLowerCase().includes(lowercaseQuery)
    )
    .slice(0, limit)
  
  const states = indianStates
    .filter(state => 
      state.name.toLowerCase().includes(lowercaseQuery)
    )
    .slice(0, limit)
  
  return {
    cities,
    districts,
    states,
    total: cities.length + districts.length + states.length
  }
}

// Haversine formula to calculate distance between two points
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}
