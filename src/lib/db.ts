import { MongoClient } from "mongodb";
const url: string = 'mongodb+srv://thegreatcbt:jian!0806@udgajicluster.eluwvwj.mongodb.net/';
const client: MongoClient = new MongoClient(url);
const dbName: string = 'DBtest';

await client.connect()

console.log('good connection with server');

export default client.db(dbName)