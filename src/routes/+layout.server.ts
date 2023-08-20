import { env } from '$env/dynamic/private';
import type { LayoutServerLoad } from './$types';
export const load:LayoutServerLoad = async () => {
    const {
        apiKey,
        authDomain,
        projectId,
        storageBucket,
        messagingSenderId,
        appId,
        measurementId
    } = env;
    return {
        firebaseConfig:{
            apiKey,
            authDomain,
            projectId,
            storageBucket,
            messagingSenderId,
            appId,
            measurementId
        }
    };
}