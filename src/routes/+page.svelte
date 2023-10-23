<script lang="ts">
    import { onMount } from "svelte";
    import { searchUser, FdeletedPost, myUpload,Iarray, onlyI, searchedFor, loginInfo, budgetFrom, budgetTo, uploadTypeChosen, commentAbout, lookingFor, commentText, ClookingFor } from "$lib/store";
    $uploadTypeChosen = "post"
    import IconButton, { Icon } from "@smui/icon-button";
    import Button, { Label } from "@smui/button";
    import MenuSurface from '@smui/menu-surface';
    import Textfield from '@smui/textfield'; 
    import Select, { Option } from '@smui/select';
    import type { PageServerData } from "./$types";
    import type { ObjectId } from "mongodb";
    let obj = {
        userName : '',
        commentAbt : '',
        commentContent : '',
        uploadType : '',
        deleted: 0,
    }
    let commentMenu : MenuSurface;
    let commentT = ''
    async function uploadDB(){
        const res = await fetch('/api', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:(JSON.stringify(obj))
        });
        await res.json();
        location.reload()
    }
    async function deleteDB(_id : string, type:string){
        const res = await fetch('/api', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:(JSON.stringify({_id, type}))
        });
        await res.json();
    }
    async function clickDB(_id : string, type:string){
        const res = await fetch('/api', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:(JSON.stringify({_id, type}))
        });
        await res.json();
    }
    async function commentCountDB(_id : string, type:string){
        const res = await fetch('/api', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:(JSON.stringify({_id, type}))
        });
        await res.json();
    }
    export let data:PageServerData;
    let searching = ""
    function shuffle(array:Array<Object>) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }
    shuffle(data.foundA)
    shuffle(data.foundB)
    let currentAbout = ""
    data.foundA.sort(function(a, b) {
        let pointsA = 0;
        let pointsB = 0;

        pointsA += a.clicked + a.commentAmount/a.clicked
        pointsB += b.clicked + b.commentAmount/b.clicked
        
        if($Iarray && $Iarray.includes(a.uploadSort))
            pointsA += 100;
        if($Iarray && $Iarray.includes(b.uploadSort))
            pointsB += 100;

        return (pointsB) - (pointsA)
    });
    console.log(data.foundA)
</script>

<MenuSurface bind:this={commentMenu} anchorCorner="BOTTOM_LEFT" style="left:80%; width:20%;position:fixed;top:0;">
    <div style="width:100%; position:relative; height:fit-content;">
        <IconButton 
            class="material-icon" 
            style="left:80%;"
            on:click={() => {
                commentMenu.setOpen(false); 
            }}
        >X</IconButton>
        <br>
        <Textfield bind:value={commentT} label="Comment : "/>
        <br>
        For : 
        <br>
        {$commentAbout}
        <br>
        <Button 
            style="margin-top: 1em;" 
            on:click={async () => {
                commentMenu.setOpen(false);
                $commentText = commentT;
                obj.commentContent = commentT; 
                obj.userName = $loginInfo.displayName || '';
                obj.commentAbt = $commentAbout;
                obj.uploadType = 'comments';
                await commentCountDB(currentAbout, "commentcount");
                await uploadDB();
            }}
        >
            Submit
        </Button>
    </div>
