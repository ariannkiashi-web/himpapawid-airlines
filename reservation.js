// ================= LOGIN =================

const loginPage = document.getElementById("loginPage");
const mainWebsite = document.getElementById("mainWebsite");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (username === "himpapawid" && password === "ticket123") {
    loginPage.classList.add("hidden");
    mainWebsite.classList.remove("hidden");
    showPage("home");
  } else {
    loginError.textContent = "Incorrect username or password.";
  }
});

document.getElementById("cancelLogin").addEventListener("click", function () {
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  loginError.textContent = "";
});

document.getElementById("logoutButton").addEventListener("click", function () {
  mainWebsite.classList.add("hidden");
  loginPage.classList.remove("hidden");
  loginForm.reset();
  loginError.textContent = "";
  showPage("home");
});


// ================= PAGE NAVIGATION =================

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active-page");
  });

  const selectedPage = document.getElementById(pageId);
  if (selectedPage) selectedPage.classList.add("active-page");

  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.dataset.page === pageId);
  });

  document.getElementById("navigation").classList.remove("show-menu");

  if (pageId === "account") {
    displayProfile();
    displayReservationHistory();
  }
}

document.querySelectorAll("[data-page]").forEach(link => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    showPage(this.dataset.page);
  });
});

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", function () {
    showPage(this.dataset.go);
  });
});

document.getElementById("menuToggle").addEventListener("click", function () {
  document.getElementById("navigation").classList.toggle("show-menu");
});


// ================= AIRPORT DIRECTORY =================

const airportDirectory = {
  "Philippines": [
    ["Manila - Ninoy Aquino International Airport", "MNL"],
    ["Clark International Airport", "CRK"],
    ["Laoag International Airport", "LAO"],
    ["Tuguegarao Airport", "TUG"],
    ["Cauayan Airport", "CYZ"],
    ["Basco Airport", "BSO"],
    ["Mactan-Cebu International Airport", "CEB"],
    ["Bacolod-Silay Airport", "BCD"],
    ["Iloilo International Airport", "ILO"],
    ["Kalibo International Airport", "KLO"],
    ["Caticlan Airport", "MPH"],
    ["Roxas Airport", "RXS"],
    ["Naga Airport", "WNP"],
    ["Legazpi Airport", "LGP"],
    ["Masbate Airport", "MBT"],
    ["Virac Airport", "VRC"],
    ["Marinduque Airport", "MRQ"],
    ["Dumaguete Airport", "DGT"],
    ["Bohol-Panglao International Airport", "TAG"],
    ["Tacloban Airport", "TAC"],
    ["Calbayog Airport", "CYP"],
    ["Catarman National Airport", "CRM"],
    ["Davao International Airport", "DVO"],
    ["General Santos International Airport", "GES"],
    ["Zamboanga International Airport", "ZAM"],
    ["Laguindingan Airport", "CGY"],
    ["Bancasi Airport", "BXU"],
    ["Surigao Airport", "SUG"],
    ["Siargao Airport", "IAO"],
    ["Camiguin Airport", "CGM"],
    ["Dipolog Airport", "DPL"],
    ["Pagadian Airport", "PAG"],
    ["Ozamiz Airport", "OZC"],
    ["Cotabato Airport", "CBO"],
    ["Tawi-Tawi Airport", "TWT"],
    ["Puerto Princesa International Airport", "PPS"],
    ["Francisco B. Reyes Airport - Coron", "USU"],
    ["El Nido Airport", "ENI"],
    ["San Vicente Airport", "SWL"]
  ],
  "Singapore": [
    ["Singapore Changi Airport", "SIN"]
  ],
  "Malaysia": [
    ["Kuala Lumpur International Airport", "KUL"],
    ["Kota Kinabalu International Airport", "BKI"]
  ],
  "Brunei": [
    ["Brunei International Airport", "BWN"]
  ],
  "Thailand": [
    ["Suvarnabhumi Airport - Bangkok", "BKK"]
  ],
  "Vietnam": [
    ["Tan Son Nhat International Airport - Ho Chi Minh City", "SGN"],
    ["Noi Bai International Airport - Hanoi", "HAN"]
  ],
  "Indonesia": [
    ["Soekarno-Hatta International Airport - Jakarta", "CGK"],
    ["Ngurah Rai International Airport - Bali", "DPS"]
  ],
  "Hong Kong": [
    ["Hong Kong International Airport", "HKG"]
  ],
  "Macau": [
    ["Macau International Airport", "MFM"]
  ],
  "Taiwan": [
    ["Taiwan Taoyuan International Airport", "TPE"]
  ]
};

