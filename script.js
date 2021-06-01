const container = document.querySelector('.container');
// selecting seats through queryselectorall which is not occupied
const seats = document.querySelectorAll('.row .seat:not(occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = movieSelect.value;

populateUI();

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMovieprice', moviePrice);
}

// Movie select event from dropdown
movieSelect.addEventListener('change', function (e) {
  ticketPrice = parseInt(e.target.value);
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedSeatPrice();
});

// For updating count and total price of ticket
function updateSelectedSeatPrice() {
  const selectedSeat = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeat].map((seat) => {
    return [...seats].indexOf(seat);
  });

  // storing to local storage,
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const seatCount = selectedSeat.length;
  count.innerText = seatCount;
  total.innerText = seatCount * ticketPrice;
}

//get data from local storage and populate UI

function populateUI() {
  const selectedSeat = JSON.parse(localStorage.getItem('selectedSeats'));
  //below condition is checking if the array is not empty
  if (selectedSeat !== null && selectedSeat.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeat.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }

  const selectedMovieprice = localStorage.getItem('selectedMovieprice');
  if (selectedMovieprice !== null) {
    movieSelect.value = selectedMovieprice;
  }
}

// seat click event
container.addEventListener('click', function (e) {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
  }

  updateSelectedSeatPrice();
});

// initial count and total set

updateSelectedSeatPrice();
