import type { PageServerLoad } from "./$types"

interface iPlaceHolder{
    userId: number,
    id: number,
    title: string,
    body: string
}

export const load:PageServerLoad = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    return {
        placeholder:(await res.json()) as iPlaceHolder[]
    }
}

