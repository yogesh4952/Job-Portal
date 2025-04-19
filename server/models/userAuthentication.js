import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String, default: "" },
    authProvider: [{ type: String, enum: ['google', 'local'] }], // Array for multiple providers
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (this.isModified('password') && this.authProvider.includes('local')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

export default mongoose.model('User', userSchema);