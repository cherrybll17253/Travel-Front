import { MongoClient } from "mongodb";
const url: string = 'mongodb+srv://anothercbt:jian0806@cluster0.m5doiuj.mongodb.net/?retryWrites=true&w=majority';
const client: MongoClient = new MongoClient(url);
const dbName: string = 'DBtest';

await client.connect()

console.log('good connection with server');

export default client.db(dbName)