<script lang="ts">
    import { onMount } from "svelte";
    import IconButton, { Icon } from "@smui/icon-button";
    import type { PageServerData } from "./$types";
    export let data:PageServerData;
    onMount(() => {
        console.log(data)
    })
</script>
{#each data.found as found}
    <div class="cell" id="cell">
        <img src={found.uploadImageLink} alt="placeholder">
           <h1><u>{found.uploadTitle}</u></h1>
            {found.uploadText}
        <br>
        <IconButton
            class="material-icons"
        >
            star
        </IconButton>
        <br>
        <strong>{found.uploadLocation}</strong>
    </div>
{/each}
<style>
    * {
        margin: 0;
        padding: 0;
    }
    .cell img{
        float:left;
        border:solid 1px pink;
        height:150px;
    }
    .cell{
        display: inline-block;
        border:solid 1px pink;
        width: 33%;
        word-break:break-all;
        height:fit-content;
        background-color: gray;
        text-align: center;
    }
</style>