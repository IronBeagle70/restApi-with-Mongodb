import mongoose from "mongoose";
import config from "./config";

// conectado a MONGODB

(async()=>{
    try{
        const db = await mongoose.connect(config.mongodbURL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        }); 
        console.log('Database is connected to: ', db.connection.name);
    }catch (error) {
        console.log(error);
    }
})();


