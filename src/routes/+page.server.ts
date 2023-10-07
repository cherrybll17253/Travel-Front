import type { PageServerLoad } from "./$types";
import db from '$lib/db';
import type { Collection } from "mongodb";
import type { Post } from "./type";
export const load:PageServerLoad = async () => {
    const collectionA: Collection<Post> = db.collection('post');
    const collectionB: Collection<Post> = db.collection('user');
    await collectionA.deleteMany({deleted : 1})
    const foundA = (await collectionA.find({}).toArray()).map(v => ({...v, _id:v._id.toString()}))
    const foundB = (await collectionB.find({}).toArray()).map(v => ({...v, _id:v._id.toString()}))
    return {
        foundA,
        foundB
    };
}
 




