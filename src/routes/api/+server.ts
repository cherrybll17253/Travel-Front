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
    const collectionA: Collection<Post> = db.collection('post');
    const collectionB: Collection<Post> = db.collection('user');
    if(json.uploadType == "post" || json.uploadType == "comments"){
        const resultA = await collectionA.insertOne(json)
        return new Response(JSON.stringify(resultA), {
            headers:{
                'Content-Type':'application/json'
            }
        });
    }
    else{
        const resultB = await collectionB.insertOne(json)
        return new Response(JSON.stringify(resultB), {
            headers:{
                'Content-Type':'application/json'
            }
        });
    }
};