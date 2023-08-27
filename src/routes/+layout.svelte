<script lang="ts">
    import { readable } from "svelte/store"
    import IconButton, { Icon } from "@smui/icon-button";
    import type { LayoutServerData } from "./$types";
    export let data: LayoutServerData;
    import TopAppBar, { Row, Section } from "@smui/top-app-bar";
    import Drawer, {
        AppContent,
        Content,
        Header,
        Title,
        Subtitle,
        Scrim,
    } from "@smui/drawer";
    import Button, { Label } from "@smui/button";
    import List, {
        Item,
        Text,
        Graphic,
        Separator,
        Subheader
    } from "@smui/list";
    import { loginInfo } from "$lib/store";
    let open = false;
    let active = "";

    function setActive(value: string) {
        active = value;
        open = false;
    }

    let randomSlogan = Math.floor(Math.random() * 4 + 1);

    import MenuSurface from '@smui/menu-surface';
    import Textfield from '@smui/textfield'; 
    import Select, { Option } from '@smui/select';
    let budgetMenu: MenuSurface;
    let distanceMenu: MenuSurface;
    let uploadMenu: MenuSurface;
    let searchMenu: MenuSurface;

    let budgetSet = 0;
    let budgetFrom = 0;
    let budgetTo = 0;
    let distanceSet = 0;
    let distanceFrom = 0;
    let distanceTo = 0;

    let sorts = ["Healing", "Activity", "Food"]
    let healingSort = ["With_Nature", "With_Nice_View", "Any"]
    let activitySort = ["Leisure_Sports", "Extreme_Sports", "Any"]
    let foodSort = ["Korean_Dish", "Non_Korean_Dish", "Any"]

    let searchText = '';
    let searchSet = 0;
    const obj = {
        uploadTitle:'',
        uploadText:'',
        uploadImageLink:'',
        uploadSortFirst:'',
        uploadSortSecond:'',
        uploadLocation:'',
        userName:''
    };
    async function uploadDB(){
        const res = await fetch('/api', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:(JSON.stringify(obj))
        });
        await res.json();
        location.reload();
    }
    import { onMount } from 'svelte'
    import {
        GoogleAuthProvider,
        browserSessionPersistence,
        getAuth,
        onAuthStateChanged,
        setPersistence,
        signInWithPopup
    } from 'firebase/auth';
    import type { User } from 'firebase/auth'
    import {
        getApps,
        initializeApp,
        FirebaseError,

        type FirebaseOptions

    } from 'firebase/app';

    const firebaseConfig = data.firebaseConfig;
    
    onMount(() => {
        console.log("onMount", firebaseConfig)
        if(getApps().length === 0){
            initializeApp(firebaseConfig);
        }        
        const auth = getAuth();
        const un = onAuthStateChanged(auth, user => {
            if(user){
                loginInfo.set(user);
            }
        })
        return () => {un()};
    })

    const login = async (firebaseConfig:FirebaseOptions) => {
        if(getApps().length === 0){
            initializeApp(firebaseConfig);
        }
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly'); 
        try{
            await setPersistence(auth, browserSessionPersistence); 
            const result = await signInWithPopup(auth, provider); 
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;
            return { token , user};
        } catch(error){
            if(error instanceof FirebaseError){
                const code = error.code;
                const message = error.message;
                const email = error.customData?.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log({
                    code, message, email, credential
                });
            } else {
                console.log(error);
            }
        }
    }
    const logout = async(firebaseConfig:FirebaseOptions) => {
        console.log(JSON.stringify(obj) + JSON.stringify($loginInfo))
        if(getApps().length === 0){
            initializeApp(firebaseConfig);
        }
        const auth = getAuth()
        await auth.signOut()
        location.reload()
    }
</script>

