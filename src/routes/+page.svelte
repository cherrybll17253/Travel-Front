<script lang="ts">
    import { onMount } from "svelte";
    import IconButton from "@smui/icon-button";
    import type { PageServerData } from "./$types";
    export let data:PageServerData;

    let randomSlogan = Math.floor(Math.random()*3 + 1)

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

{#if randomSlogan == 1}
    <div class="title">
        <h5 style="text-align:left;">UD<br>GA<br>J I</h5>
        <h1>"Your dream vacation awaits - let us light the way."</h1>
        <IconButton class="material-icons">search</IconButton>
    </div>
{/if}
{#if randomSlogan == 2}
    <div class="title">
        <h5 style="text-align:left;">UD<br>GA<br>J I</h5>
        <h1>"Your dream vacation starts here."</h1>
        <IconButton class="material-icons">search</IconButton>
    </div>
{/if}
{#if randomSlogan == 3}
    <div class="title">
        <h5 style="text-align:left;">UD<br>GA<br>J I</h5>
        <h1>"Escape, explore, and create unforgettable memories."</h1>
        <IconButton class="material-icons">search</IconButton>
    </div>
{/if}

<style>
    *{
        margin:0;
        padding:0;
    }
    .title{
        padding:20px;
        text-align:center;
        background-color: violet;
    }

</style>
