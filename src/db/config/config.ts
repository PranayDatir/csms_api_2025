const MONGO_USERNAME = process.env?.['MONGO_USERNAME'] || "root";
const MONGO_PASSWORD = process.env?.['MONGO_PASSWORD'] || "root";

const MONGODB_HOST = process.env?.['MONGODB_HOST'] || "local";
const MONGODB_PORT = process.env?.['MONGODB_PORT'] || "27017";
const MONGODB_DB_NAME = process.env?.['MONGODB_DB_NAME'] || "csms";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGODB_HOST}/${MONGODB_DB_NAME}?appName=Cluster`;

const SERVER_TOKEN_EXPIRETIME = process.env?.['SERVER_TOKEN_EXPIRETIME'] || "7d";
const SERVER_TOKEN_SECRET = process.env?.['SERVER_TOKEN_SECRET'] || "RIYA_TRAVELS_CRM";

const config = {
    mongo: {
        username: MONGO_USERNAME,
        password: MONGO_PASSWORD,
        url: MONGO_URL,
        dbName: MONGODB_DB_NAME,
    },
    server: {
    // port: SERVER_PORT,
    token: {
      expireTime: SERVER_TOKEN_EXPIRETIME,
      secret: SERVER_TOKEN_SECRET
    },
  }
};


export default config;