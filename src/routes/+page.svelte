<script lang="ts">
    import { onMount } from "svelte";
    import type { PageServerData } from "./$types";
    export let data:PageServerData;

    interface iHuman{
        name:string;
        age:number;
    }
    
    let arr:iHuman[] = [];

    onMount(async() => {
        const res = await fetch('/test.json');
        const json = await res.json();
        arr = json as iHuman[];
    })
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
{#each data.placeholder as { title, body }}
    <div>
        <div>제목 : {title}</div>
        <div>내용 : {body}</div>
    </div>
{/each}