<TopAppBar style="background-color:violet;position:sticky;top:0;">
    <Row>
        <Section align="start" toolbar>
            <IconButton class="material-icons" on:click={() => (open = !open)}>
                menu
            </IconButton>
            <h5 style="text-align:left;">
                <sub>UD<sub /><sup>GA<sup>JI</sup></sup></sub>
            </h5>
        </Section>
        <Section>
            {#if randomSlogan == 1}
                <h1>"Your dream vacation awaits - let us light the way."</h1>
            {/if}
            {#if randomSlogan == 2}
                <h1>"Your dream vacation starts here."</h1>
            {/if}
            {#if randomSlogan == 3}
                <h1>"Escape, explore, and create unforgettable memories."</h1>
            {/if}
            {#if randomSlogan == 4}
                <h1>"Freedom is more valuable when you explore somewhere far"</h1>
            {/if}
        </Section>
        <Section align="end" toolbar>
            <IconButton 
            class="material-icons"
            on:click={() => searchMenu.setOpen(true)}
            >
                search
            </IconButton>
            {#if !$loginInfo}
                <h3>Logged out</h3>
                <IconButton 
                    on:click={async () => await login(firebaseConfig)}
                    class="material-icons"
                >login</IconButton>
            {:else}
                <h3>Logged in as {$loginInfo.displayName}</h3>
                <IconButton 
                    on:click={async () => await logout(firebaseConfig)}
                    class="material-icons"
                >logout</IconButton>
            {/if}
        </Section>
    </Row>
</TopAppBar>
<Drawer variant="modal" bind:open style="background-color:brown; width:40%; height:100%;">
    <Header>
        <br><br><br><drawertitle><sub>UD<sub /><sup>GA<sup>JI</sup></sup></sub></drawertitle><Title />
        <Subtitle>Enjoy our services, adventurer!</Subtitle>
    </Header>
    <Content>
        <List>
            <Item
                href="javascript:void(0)"
                on:click={() => setActive("Star")}
                activated={active === "Star"}
            >
                <Graphic class="material-icons" aria-hidden="true">star</Graphic>
                <Text>Starred Destination</Text>
            </Item>
            {#if $loginInfo}
                <Item
                    href="javascript:void(0)"
                    on:click={() => setActive("upload")}
                    on:click={() => uploadMenu.setOpen(true)}
                    activated={active === "upload"}
                >
                    <Graphic class="material-icons" aria-hidden="true">upload</Graphic>
                    <Text>Upload</Text>
                </Item>
            {/if}
            <Separator />
            <Subheader tag="h6">Filter</Subheader>
            <Item
                href="javascript:void(0)"
                on:click={() => setActive("Fdistance")}
                on:click={() => distanceMenu.setOpen(true)}
                activated={active === "Fdistance"}
            >
                <Graphic class="material-icons" aria-hidden="true">KM</Graphic>
                <Text>By distance</Text>
            </Item>
            <Item
                href="javascript:void(0)"
                on:click={() => setActive("Fbudget")}
                on:click={() => budgetMenu.setOpen(true)}
                activated={active === "Fbudget"}
            >
                <Graphic class="material-icons" aria-hidden="true">₩</Graphic>
                <Text>By budget</Text>
            </Item>
        </List>
    </Content>
</Drawer>
<Scrim />

<MenuSurface bind:this={budgetMenu} anchorCorner="BOTTOM_RIGHT">
    <div
        style="margin: 1em; display: flex; flex-direction: column; align-items: flex-end;"
    >
        <IconButton 
            class="material-icon" 
            on:click={() => {
                budgetMenu.setOpen(false); 
            }}
        >X</IconButton>
        <Textfield bind:value={budgetFrom} label="From(₩) : " />
        <Textfield bind:value={budgetTo} label="To(₩) : "/>
        <Button style="margin-top: 1em;" on:click={() => {budgetMenu.setOpen(false); console.log(`${budgetFrom}₩ ~ ${budgetTo}₩`); budgetSet = 1}}>
            Submit
        </Button>
    </div>
</MenuSurface>
<MenuSurface bind:this={distanceMenu} anchorCorner="BOTTOM_LEFT">
    <div
        style="margin: 1em; display: flex; flex-direction: column; align-items: flex-end;"
    >
        <IconButton 
            class="material-icon" 
            on:click={() => {
                distanceMenu.setOpen(false); 
            }}
        >X</IconButton>
        <Textfield bind:value={distanceFrom} label="From(Km) : " />
        <Textfield bind:value={distanceTo} label="To(Km) : "/>
        <Button style="margin-top: 1em;" on:click={() => {distanceMenu.setOpen(false); console.log(`${distanceFrom}Km ~ ${distanceTo}Km`); distanceSet = 1}}>
            Submit
        </Button>
    </div>
</MenuSurface>
<MenuSurface bind:this={uploadMenu} anchorCorner="BOTTOM_LEFT">
    <div
        style="width:500px; height:800px; overflow:hidden;"
    >
        <IconButton 
            class="material-icon" 
            style="left:90%;"
            on:click={() => {
                uploadMenu.setOpen(false); 
            }}
        >X</IconButton>
        <Textfield bind:value={obj.uploadTitle} label="Title : " style="width:100%;" input$maxlength={50} /><br>
        <Textfield bind:value={obj.uploadText} label="Write a brief description : " style="width:100%;" input$maxlength={300} /><br>
        <Textfield bind:value={obj.uploadImageLink} label="Image Link : " style="width:100%;"/>
        <br>
        <img src={obj.uploadImageLink} height="300" width="300" alt="The image linked">
        <br>
        <Select bind:value={obj.uploadSortFirst} label="Select Menu">
            {#each sorts as sort}
                <Option value={sort}>{sort}</Option>
            {/each}
        </Select>
        {#if obj.uploadSortFirst == "Healing"}
                <Select bind:value={obj.uploadSortSecond} label="Select Menu">
                    {#each healingSort as hsort}
                        <Option value={hsort}>{hsort}</Option>
                    {/each}
                </Select>
            {/if}
            {#if obj.uploadSortFirst == "Activity"}
                <Select bind:value={obj.uploadSortSecond} label="Select Menu">
                    {#each activitySort as asort}
                        <Option value={asort}>{asort}</Option>
                    {/each}
                </Select>
            {/if}
            {#if obj.uploadSortFirst == "Food"}
                <Select bind:value={obj.uploadSortSecond} label="Select Menu">
                    {#each foodSort as fsort}
                        <Option value={fsort}>{fsort}</Option>
                    {/each}
                </Select>
            {/if}
            <Textfield bind:value={obj.uploadLocation} label="Location(Be specific/ In Korean) : " style="width:100%;"/>
            {#if obj.uploadLocation != ""}
                <a href={"https://map.kakao.com/link/search/" + obj.uploadLocation} target="_blank">Is this correct?</a>
                <br>
            {/if}
            {#if $loginInfo}
                {$loginInfo.displayName}
            {/if}
            <Button 
            style="margin-top: 1em;" 
            on:click={
            async () => {
                obj.userName = $loginInfo.displayName || '';
                if( obj.uploadTitle.length > 4
                &&  obj.uploadText.length > 10
                &&  obj.uploadImageLink.length > 6
                &&  obj.uploadSortFirst != ""
                &&  obj.uploadSortSecond != ""
                &&  obj.uploadLocation.length > 2
                )   {
                    uploadMenu.setOpen(false);
                    await uploadDB();
                } 
            }}
            >
                Submit
            </Button>

    </div>
</MenuSurface>
<MenuSurface bind:this={searchMenu} anchorCorner="BOTTOM_LEFT" style="left:80%; width:20%;">
    <div
        style="width:100%; position:relative; height:160px;"
    >
        <IconButton 
            class="material-icon" 
            style="left:80%;"
            on:click={() => {
                searchMenu.setOpen(false); 
            }}
        >X</IconButton>
        <br>
        <Textfield bind:value={searchText} label="Looking for : " style="width:100%;"/>
        <br>
        <Button 
            style="margin-top: 1em;" 
            on:click={() => {
                searchMenu.setOpen(false); 
                searchSet = 1
                console.log(`Searched : ${searchText}`);
            }}
        >
            Submit
        </Button>
    </div>
</MenuSurface>
<div class="filtercontainer">
    {#if budgetSet == 1 || distanceSet == 1}
        <h5>Filters active : </h5>
    {/if}
    {#if distanceSet == 1}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <h6 on:click={() => distanceSet = 0}>distance {distanceFrom}Km ~ {distanceTo}Km</h6>
    {/if}
    {#if budgetSet == 1}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <h6 on:click={() => budgetSet = 0}>budget {budgetFrom}₩ ~ {budgetTo}₩</h6>
    {/if}
    {#if searchText != "" && searchSet == 1}
        <h5>Searching for : </h5>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <h6 on:click={() => {searchText = ""; searchSet = 0}}>{searchText}</h6>
    {/if}
</div>
<slot />

<style>
    drawertitle{
        color:whitesmoke;
        font-size:30px;
    }
    .filtercontainer h6{
        display:inline-block;
        border:1px solid white;
        width:fit-content;
        border-radius: 20%;
    }
    .filtercontainer h5{
        margin-left:50px;   
        display:inline-block;
        color:burlywood;
    }
</style>