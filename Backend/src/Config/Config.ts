
import { config } from "dotenv";
config();

const envConfig={
    mongodbUrl: process.env.MONGODB_URL,
    jwtSecret: process.env.JWT_SECRET
};  

export default envConfig;