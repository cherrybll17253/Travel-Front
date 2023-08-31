<script lang="ts">
    import { onMount } from "svelte";
    import { loginInfo, budgetFrom, budgetTo } from "$lib/store";
    import IconButton, { Icon } from "@smui/icon-button";
    import type { PageServerData } from "./$types";
    export let data:PageServerData;
    onMount(() => {
        console.log(data)
    })
</script>

{#each data.found as found}
    {#if found.budget <= $budgetTo && found.budget >= $budgetFrom}
        <div class="cell" id="cell">
            <img src={found.uploadImageLink} alt="placeholder" width=150>
            <h1><u>{found.uploadTitle}</u></h1>
            <div id="utext">
                {found.uploadText}
            </div>
            <br>
            <a style="background-color:white;" href={"https://map.kakao.com/link/search/" + found.uploadLocation} target="_blank">Click Here For Map</a>

            <br>
            <strong>Uploaded By : {found.userName}</strong>
            <br>
            <strong>Sort : {found.uploadSortFirst}/{found.uploadSortSecond}</strong>
            <br>
            <strong>Budget : {found.budget}</strong>
        </div>
    {/if}
{/each}
<hr>

<style>
    * {
        margin: 0;
        padding: 0;
    }
    .cell img{
        float:left;
        border:solid 1px violet;
        height:150px;
    }
    .cell{
        display: inline-block;
        border:solid 1px violet;
        width: 99%;
        word-break:break-all;
        height:fit-content;
        background-color: gray;
        text-align: center;
    }
    #utext{
        border:solid 1px violet;
    }
    .cell strong{
        border:solid 1px violet;
        background-color: violet;
        color:white;
    }
</style>