const countrySelects = [
  {
    country: document.getElementById("originCountry"),
    airport: document.getElementById("origin")
  },
  {
    country: document.getElementById("destinationCountry"),
    airport: document.getElementById("destination")
  }
];

function populateCountries() {
  const countries = Object.keys(airportDirectory);

  countrySelects.forEach(pair => {
    countries.forEach(country => {
      const option = document.createElement("option");
      option.value = country;
      option.textContent = country;
      pair.country.appendChild(option);
    });
  });
}

function populateAirports(countrySelect, airportSelect) {
  const selectedCountry = countrySelect.value;

  airportSelect.innerHTML = "";

  if (!selectedCountry) {
    airportSelect.disabled = true;
    airportSelect.innerHTML = '<option value="">Select country first</option>';
    return;
  }

  airportSelect.disabled = false;
  airportSelect.innerHTML = '<option value="">Select airport</option>';

  airportDirectory[selectedCountry].forEach(airport => {
    const option = document.createElement("option");
    option.value = airport[1];
    option.textContent = airport[0] + " (" + airport[1] + ")";
    airportSelect.appendChild(option);
  });
}

countrySelects.forEach(pair => {
  pair.country.addEventListener("change", function () {
    populateAirports(pair.country, pair.airport);
  });
});

populateCountries();


// ================= DESTINATION SHORTCUTS =================

document.querySelectorAll("[data-book-destination]").forEach(button => {
  button.addEventListener("click", function () {
    showPage("book");

    const destinationCode = this.dataset.bookDestination;
    const country = Object.keys(airportDirectory).find(name =>
      airportDirectory[name].some(airport => airport[1] === destinationCode)
    );

    if (country) {
      document.getElementById("destinationCountry").value = country;
      populateAirports(
        document.getElementById("destinationCountry"),
        document.getElementById("destination")
      );
      document.getElementById("destination").value = destinationCode;
    }
  });
});


// ================= TRIP TYPE AND DATES =================

const departureDate = document.getElementById("departureDate");
const returnDate = document.getElementById("returnDate");
const returnDateGroup = document.getElementById("returnDateGroup");

const today = new Date();
const todayString = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0")
].join("-");

departureDate.min = todayString;
returnDate.min = todayString;

departureDate.addEventListener("change", function () {
  returnDate.min = departureDate.value;

  if (returnDate.value && returnDate.value < departureDate.value) {
    returnDate.value = "";
  }
});

document.querySelectorAll('input[name="tripType"]').forEach(radio => {
  radio.addEventListener("change", function () {
    const isRoundTrip = this.value === "roundtrip";
    returnDateGroup.hidden = !isRoundTrip;
    returnDate.required = isRoundTrip;

    if (!isRoundTrip) returnDate.value = "";
  });
});


// ================= PASSENGER COUNTERS =================

const passengerCounts = {
  adults: 1,
  children: 0,
  infants: 0
};

function updatePassengerDisplay() {
  document.getElementById("adultsCount").textContent = passengerCounts.adults;
  document.getElementById("childrenCount").textContent = passengerCounts.children;
  document.getElementById("infantsCount").textContent = passengerCounts.infants;
}

