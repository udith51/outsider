import axios from 'axios';
import confetti from 'canvas-confetti';

export const runFireworks = () => {
    var duration = 10 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

export const hotelAmenities = ["Parking", "Gym", "Lounge", "Swimming Pool", "Garden", "Centralized A.C.", "Bar", "Jacuzzi", "Wifi", "Room Service", "Laundry Service"]

export const cateringAmenities = ["Jain Food", "Appetizer Station", "Salad Bar", "Sushi Bar", "Pasta Station", "Seafood Bar", "Cheese and Charcuterie Station", "Beverage Bar", "Dessert Station"]

export const banquetAmenities = ["AV Equipment", "Parking", "Restrooms", "Stage", "Microphone", "Power Backup/Generator", "Garden", "Roof Top"]

export const getPin = async (val) => {
    try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${val}`);

        if (response.data && response.data[0].PostOffice) {
            return {
                city: response.data[0].PostOffice[0].District,
                state: response.data[0].PostOffice[0].State
            };
        } else {
            throw new Error("Not found");
        }
    } catch (error) {
        console.error(error);
        return {
            city: "",
            state: ""
        };
    }
};