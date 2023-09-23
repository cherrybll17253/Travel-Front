import { env } from '$env/dynamic/private';
import 'dotenv/config';
import type { LayoutServerLoad } from './$types';
import db from '$lib/db';
import type { Collection } from "mongodb";
import type { Post } from "./type";
export const load:LayoutServerLoad = async () => {    
    const collectionA: Collection<Post> = db.collection('post');
    const collectionB: Collection<Post> = db.collection('user');
    const foundA = (await collectionA.find({}).toArray()).map(v => ({...v, _id:v._id.toString()}))
    const foundB = (await collectionB.find({}).toArray()).map(v => ({...v, _id:v._id.toString()}))
    
    const {
        apiKey,
        authDomain,
        projectId,
        storageBucket,
        messagingSenderId,
        appId,
        measurementId
    } = process.env;
    return {
        firebaseConfig:{
            apiKey,
            authDomain,
            projectId,
            storageBucket,
            messagingSenderId,
            appId,
            measurementId
        },
        foundA,
        foundB
    };
}