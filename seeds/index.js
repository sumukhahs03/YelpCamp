const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected")
})

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //Your User ID
            author: '60fb1b3c9fd21737608264bf',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dp7aw9slh/image/upload/v1627242180/YelpCamp/f4wae0vyuzxwtdvtfgz7.jpg',
                    filename: 'YelpCamp/f4wae0vyuzxwtdvtfgz7'
                },
                {
                    url: 'https://res.cloudinary.com/dp7aw9slh/image/upload/v1627242182/YelpCamp/lmeirgt8yw7ahvu2oirq.jpg',
                    filename: 'YelpCamp/lmeirgt8yw7ahvu2oirq'
                },
                {
                    url: 'https://res.cloudinary.com/dp7aw9slh/image/upload/v1627242184/YelpCamp/zmwqtxmlrtbgt8yua1cg.jpg',
                    filename: 'YelpCamp/zmwqtxmlrtbgt8yua1cg'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quis adipisci nulla labore obcaecati ex consequatur at tempora similique pariatur tempore saepe impedit cumque, earum facilis consequuntur, nemo facere amet.',
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
        });
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
})