document.querySelectorAll("[data-counter]").forEach(button => {
  button.addEventListener("click", function () {
    const type = this.dataset.counter;
    const change = Number(this.dataset.change);
    const nextValue = passengerCounts[type] + change;

    if (type === "adults" && nextValue < 1) return;
    if (nextValue < 0) return;

    const totalPassengers =
      passengerCounts.adults +
      passengerCounts.children +
      passengerCounts.infants;

    if (change > 0 && totalPassengers >= 9) {
      document.getElementById("bookingMessage").textContent =
        "A maximum of 9 passengers is allowed.";
      return;
    }

    if (type === "infants" && nextValue > passengerCounts.adults) {
      document.getElementById("bookingMessage").textContent =
        "The number of infants cannot exceed the number of adults.";
      return;
    }

    passengerCounts[type] = nextValue;
    document.getElementById("bookingMessage").textContent = "";
    updatePassengerDisplay();
  });
});


// ================= FLIGHT SEARCH =================

const sampleFlights = [
  {
    code: "HP101",
    name: "Himpapawid Sunrise",
    departure: "07:00 AM",
    arrival: "09:00 AM",
    fare: 2500
  },
  {
    code: "HP205",
    name: "Himpapawid Express",
    departure: "11:30 AM",
    arrival: "01:30 PM",
    fare: 3200
  },
  {
    code: "HP309",
    name: "Himpapawid Evening",
    departure: "05:00 PM",
    arrival: "07:00 PM",
    fare: 2800
  }
];

let selectedFlight = null;
let selectedSeat = "";
let currentBooking = null;

const flightSearchForm = document.getElementById("flightSearchForm");
const flightResults = document.getElementById("flightResults");
const flightList = document.getElementById("flightList");
const passengerDetails = document.getElementById("passengerDetails");

flightSearchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const origin = document.getElementById("origin").value;
  const destination = document.getElementById("destination").value;
  const originCountry = document.getElementById("originCountry").value;
  const destinationCountry = document.getElementById("destinationCountry").value;
  const tripType = document.querySelector('input[name="tripType"]:checked').value;

  if (!originCountry || !destinationCountry || !origin || !destination) {
    document.getElementById("bookingMessage").textContent =
      "Please select both countries and airports.";
    return;
  }

  if (origin === destination) {
    document.getElementById("bookingMessage").textContent =
      "Departure and arrival airports must be different.";
    return;
  }

  if (!departureDate.value || departureDate.value < todayString) {
    document.getElementById("bookingMessage").textContent =
      "Please select a valid departure date.";
    return;
  }

  if (tripType === "roundtrip") {
    if (!returnDate.value || returnDate.value < departureDate.value) {
      document.getElementById("bookingMessage").textContent =
        "Please select a return date on or after your departure date.";
      return;
    }
  }

  document.getElementById("bookingMessage").textContent = "";
  selectedFlight = null;
  selectedSeat = "";

  passengerDetails.classList.add("hidden");
  document.getElementById("bookingConfirmation").classList.add("hidden");
  flightResults.classList.remove("hidden");

  flightList.innerHTML = "";

  sampleFlights.forEach(flight => {
    const card = document.createElement("article");
    card.className = "flight-card";

    const details = document.createElement("div");
    details.innerHTML = `
      <h3>${escapeHTML(flight.name)} (${escapeHTML(flight.code)})</h3>
      <p>${escapeHTML(origin)} → ${escapeHTML(destination)}</p>
      <p>${escapeHTML(flight.departure)} - ${escapeHTML(flight.arrival)}</p>
    `;

    const action = document.createElement("div");
    action.innerHTML = `
      <div class="flight-price">${formatMoney(flight.fare)}</div>
      <button type="button" class="primary-button">Select Flight</button>
    `;

    action.querySelector("button").addEventListener("click", function () {
      selectFlight(flight);
    });

    card.append(details, action);
    flightList.appendChild(card);
  });

  flightResults.scrollIntoView({ behavior: "smooth" });
});

function selectFlight(flight) {
  selectedFlight = flight;
  selectedSeat = "";

  passengerDetails.classList.remove("hidden");
  document.getElementById("passengerMessage").textContent = "";
  document.getElementById("seatMessage").textContent = "";

  createSeatMap();
  updatePriceSummary();

  passengerDetails.scrollIntoView({ behavior: "smooth" });
}


// ================= SEAT SELECTION =================

