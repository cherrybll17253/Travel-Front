import type { RequestHandler } from "./$types";
import db from '$lib/db';
import { ObjectId } from "mongodb";
import type { Collection } from 'mongodb';
import type { Post } from '../type';
export const GET:RequestHandler = async ({request}) => {
    const collection: Collection<Post> = db.collection('post');
    const found = await collection.find({deleted : 0}).toArray()
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
    const objectId = new ObjectId(json._id);
    const updating:Object = collectionA.find({deleted : 0, _id : objectId, uploadType:"post"})
    if(json.uploadType == "post" || json.uploadType == "comments"){
        const resultA = await collectionA.insertOne(json)
        return new Response(JSON.stringify(resultA), {
            headers:{
                'Content-Type':'application/json'
            }
        });
    }
    else if(json.uploadType == "comments"){
        const resultB = await collectionB.insertOne(json)
        return new Response(JSON.stringify(resultB), {
            headers:{
                'Content-Type':'application/json'
            }
        });
    }
    else{
        let resultC;
        if(json.type == "del")
            resultC = await collectionA.updateOne({_id : objectId}, {$set : {deleted : 1}})
        else if(json.type == "return")
            resultC = await collectionA.updateOne({_id : objectId}, {$set : {deleted : 0}})
        else if(json.type == "empty")
            resultC = await collectionA.deleteOne({_id : objectId})
        else if(json.type == "click"){
            console.log(objectId)
            resultC = await collectionA.updateOne({_id : objectId}, {$inc : {clicked : 1}})
        }
        else if (json.type == "commentcount"){
            console.log(objectId)
            resultC = await collectionA.updateOne({_id : objectId}, {$inc : {commentAmount : 1}})
        }
        return new Response(JSON.stringify(resultC), {
            headers:{
                'Content-Type':'application/json'
            }
        });
    }
};