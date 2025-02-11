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

function loadCarAvailability() {
    const rentedCars = JSON.parse(localStorage.getItem("rentedCars")) || [];

    cars.forEach(car => {
        if (rentedCars.includes(car.id)) {
            car.available = false;
        }
    });
}

function saveRentedCar(carId) {
    let rentedCars = JSON.parse(localStorage.getItem("rentedCars")) || [];
    if (!rentedCars.includes(carId)) {
        rentedCars.push(carId);
    }
    localStorage.setItem("rentedCars", JSON.stringify(rentedCars));
}

loadCarAvailability();

const modal = document.getElementById("receiptModal");
const closeButton = document.querySelector(".close-button");

document.getElementById("rentCar").addEventListener("click", () => {
    const carSelect = document.getElementById("car");
    const selectedCarId = parseInt(carSelect.value);
    const rentalMessage = document.getElementById("rentalMessage");

    const selectedDate = document.getElementById("date").value;
    const selectedTime = document.getElementById("time").value;
    const selectedYear = document.getElementById("year").value;

    if (!selectedCarId) {
        rentalMessage.textContent = "Please select a car to rent.";
        rentalMessage.style.color = "red";
        return;
    }

    if (!selectedDate || !selectedTime || !selectedYear) {
        rentalMessage.textContent = "Please fill in all rental details.";
        rentalMessage.style.color = "red";
        return;
    }

    const selectedCar = cars.find(car => car.id === selectedCarId);


    if (!selectedCar.available) {
        rentalMessage.textContent = "Sorry, this car is already rented.";
        rentalMessage.style.color = "red";
        return;
    }

    const rentalPrice = selectedCar.price;

    rentalMessage.textContent = `You have rented a ${selectedCar.name} on ${selectedDate} at ${selectedTime}. Your rental fee is $${rentalPrice}.`;
    rentalMessage.style.color = "white";

    const receiptDetails = document.getElementById("receiptDetails");
    receiptDetails.textContent = `Car: ${selectedCar.name}\nDate: ${selectedDate}\nTime: ${selectedTime}\nYear: ${selectedYear}\nPrice: $${rentalPrice}`;

    modal.style.display = "block";

});

closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});


