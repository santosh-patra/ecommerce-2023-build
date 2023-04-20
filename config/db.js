import mongoose from 'mongoose';
import colors from 'colors'
const connectDB = async()=>{
    try {
        let connect = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Mongo DB connected to ${connect.connection.host}`.bgMagenta.white);
        
    } catch (error) {
        console.log(`Error in mongodb--->${error}`.bgRed.white);
    }
}

export default connectDB