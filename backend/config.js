export const config = {
    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/Amazon'
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your_super_secret_jwt_key_here'
    },
    server: {
        port: process.env.PORT || 3000
    },
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:4200'
    }
}; 