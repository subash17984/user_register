module.exports = mongoose => {
    const User = mongoose.model(
        "user",
        mongoose.Schema({
            firstName: {
                type: String,
                required: true,
                trim: true,
            },
            lastName: {
                type: String,
                required: true,
                trim: true,
            },
            emailId: {
                type: String,
                required: true,
                unique: true,
                trim: true,
                lowercase: true,
            },
            mobileNo: {
                type: String,
                required: true,
                unique: true,
                trim: true,
            },
            role: {
                type: String,
                required: true,
                enum: ['Admin', 'User', 'Guest'], // Example roles
                default: 'User',
            },
            password: {
                type: String,
                required: true,
            }
        },
            { timestamps: true }
        )
    );

    return User;
};