function createSeatMap() {
  const seatMap = document.getElementById("seatMap");
  seatMap.innerHTML = "";

  const takenSeats = ["A2", "B3", "C1", "D4"];

  ["A", "B", "C", "D"].forEach(row => {
    for (let number = 1; number <= 4; number++) {
      const seatCode = row + number;
      const seat = document.createElement("button");

      seat.type = "button";
      seat.className = "seat";
      seat.textContent = seatCode;

      if (takenSeats.includes(seatCode)) {
        seat.classList.add("taken");
        seat.disabled = true;
      }

      seat.addEventListener("click", function () {
        selectedSeat = seatCode;

        document.querySelectorAll(".seat").forEach(item => {
          item.classList.remove("selected");
        });

        seat.classList.add("selected");
        document.getElementById("seatMessage").textContent =
          "Selected seat: " + selectedSeat;
      });

      seatMap.appendChild(seat);
    }
  });
}


// ================= PRICE SUMMARY =================

function formatMoney(amount) {
  return "₱" + Number(amount).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function updatePriceSummary() {
  if (!selectedFlight) return;

  const adults = passengerCounts.adults;
  const children = passengerCounts.children;
  const infants = passengerCounts.infants;

  const tripType = document.querySelector('input[name="tripType"]:checked').value;
  const tripMultiplier = tripType === "roundtrip" ? 2 : 1;

  const adultFare = selectedFlight.fare * adults;
  const childFare = selectedFlight.fare * children;
  const infantFare = 0;

  const baseFare = (adultFare + childFare + infantFare) * tripMultiplier;
  const serviceFee = (adults + children + infants) * 250;
  const total = baseFare + serviceFee;

  document.getElementById("priceSummary").innerHTML = `
    <h3>Price Summary</h3>
    <p>Adult fare: ${formatMoney(adultFare * tripMultiplier)}</p>
    <p>Children fare: ${formatMoney(childFare * tripMultiplier)}</p>
    <p>Infant fare: ${formatMoney(infantFare)}</p>
    <p>Service fee: ${formatMoney(serviceFee)}</p>
    <p class="price-total">Total: ${formatMoney(total)}</p>
  `;

  return {
    adultFare: adultFare * tripMultiplier,
    childFare: childFare * tripMultiplier,
    infantFare,
    serviceFee,
    total
  };
}


// ================= BOOKING CONFIRMATION =================

document.getElementById("confirmBookingButton").addEventListener("click", function () {
  const passengerName = document.getElementById("passengerName").value.trim();
  const passengerEmail = document.getElementById("passengerEmail").value.trim();
  const passengerPhone = document.getElementById("passengerPhone").value.trim();

  const message = document.getElementById("passengerMessage");

  if (!selectedFlight) {
    message.textContent = "Please select a flight first.";
    return;
  }

  if (!passengerName || !passengerEmail || !passengerPhone) {
    message.textContent = "Please complete all passenger information.";
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passengerEmail)) {
    message.textContent = "Please enter a valid email address.";
    return;
  }

  if (!selectedSeat) {
    message.textContent = "Please select a seat.";
    return;
  }

  const prices = updatePriceSummary();
  const reference = "HP" + Date.now().toString().slice(-7);

  const tripType = document.querySelector('input[name="tripType"]:checked').value;

  currentBooking = {
    reference,
    passengerName,
    passengerEmail,
    passengerPhone,
    origin: document.getElementById("origin").value,
    destination: document.getElementById("destination").value,
    originCountry: document.getElementById("originCountry").value,
    destinationCountry: document.getElementById("destinationCountry").value,
    departureDate: departureDate.value,
    returnDate: tripType === "roundtrip" ? returnDate.value : "",
    tripType,
    adults: passengerCounts.adults,
    children: passengerCounts.children,
    infants: passengerCounts.infants,
    flightCode: selectedFlight.code,
    flightName: selectedFlight.name,
    departureTime: selectedFlight.departure,
    arrivalTime: selectedFlight.arrival,
    seat: selectedSeat,
    total: prices.total,
    createdAt: new Date().toLocaleString()
  };

  const reservations = getReservations();
  reservations.push(currentBooking);
  localStorage.setItem("himpapawidReservations", JSON.stringify(reservations));

  document.getElementById("confirmationDetails").innerHTML = `
    <p><strong>Booking Reference:</strong> ${escapeHTML(reference)}</p>
    <p><strong>Passenger:</strong> ${escapeHTML(passengerName)}</p>
    <p><strong>Flight:</strong> ${escapeHTML(selectedFlight.code)} - ${escapeHTML(selectedFlight.name)}</p>
    <p><strong>Route:</strong> ${escapeHTML(currentBooking.origin)} → ${escapeHTML(currentBooking.destination)}</p>
    <p><strong>Departure:</strong> ${escapeHTML(currentBooking.departureDate)}</p>
    ${currentBooking.returnDate ? `<p><strong>Return:</strong> ${escapeHTML(currentBooking.returnDate)}</p>` : ""}
    <p><strong>Seat:</strong> ${escapeHTML(selectedSeat)}</p>
    <p><strong>Passengers:</strong> ${currentBooking.adults + currentBooking.children + currentBooking.infants}</p>
    <p><strong>Total Amount:</strong> ${formatMoney(prices.total)}</p>
  `;

  flightResults.classList.add("hidden");
  passengerDetails.classList.add("hidden");
  document.getElementById("bookingConfirmation").classList.remove("hidden");

  document.getElementById("bookingConfirmation").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("newBookingButton").addEventListener("click", function () {
  resetBookingForm();
});

function resetBookingForm() {
  flightSearchForm.reset();

  passengerCounts.adults = 1;
  passengerCounts.children = 0;
  passengerCounts.infants = 0;
  updatePassengerDisplay();

  returnDateGroup.hidden = true;
  returnDate.required = false;

  countrySelects.forEach(pair => {
    pair.country.value = "";
    populateAirports(pair.country, pair.airport);
  });

  document.getElementById("passengerName").value = "";
  document.getElementById("passengerEmail").value = "";
  document.getElementById("passengerPhone").value = "";

  selectedFlight = null;
  selectedSeat = "";
  currentBooking = null;

  document.getElementById("bookingMessage").textContent = "";
  document.getElementById("passengerMessage").textContent = "";
  document.getElementById("seatMessage").textContent = "";

  flightResults.classList.add("hidden");
  passengerDetails.classList.add("hidden");
  document.getElementById("bookingConfirmation").classList.add("hidden");

  departureDate.min = todayString;
  returnDate.min = todayString;

  showPage("book");
}


// ================= MANAGE BOOKING =================

function getReservations() {
  try {
    return JSON.parse(localStorage.getItem("himpapawidReservations")) || [];
  } catch (error) {
    return [];
  }
}

document.getElementById("manageBookingButton").addEventListener("click", function () {
  const reference = document.getElementById("bookingReference").value.trim().toUpperCase();
  const message = document.getElementById("manageMessage");
  const result = document.getElementById("managedBooking");

  result.innerHTML = "";

  if (!reference) {
    message.textContent = "Please enter your booking reference.";
    return;
  }

  const booking = getReservations().find(item =>
    item.reference.toUpperCase() === reference
  );

  if (!booking) {
    message.textContent = "No booking found. Please check your reference.";
    return;
  }

  message.textContent = "Reservation found!";

  result.innerHTML = `
    <h3>Reservation Details</h3>
    <p><strong>Reference:</strong> ${escapeHTML(booking.reference)}</p>
    <p><strong>Passenger:</strong> ${escapeHTML(booking.passengerName)}</p>
    <p><strong>Email:</strong> ${escapeHTML(booking.passengerEmail)}</p>
    <p><strong>Contact:</strong> ${escapeHTML(booking.passengerPhone)}</p>
    <p><strong>Flight:</strong> ${escapeHTML(booking.flightCode)} - ${escapeHTML(booking.flightName)}</p>
    <p><strong>Route:</strong> ${escapeHTML(booking.origin)} → ${escapeHTML(booking.destination)}</p>
    <p><strong>Departure:</strong> ${escapeHTML(booking.departureDate)}</p>
    ${booking.returnDate ? `<p><strong>Return:</strong> ${escapeHTML(booking.returnDate)}</p>` : ""}
    <p><strong>Seat:</strong> ${escapeHTML(booking.seat)}</p>
    <p><strong>Total:</strong> ${formatMoney(booking.total)}</p>
    <p><strong>Booked on:</strong> ${escapeHTML(booking.createdAt)}</p>
  `;
});


// ================= PROFILE MODAL =================

const profileModal = document.getElementById("profileModal");
const profileForm = document.getElementById("profileForm");

document.getElementById("openProfileModal").addEventListener("click", function () {
  loadProfileIntoForm();
  profileModal.classList.remove("hidden");
});

document.getElementById("closeProfileModal").addEventListener("click", function () {
  profileModal.classList.add("hidden");
});

profileModal.addEventListener("click", function (event) {
  if (event.target === profileModal) {
    profileModal.classList.add("hidden");
  }
});

function getProfile() {
  try {
    return JSON.parse(localStorage.getItem("himpapawidProfile")) || {};
  } catch (error) {
    return {};
  }
}

function loadProfileIntoForm() {
  const profile = getProfile();

  document.getElementById("profileName").value = profile.name || "";
  document.getElementById("profileBirthday").value = profile.birthday || "";
  document.getElementById("profileEmail").value = profile.email || "";
  document.getElementById("profilePhone").value = profile.phone || "";
  document.getElementById("profileAddress").value = profile.address || "";
  document.getElementById("profileMessage").textContent = "";
}

profileForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const profile = {
    name: document.getElementById("profileName").value.trim(),
    birthday: document.getElementById("profileBirthday").value,
    email: document.getElementById("profileEmail").value.trim(),
    phone: document.getElementById("profilePhone").value.trim(),
    address: document.getElementById("profileAddress").value.trim()
  };

  if (!profile.name) {
    document.getElementById("profileMessage").textContent =
      "Please enter your full name.";
    return;
  }

  localStorage.setItem("himpapawidProfile", JSON.stringify(profile));

  document.getElementById("profileMessage").textContent =
    "Profile saved successfully!";

  displayProfile();
  setTimeout(() => profileModal.classList.add("hidden"), 700);
});

