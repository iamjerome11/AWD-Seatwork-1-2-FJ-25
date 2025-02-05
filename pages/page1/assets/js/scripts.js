const cars = [
    { id: 1, name: "Ferrari 488", available: true, price: 190 },
    { id: 2, name: "Lamborghini Aventador", available: true, price: 200 },
    { id: 3, name: "Dodge Hellcat", available: true, price: 170 },
    { id: 4, name: "McLaren 720S", available: true, price: 180 },
    { id: 5, name: "Bugatti Chiron", available: true, price: 220 },
    { id: 6, name: "Toyota Supra", available: true, price: 130 },
    { id: 7, name: "Mitsubishi Eclipse", available: true, price: 120 },
    { id: 8, name: "Mercedes Benz", available: true, price: 250 },
    { id: 9, name: "Audi RS7", available: true, price: 150 },
    { id: 10, name: "Nissan GT-R", available: true, price: 180 },
    { id: 11, name: "Black Car", available: true, price: 160 },
    { id: 12, name: "Dodge Charger", available: true, price: 180 },
];

const modal = document.getElementById("receiptModal");
const closeButton = document.querySelector(".close-button");

document.getElementById("rentCar").addEventListener("click", () => {
    const carSelect = document.getElementById("car");
    const selectedCarId = parseInt(carSelect.value);
    const rentalMessage = document.getElementById("rentalMessage");

    // Get date, time, and year inputs
    const selectedDate = document.getElementById("date").value;
    const selectedTime = document.getElementById("time").value;
    const selectedYear = document.getElementById("year").value;

    if (!selectedCarId) {
        rentalMessage.textContent = "Please select a car to rent.";
        rentalMessage.style.color = "red";
        return;
    }

    if (!selectedDate || !selectedTime || !selectedYear) {
        rentalMessage.textContent = "Please fill out all fields for date, time, and year.";
        rentalMessage.style.color = "red";
        return;
    }

    const car = cars.find(c => c.id === selectedCarId);

    if (car.available) {
        car.available = false;
        rentalMessage.textContent = `You have successfully rented the ${car.name} on ${selectedDate} at ${selectedTime} for the year ${selectedYear}. Enjoy your ride!`;
        rentalMessage.style.color = "white";

        // Update the status in the HTML
        const carElements = document.querySelectorAll('#cars .grid div');
        carElements.forEach(element => {
            if (element.querySelector('h3').textContent === car.name) {
                element.querySelector('p span').classList.remove('available');
                element.querySelector('p span').classList.add('unavailable');
                element.querySelector('p span').textContent = "Unavailable";
            }
        });

        carSelect.options[carSelect.selectedIndex].textContent += " (Rented)";
        carSelect.options[carSelect.selectedIndex].disabled = true; 


        const totalCost = car.price; 
        const receiptDetails = document.getElementById("receiptDetails");
        receiptDetails.innerHTML = `
            Car: ${car.name}<br>
            Date: ${selectedDate}<br>
            Time: ${selectedTime}<br>
            Year: ${selectedYear}<br>
            Total Cost: $${totalCost}<br>
        `;
        modal.style.display = "block"; 
    } else {
        rentalMessage.textContent = `Sorry, the ${car.name} is currently unavailable.`;
        rentalMessage.style.color = "red";
    }
});

// Close the modal when the close button is clicked
closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close the modal when clicking outside of it
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});