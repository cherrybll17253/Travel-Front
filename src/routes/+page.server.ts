import type { Collection } from 'mongodb';
import db from '$lib/db'
import type { PageServerLoad } from './$types';
import type { Post } from './type'

let uploadTitle = ''
let uploadText = ''
let uploadImageLink = ''
let uploadSortFirst = ''
let uploadSortSecond = ''

async function main() {
    const collection: Collection<Post> = db.collection('post'); 
    const cursor = collection.find({});
    const arr = (await cursor.toArray()).map(v => ({...v, _id:v._id.toString("hex")}))
    return arr
}

export const load:PageServerLoad = async () => {
    const posts = await main()
    
    db.collection("post").insertOne(
        {
            "title" : uploadTitle, 
            "text" : uploadText, 
            "imageLink" : uploadImageLink, 
            "sort" : `${uploadSortFirst}/${uploadSortSecond}`
        }
    )
    return {
        posts
    }
}

