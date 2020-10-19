/* Imports */
const mongoose = require('mongoose');
const config = require('./config/default.json');

/* Connect to local DB - callback */
// mongoose.connect('mongodb://127.0.0.1:27017/users', {useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
//     if(err) {
//         console.log('Something went wrong with DB connection!');
//         throw err;
//     }
//     console.log('Successfully connected to Mongo DB');
// });

/* Connect to local DB - promise */
// mongoose.connect('mongodb://127.0.0.1:27017/users', {useNewUrlParser: true, useUnifiedTopology: true })
//     .then (() => {
//         console.log('Successfully connected to Mongo DB');
//     })
//     .catch((err) => {
//         console.log('Something went wrong with DB connection!');
//     })

/* Connect to local DB - async-await */
connectDB = async () => {
    try {
        await mongoose.connect(config.LOCAL_DB.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`Successfully connected to ${config.LOCAL_DB.DB_PROVIDER} DB - ${config.LOCAL_DB.DB_NAME}`);
        // await mongoose.connect(config.ATLAS_DB.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        // console.log(`Successfully connected to ${config.ATLAS_DB.DB_PROVIDER} DB - ${config.ATLAS_DB.DB_NAME}`);
        
    } catch (err) {
        console.log('Something went wrong with DB connection!');
    } 
}

/* Export connectDB function */
module.exports = connectDB;
    

