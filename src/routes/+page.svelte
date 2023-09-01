<script lang="ts">
    import { onMount } from "svelte";
    import { loginInfo, budgetFrom, budgetTo, uploadTypeChosen, commentAbout, commentText } from "$lib/store";
    $uploadTypeChosen = "post"
    import IconButton, { Icon } from "@smui/icon-button";
    import Button, { Label } from "@smui/button";
    import MenuSurface from '@smui/menu-surface';
    import Textfield from '@smui/textfield'; 
    import Select, { Option } from '@smui/select';
    import type { PageServerData } from "./$types";

    let commentMenu : MenuSurface;
    
    export let data:PageServerData;
    onMount(() => {
        console.log(data)
    })
</script>

{#each data.found as found}
    {#if $uploadTypeChosen == "post" && $uploadTypeChosen == found.uploadType}
        {#if found.budget <= $budgetTo && found.budget >= $budgetFrom || $budgetFrom == null}
            <div class="cell">
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
                        <strong>Budget : {found.budget}</strong>
                    
                    <br>
                    <strong>Sort : {found.uploadSortFirst}/{found.uploadSortSecond}</strong>
                    <IconButton 
                    class="material-icons" 
                    on:click={() => {
                        $commentAbout = found.uploadTitle;
                    }}>
                        comment
                    </IconButton>
            </div>
        {/if}
    {/if}
    {#if $uploadTypeChosen == "comments" && $uploadTypeChosen == found.uploadType}
        <div class="comment">
            This is a Comment
            <IconButton class="material-icons">
                comment
            </IconButton>
        </div>
    {/if}
{/each}
<MenuSurface bind:this={commentMenu} anchorCorner="BOTTOM_LEFT" style="left:80%; width:20%;">
    <div
        style="width:100%; position:relative; height:160px;"
    >
        <IconButton 
            class="material-icon" 
            style="left:80%;"
            on:click={() => {
                commentMenu.setOpen(false); 
            }}
        >X</IconButton>
        <br>
        <h2>Comment : </h2>
        
        <br>
        <Button 
            style="margin-top: 1em;" 
            on:click={() => {
                commentMenu.setOpen(false); 
            }}
        >
            Submit
        </Button>
    </div>
</MenuSurface>
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
    .comment {
        border:solid 1px violet;
        background-color:pink;
    }
</style>