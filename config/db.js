import mongoose from 'mongoose';
import colors from 'colors';


const connectDB = async()=>{
    try{
const connect = await mongoose.connect(process.env.MONGO_URL);
console.log(`Connect To Mongo DB Databasw ${connect.connection.host}`.bgMagenta.white);
    }catch(e){
console.log(`Error in MongoDB ${e}`.bgRed.white)
    }
}
export default connectDB;