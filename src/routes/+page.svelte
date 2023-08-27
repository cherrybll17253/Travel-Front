<script lang="ts">
    import { onMount } from "svelte";
    import { loginInfo } from "$lib/store";
    import IconButton, { Icon } from "@smui/icon-button";
    import type { PageServerData } from "./$types";
    export let data:PageServerData;
    onMount(() => {
        console.log(data)
    })
</script>
{#each data.found as found}
    <div class="cell" id="cell">
        <img src={found.uploadImageLink} alt="placeholder" width=150>
        <h1><u>{found.uploadTitle}</u></h1>
        <div id="utext">
            {found.uploadText}
        </div>
        <br>
        <a style="background-color:white;" href={"https://map.kakao.com/link/search/" + found.uploadLocation} target="_blank">Click Here For Map</a>

        <br>
        Uploaded By : {found.userName}
    </div>
{/each}
<hr>

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
        width: 99%;
        word-break:break-all;
        height:fit-content;
        background-color: gray;
        text-align: center;
    }
    #utext{
        border:solid 1px pink;
    }
</style>