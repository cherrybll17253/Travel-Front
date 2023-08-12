import type { Collection } from 'mongodb';
import db from '$lib/db'
// import { uploadTitle } from './+layout.svelte'
import uploadText from './+layout.svelte'
import uploadImageLink from './+layout.svelte'
import uploadSortFirst from './+layout.svelte'
import uploadSortSecond from './+layout.svelte'
import type { PageServerLoad } from './$types';
import type { Post } from './type';

async function main() {
    const collection: Collection<Post> = db.collection('post'); 
    const cursor = collection.find({});
    const arr = (await cursor.toArray()).map(v => ({...v, _id:v._id.toString("hex")}))
    return arr
}

// export const load:PageServerLoad = async () => {
//     const posts = await main()
    
//     db.collection("post").insertOne(
//         {
//              "title" : uploadTitle, 
//              "text" : uploadText, 
//              "imageLink" : uploadImageLink, 
//              "Sort" : `${uploadSortFirst}/${uploadSortSecond}`
//         }
//     )
//     return {
//         posts
//     }
// }