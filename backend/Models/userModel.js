const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: String, // String type
    userName: {
        type: String,
        default: ""
    },
    emailId: {
        type: String,
        unique: true,
        required: [true, "Email ID should not be blank"]
    },
    password: {
        type: String,
    },
    gender: {
        type: String,
        enum: {
            values: ["Male", "Female", "Others"]
        }
    },
    status: {
        type: String,
    },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "role" },
    emailVerification: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    age: Number, // Number type
    isActive: Boolean, // Boolean type
    tags: [String], // Array of strings
    scores: [Number], // Array of numbers
    metadata: { // Object type
        createdAt: Date,
        updatedBy: String,
    },
    address: { // Object of object
        home: {
            street: String,
            city: String,
            zip: Number,
        },
        office: {
            street: String,
            city: String,
            zip: Number,
        }
    },
    friends: [ // Array of objects
        {
            name: String,
            age: Number,
            group: String,
        }
    ],
    settings: { // Object containing different types
        theme: String,
        notifications: {
            email: Boolean,
            sms: Boolean,
        },
        preferences: [String], // Array inside an object
    },
    coordinates: { // Object with array values
        lat: Number,
        long: Number,
        history: [ // Array of objects
            {
                lat: Number,
                long: Number,
                timestamp: Date,
            }
        ]
    },
    token: {
        type: String,
        default: ''
    },
    random: mongoose.Schema.Types.Mixed, // Can store any data type
}, { timestamps: true });

const User = mongoose.model('user', userSchema);

module.exports = User;
