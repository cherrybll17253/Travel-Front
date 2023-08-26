<script lang="ts">
    import { onMount } from "svelte";
    import IconButton, { Icon } from "@smui/icon-button";
    import type { PageServerData } from "./$types";
    export let data:PageServerData;
    onMount(() => {
        console.log(data)
    })
    // const container = document.getElementById('map') as HTMLDivElement;
    // const options: kakao.maps.MapOptions = {
    //     center: new kakao.maps.LatLng(33.450701, 126.570667),
    //     level: 3,
    // };
    // const map = new kakao.maps.Map(container, options);
</script>
{#each data.found as found}
    <div class="cell" id="cell">
        <img src={found.uploadImageLink} alt="placeholder" width=150>
        <h1><u>{found.uploadTitle}</u></h1>
        <div id="utext">
            {found.uploadText}
        </div>
        <br><br><br><br><br>
        Location : <strong>{found.uploadLocation}</strong>
    </div>
{/each}
<hr>
<!-- <div id="map" style="width:500px;height:400px;"></div> -->
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
    strong{
        border:solid pink 7px;
    }
</style>