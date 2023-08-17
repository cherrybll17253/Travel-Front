import type { RequestHandler } from "./$types";
import db from '$lib/db';
import type { Collection } from 'mongodb';
import type { Post } from '../type';
export const GET:RequestHandler = async ({request}) => {
    const collection: Collection<Post> = db.collection('post');
    const found = await collection.find({}).toArray()
    return new Response(JSON.stringify(found), {
        headers:{
            'Content-Type':'application/json'
        }
    });
}

export const POST:RequestHandler = async ({request}) => {
    const json = await request.json();
    const collection: Collection<Post> = db.collection('post');
    const result = await collection.insertOne(json)
    return new Response(JSON.stringify(result), {
        headers:{
            'Content-Type':'application/json'
        }
    });
};