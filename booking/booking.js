const availableSeat = document.querySelector('.available');
const btn = document.querySelector('.btn');
const allSeats = document.getElementsByClassName('seat');
// const seat2 = document.querySelector('.seat');
// const seat3 = document.querySelector('.seat');
// const seat4 = document.querySelector('.seat');
// const seat5 = document.querySelector('.seat');
// const seat6 = document.querySelector('.seat');
// const seat7 = document.querySelector('.seat');
// const seat8 = document.querySelector('.seat');
// const seat9 = document.querySelector('.seat');
// const seat10 = document.querySelector('.seat');
const msg = document.querySelector('.message');

let isSelected;
let isBooked = true;
let seats = Array.from(allSeats);

const selectedSeat = seats.forEach(seat => seat.addEventListener('click', () => {
    if (seat.classList.contains('selected')) {
        seat.classList.toggle('selected');
        isSelected = false;
    } else {
        seat.classList.toggle('selected');
        isSelected = true;
    }
}));


btn.addEventListener('click', () => {
    seats.forEach(seat => {
        if (seat.classList.contains('selected')) {
            console.log(seat.innerText);
            msg.innerText = `Thank you, seat ${seat.innerText} successfully booked !`;
            msg.classList.remove('hide');
            msg.classList.add('success');
            seat.classList.add('taken');
            setTimeout(() => {
                seat.classList.remove('seat');
                msg.classList.add('hide');
            }, 3000);
        } else {
            !seat.classList.contains('selected');
        }
    });
    if (isSelected) {

    } else {
        isSelected = false;
        msg.innerText = 'Please Select at leat one seat!';
        msg.classList.remove('hide');
        msg.classList.add('danger');
        setTimeout(() => {
            msg.classList.add('hide');
        }, 3000);
    }
});