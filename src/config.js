import { config } from "dotenv";
config();

{config}
export default{
    mongodbURL: process.env.MONGODB_URI 
};