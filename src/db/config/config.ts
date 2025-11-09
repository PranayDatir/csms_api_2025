const MONGO_USERNAME = process.env?.['MONGO_USERNAME'] || "root";
const MONGO_PASSWORD = process.env?.['MONGO_PASSWORD'] || "root";

const MONGODB_HOST = process.env?.['MONGODB_HOST'] || "local";
const MONGODB_PORT = process.env?.['MONGODB_PORT'] || "27017";
const MONGODB_DB_NAME = process.env?.['MONGODB_DB_NAME'] || "csms";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGODB_HOST}/${MONGODB_DB_NAME}?appName=Cluster`;

const config = {
    mongo: {
        username: MONGO_USERNAME,
        password: MONGO_PASSWORD,
        url: MONGO_URL,
        dbName: MONGODB_DB_NAME,
    }
};


export default config;