const cars = [
    { id: 1, name: "Ferrari 488", available: true },
    { id: 2, name: "Lamborghini Aventador", available: true },
    { id: 3, name: "Dodge Hellcat", available: true },
    { id: 4, name: "McLaren 720S", available: true },
    { id: 5, name: "Bugatti Chiron", available: true },
    { id: 6, name: "Toyota Supra", available: true },
    { id: 7, name: "Mitsubishi Eclipse-Gsx", available: true },
    { id: 8, name: "Mercedes Benz", available: true },
    { id: 9, name: "Audi RS7", available: true },
    { id: 10, name: "Nissan GT-R", available: true },
    { id: 11, name: "Black Car", available: true },
    { id: 12, name: "Dodge Charger", available: true },
];

document.getElementById("rentCar").addEventListener("click", () => {
    const carSelect = document.getElementById("car");
    const selectedCarId = parseInt(carSelect.value);
    const rentalMessage = document.getElementById("rentalMessage");

    if (!selectedCarId) {
        rentalMessage.textContent = "Please select a car to rent.";
        rentalMessage.style.color = "white";
        return;
    }

    const car = cars.find(c => c.id === selectedCarId);

    if (car.available) {
        car.available = false;
        rentalMessage.textContent = `You have successfully rented the ${car.name}. Enjoy your ride!`;
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
    } else {
        rentalMessage.textContent = `Sorry, the ${car.name} is currently unavailable.`;
        rentalMessage.style.color = "red"; 
    }
});