</MenuSurface>
{#each data.foundA as found}    
{#if !$searchUser || $searchUser && (found.userName).toLowerCase().includes($searchUser.toLowerCase())}
{#if $FdeletedPost == false && found.deleted == 0 || $FdeletedPost == true && found.deleted == 1}
    {#if $uploadTypeChosen == "post" && $uploadTypeChosen == found.uploadType && (($lookingFor && $lookingFor == found.uploadTitle) || !$lookingFor)}
        {#if found.budget <= $budgetTo && found.budget >= $budgetFrom || $budgetFrom == null}
            <div class="invis">{searching = $searchedFor.toLowerCase()}</div>
            {#if $searchedFor && (found.uploadTitle).toLowerCase().includes(searching) ||
                $searchedFor && (found.uploadText).toLowerCase().includes(searching) || 
                !$searchedFor
            }
                {#if !$onlyI || $onlyI && $Iarray.includes(found.uploadSort)}
                        {#if $loginInfo && $myUpload && $loginInfo.displayName === found.userName ||
                            !$myUpload
                        }
                            <div class="cell">
                                <img src={found.uploadImageLink} alt="placeholder" width=150>
                                {#if $loginInfo && found.userName == $loginInfo.displayName}
                                    <h1 style="background-color:purple; display:inline-block"><u><a on:click={() => {clickDB(found._id, "click");}} href={"https://www.google.com/search?q=" + found.uploadTitle} target="_blank">{found.uploadTitle}</a></u></h1>
                                    {#if found.deleted == 0}
                                        <IconButton class="material-icons"
                                            on:click={() => {
                                                deleteDB(found._id, "del")
                                            }}
                                        >delete
                                        </IconButton>
                                    {:else}
                                        <IconButton class="material-icons"
                                            on:click={() => {
                                                deleteDB(found._id, "return")
                                            }}
                                        ><h6>RETURN</h6>
                                        </IconButton>
                                        <IconButton class="material-icons" style="left:50px;"
                                            on:click={() => {
                                                deleteDB(found._id, "empty")
                                            }}
                                        ><h6>EMPTY</h6>
                                        </IconButton>
                                    {/if}  
                                {:else}
                                    <h1><u><a on:click={() => {clickDB(found._id, "click");}} href={"https://www.google.com/search?q=" + found.uploadTitle} target="_blank">{found.uploadTitle}</a></u></h1>
                                {/if}
                                <div id="utext">
                                    {found.uploadText}
                                </div>
                                <br>
                                    <a style="background-color:white;" href={"https://map.kakao.com/link/search/" + found.uploadLocation} target="_blank">Click Here For Map</a>
                                    <br>
                                    <strong>Uploaded By : <button on:click={() =>{$searchUser = found.userName}}>{found.userName}</button></strong>
                                    <br>
                                    <strong>Budget : {found.budget}</strong>
                                <br>
                                <strong>Views : {found.clicked}</strong>
                                <br>
                                <strong>Comments : {found.commentAmount}</strong>
                                <br>
                                <strong>Sort : {found.uploadSort}</strong>
                                <IconButton 
                                class="material-icons" 
                                on:click={async() => {
                                    if($loginInfo){
                                        commentMenu.setOpen(true)
                                        $commentAbout = found.uploadTitle;
                                        currentAbout = found._id;
                                        console.log(currentAbout)
                                    }
                                    else{
                                        alert("You need to login to do that!")
                                    }
                                }}>
                                    keyboard
                                </IconButton>
                                <IconButton 
                                class="material-icons" 
                                on:click={() => {
                                    $uploadTypeChosen = "comments";
                                    $ClookingFor = found.uploadTitle;
                                }}>
                                    comment
                                </IconButton>
                            </div>
                        {/if}
                    {/if}
                {/if}
            {/if}
        {/if}
    {/if}
    {#if $FdeletedPost == true && found.deleted == 1 || $FdeletedPost == false && found.deleted == 0}
    {#if $uploadTypeChosen == "comments" && $uploadTypeChosen == found.uploadType && (($ClookingFor && $ClookingFor == found.commentAbt) || !$ClookingFor)}
    {#if $loginInfo && $myUpload && $loginInfo.displayName === found.userName ||
        !$myUpload
    }
    <div class="comment">
        {#if $loginInfo && found.userName == $loginInfo.displayName}
            <h1 style="background-color:purple;">Comment About :<br> {found.commentAbt}</h1>
            {#if $FdeletedPost == false}        
                <IconButton class="material-icons"
                    on:click={() => {
                        deleteDB(found._id, "del")
                    }}
                >delete
                </IconButton>      
            {:else}
                <IconButton class="material-icons"
                    on:click={() => {
                        deleteDB(found._id, "return")
                    }}
                >RETURN
                </IconButton>
                <IconButton class="material-icons" style="left:50px;"
                    on:click={() => {
                        deleteDB(found._id, "empty")
                    }}
                >EMPTY
                </IconButton>
            {/if}
        {:else}
            <h1>Comment About :<br> {found.commentAbt}</h1>
        {/if}
        <hr>
        Written by : {found.userName}
        <hr>
        {found.commentContent}
        <hr>
        <button 
            on:click={() => {
                $uploadTypeChosen = "post"
                $lookingFor = found.commentAbt
            }}>
            Go to post
        </button>
    </div>
    {/if}
    {/if}
    {/if}
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
    u a{
        color:white;
    }
    .cell strong{
        border:solid 1px violet;
        background-color: violet;
        color:white;
    }
    .comment {
        word-break:break-all;
        display:inline-block;
        background-color:pink;
        color:black;
        height:fit-content;
        width:49%;
    }
    .comment h1{
        color:coral;
        background-color: gray;
    }
    .invis{
        display:none;
    }
</style>