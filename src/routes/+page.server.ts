<<<<<<< HEAD
=======
import type { PageServerLoad } from "./$types";
import db from '$lib/db';
import type { Collection } from "mongodb";
import type { Post } from "./type";
export const load = async () => {
    const collection: Collection<Post> = db.collection('post');
    const found = (await collection.find({}).toArray()).map(v => ({...v, _id:v._id.toString()}))
    return {
        found
    }
}



>>>>>>> 2d791853f2b52a1ce03bc9d005bfdbe983c6ef1a
