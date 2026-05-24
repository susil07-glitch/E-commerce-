
import { config } from "dotenv";
config();

const envConfig={
    mongodbUrl: process.env.MONGODB_URL,
};  

export default envConfig;