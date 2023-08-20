import type { PageServerLoad } from "./$types";
import db from '$lib/db';
import type { Collection } from "mongodb";
import type { Post } from "./type";
export const load:PageServerLoad = async () => {
    const collection: Collection<Post> = db.collection('post');
    const found = (await collection.find({}).toArray()).map(v => ({...v, _id:v._id.toString()}))
    return {
        found
    };
}