function displayProfile() {
  const profile = getProfile();
  const display = document.getElementById("profileDisplay");

  document.getElementById("accountDisplayName").textContent =
    profile.name || "Himpapawid Passenger";

  if (!profile.name && !profile.email && !profile.phone && !profile.address) {
    display.innerHTML = "<p>No profile information added yet.</p>";
    return;
  }

  display.innerHTML = `
    <p><strong>Full Name:</strong> ${escapeHTML(profile.name || "Not provided")}</p>
    <p><strong>Date of Birth:</strong> ${escapeHTML(profile.birthday || "Not provided")}</p>
    <p><strong>Email:</strong> ${escapeHTML(profile.email || "Not provided")}</p>
    <p><strong>Contact Number:</strong> ${escapeHTML(profile.phone || "Not provided")}</p>
    <p><strong>Address:</strong> ${escapeHTML(profile.address || "Not provided")}</p>
  `;
}


// ================= RESERVATION HISTORY =================

function displayReservationHistory() {
  const history = document.getElementById("reservationHistory");
  const reservations = getReservations();

  if (reservations.length === 0) {
    history.innerHTML = '<p class="muted">No reservations yet.</p>';
    return;
  }

  history.innerHTML = "";

  reservations.slice().reverse().forEach(booking => {
    const item = document.createElement("div");
    item.className = "history-item";

    item.innerHTML = `
      <p><strong>${escapeHTML(booking.reference)}</strong></p>
      <p>${escapeHTML(booking.origin)} → ${escapeHTML(booking.destination)}</p>
      <p>${escapeHTML(booking.departureDate)} | ${escapeHTML(booking.flightCode)}</p>
      <p>Total: ${formatMoney(booking.total)}</p>
    `;

    history.appendChild(item);
  });
}


// ================= TEXT SAFETY =================

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, function (character) {
    const replacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };

    return replacements[character];
  });
}


// ================= INITIAL DISPLAY =================

updatePassengerDisplay();
displayProfile();
displayReservationHistory();