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
    import { searchedFor, loginInfo, budgetFrom, budgetTo, uploadTypeChosen, lookingFor, ClookingFor} from "$lib/store";
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
    let uploadTypeCMenu: MenuSurface;
    let uploadMenu: MenuSurface;
    let searchMenu: MenuSurface;
    let interestsMenu: MenuSurface;
    
    let budgetSet = 0;
    let budgetFromo = 0;
    let budgetToo = 0;

    let sorts = ["Fashion","Entertaining","Cultural", "Educational", "Wildlife", "Religion", "Health", "Food", "Recreation", "Volunteer", "Art", "History", "View"]
    let searchSet = 0;
    const obj = {
        uploadTitle:'',
        uploadText:'',
        uploadImageLink:'',
        uploadSort:'',
        uploadLocation:'',
        userName:'',
        budget:0,
        uploadType:'',
        userInterests : '',
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
    let searchText = ''

    import Checkbox from '@smui/checkbox';
    import FormField from '@smui/form-field';
    let interestsSelected:string[] = [];
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
            
            <IconButton
                class="material-icons"
                on:click={() => {
                    interestsMenu.setOpen(true)
                }}
            >
                settings
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
<Drawer variant="modal" bind:open style="background-color:violet; width:40%; height:100%;">
    <Header>
        <br><br><br><drawertitle><sub>UD<sub /><sup>GA<sup>JI</sup></sup></sub></drawertitle><Title />
        <Subtitle>Enjoy our services, adventurer!</Subtitle>
    </Header>
    <Content>
        <List>
            {#if $loginInfo}
                <Item
                    href="javascript:void(0)"
                    on:click={() => setActive("upload")}
                    on:click={
                        () => {
                            if($loginInfo){ 
                                uploadMenu.setOpen(true)
                            }
                            else{
                                alert("You need to Log in to do that!")
                            }
                        }
                    }
                    activated={active === "upload"}
                >
                    <Graphic class="material-icons" aria-hidden="true">upload</Graphic>
                    <Text>Upload</Text>
                </Item>
            {/if}
            <Item
                href="javascript:void(0)"
                on:click={() => {
                    setActive("FuploadTypeC");
                    uploadTypeCMenu.setOpen(true);
                    $lookingFor = '';
                    $ClookingFor = '';
                }}
                activated={active === "FuploadTypeC"}
            >
                <Graphic class="material-icons" aria-hidden="true">M/C</Graphic>
                <Text>Main / Comments</Text>
            </Item>
            <Separator />
            <Subheader tag="h6">Filter</Subheader>
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

<MenuSurface bind:this={budgetMenu} anchorCorner="BOTTOM_RIGHT" style="position:fixed;top:0;">
    <div
        style="margin: 1em; display: flex; flex-direction: column; align-items: flex-end;"
    >
        <IconButton 
            class="material-icon" 
            on:click={() => {
                budgetMenu.setOpen(false); 
            }}
        >X</IconButton>
        <Textfield bind:value={budgetFromo} label="From(₩) : " />
        <Textfield bind:value={budgetToo} label="To(₩) : "/>
        <Button 
        style="margin-top: 1em;" 
        on:click={() => {
            if(budgetFromo <= budgetToo && budgetFromo >= 0){    
                budgetMenu.setOpen(false); 
                budgetSet = 1;
                budgetFrom.set(budgetFromo) 
                budgetTo.set(budgetToo)
            }
            else if(budgetFromo >= budgetToo){
                alert("From(₩) Needs To Be Lower Than To(₩).")
            }
            else if(budgetFromo < 0){
                alert("Numbers cannot be a negative number.")
            }
        }}>
            Submit
        </Button>
    </div>
</MenuSurface>
<MenuSurface bind:this={uploadTypeCMenu} anchorCorner="BOTTOM_LEFT" style="position:fixed;top:0;">
    <div
        style="margin: 1em; display: flex; flex-direction: column; align-items: flex-end;"
    >
        <IconButton 
            class="material-icon" 
            on:click={() => {
                uploadTypeCMenu.setOpen(false); 
            }}
        >X</IconButton>
        <List>
            <Item on:SMUI:action={() => ($uploadTypeChosen = "post")}>
              <Text>Main</Text>
            </Item>
            <Item on:SMUI:action={() => ($uploadTypeChosen = "comments")}>
              <Text>Comments</Text>
            </Item>
        </List>
        Selected : {$uploadTypeChosen}
    </div>
</MenuSurface>
<MenuSurface bind:this={uploadMenu} anchorCorner="BOTTOM_LEFT" style="position:fixed;top:0;">
    <div
        style="width:500px; height:900px; overflow:hidden;"
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
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img src={obj.uploadImageLink} height="300" width="300" alt="The image linked">
        <br>
        <Select bind:value={obj.uploadSort} label="Select Menu">
            {#each sorts as sort}
                <Option value={sort}>{sort}</Option>
            {/each}
        </Select>
        
            <Textfield bind:value={obj.uploadLocation} label="Location(Be specific/ In Korean) : " style="width:100%;"/><br>
            <Textfield bind:value={obj.budget} style="width:100%;" label="Needed Budget(Per person/Max amount) : " type="number"/><br>
            {#if obj.uploadLocation != ""}
                <a href={"https://map.kakao.com/link/search/" + obj.uploadLocation} target="_blank">Is this correct?</a>
                <br>
            {/if}
            <Button 
            style="margin-top: 1em;" 
            on:click={
            async () => {
                obj.userName = $loginInfo.displayName || '';
                if( obj.uploadTitle.length > 4
                &&  obj.uploadText.length > 10
                &&  obj.uploadImageLink.length > 6
                &&  obj.uploadSort != ""
                &&  obj.uploadLocation.length > 2
                )   {
                    uploadMenu.setOpen(false);
                    obj.uploadType = "post"
                    await uploadDB();
                } 
            }}
            >
                Submit
            </Button>

    </div>
</MenuSurface>
<MenuSurface bind:this={interestsMenu} anchorCorner="BOTTOM_LEFT" style="left:80%; width:20%; position:fixed;top:0;">
    <div
        style="width:100%; position:relative; height:700px;"
    >
        <IconButton 
            class="material-icon" 
            style="left:80%;"
            on:click={() => {
                interestsMenu.setOpen(false); 
            }}
        >X</IconButton>
        <br>
        <h1>Select Your Interests</h1>
        {#each sorts as sort}
            <FormField>
                <Checkbox
                    bind:group={interestsSelected}
                    value={sort}
                />
                <span slot="label">
                    {sort}
                </span>
            </FormField>
        {/each}
        <h2>It's IRREVERSIBLE</h2>
        <br>
        <Button 
            style="margin-top: 1em;" 
            on:click={async () => {
                if($loginInfo){
                    interestsMenu.setOpen(false);
                    obj.userInterests = interestsSelected.join(",")
                    obj.uploadType = "userInfo"
                    obj.userName = $loginInfo.displayName || ''
                    console.log(obj.userInterests)
                    await uploadDB()
                }
                else{
                    alert("You need to log in to do that!")
                }
            }}
        >
            Submit
        </Button>
    </div>
</MenuSurface>
<MenuSurface bind:this={searchMenu} anchorCorner="BOTTOM_LEFT" style="left:80%; width:20%;position:fixed;top:0;">
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
                $searchedFor = searchText;
                searchText = "";
                $uploadTypeChosen = "post";
                searchSet = 1;
            }}
        >
            Submit
        </Button>
    </div>
</MenuSurface>

<div class="filtercontainer">
    {#if budgetSet == 1}
        <h5>Filters active : </h5>
    {/if}
    {#if budgetSet == 1}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <h6 on:click={() => {
            budgetSet = 0;
            budgetFrom.set(0);
            budgetTo.set(999999999999) 
        }}>budget {$budgetFrom}₩ ~ {$budgetTo}₩</h6>
    {/if}
    {#if $searchedFor != "" && searchSet == 1}
        <h5>Searching for : </h5>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <h6 on:click={() => {$searchedFor = ""; searchSet = 0}}>{$searchedFor}</h6>
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