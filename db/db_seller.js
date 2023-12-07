const mongoose = require("./db_main.js");

const sellerLoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  Photo: {
    data: Buffer,
    contentType: String,
  },
  password: {
    type: String,
    required: true,
  },
  token: String,
  ExpiryToken: Date,
});

const sellerLoginData = new mongoose.model(
  "sellerLoginData",
  sellerLoginSchema
);

const barberShopSchema = new mongoose.Schema({
  email: { type: "string", reqired: true, unique: true },
  name: {
    type: String,
    required: true,
  },
  description: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  contact: {
    email: String,
    phone: String,
  },
  services: [String], // An array of services provided by the barber shop
  openingHours: [
    {
      day: String,
      startTime: String,
      endTime: String,
    },
  ],
  // GeoJSON coordinates for the barber shop's location (for geospatial search)
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number], // [longitude, latitude]
  },
  photos:[
    {
        data:Buffer, 
        contentType:String
    }
  ],
  numSeats:{type:Number,reqired:true}
});

// Index the 'location' field for geospatial indexing (2dsphere for Earth-like coordinates)
//barberShopSchema.index({ location: "2dsphere" });

// Create a BarberShop model based on the schema
const barberShop = mongoose.model("BarberShop", barberShopSchema);

const seatSchema = new mongoose.Schema({
  seatNumber: { type: Number, required: true },
  email:{ type: String, required: true},
  bookings: {
    type: [Boolean],
    validate: {
      validator: function (array) {
        return array.length === 11; // Assuming 10 slots
      },
      message: 'Bookings array must have exactly 10 elements.',
    },
    default: new Array(11).fill(true), // Initialize all slots as true (available)
  },
});

const seat = mongoose.model('Seat', seatSchema);

module.exports = { sellerLoginData,barberShop,seat};
