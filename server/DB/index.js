import mongoose from 'mongoose';
export const connectDB = async () => {
    const mongodbURI = process.env.MONGODBURI
    try {
        await mongoose.connect(mongodbURI)
        console.log('MongoDB connected successfully');

    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the process with failure

    }

}