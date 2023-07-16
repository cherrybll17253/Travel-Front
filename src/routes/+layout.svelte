<script lang="ts">
    import { onMount } from "svelte";
    import IconButton, { Icon } from "@smui/icon-button";
    import type { PageServerData } from "./$types";
    export let data: PageServerData;
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
        Subheader,
    } from "@smui/list";

    let open = false;
    let active = "Inbox";

    function setActive(value: string) {
        active = value;
        open = false;
    }

    let randomSlogan = Math.floor(Math.random() * 4 + 1);

    import MenuSurface from '@smui/menu-surface';
    import Textfield from '@smui/textfield'; 
    let budgetMenu: MenuSurface;
    let distanceMenu: MenuSurface;

    let budgetSet = 0;
    let budgetFrom = '';
    let budgetTo = '';
    let distanceSet = 0;
    let distanceFrom = '';
    let distanceTo = '';
    
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
            <IconButton class="material-icons">search</IconButton>
            <IconButton class="material-icons">lock</IconButton>
        </Section>
    </Row>
</TopAppBar>
<Drawer variant="modal" bind:open style="background-color:brown; width:40%;">
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
            <Item
                href="javascript:void(0)"
                on:click={() => setActive("upload")}
                activated={active === "upload"}
            >
                <Graphic class="material-icons" aria-hidden="true">upload</Graphic>
                <Text>Upload</Text>
            </Item>

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
<MenuSurface bind:this={budgetMenu} anchorCorner="BOTTOM_LEFT">
    <div
        style="margin: 1em; display: flex; flex-direction: column; align-items: flex-end;"
    >
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
        <Textfield bind:value={distanceFrom} label="From(Km) : " />
        <Textfield bind:value={distanceTo} label="To(Km) : "/>
        <Button style="margin-top: 1em;" on:click={() => {distanceMenu.setOpen(false); console.log(`${distanceFrom}Km ~ ${distanceTo}Km`); distanceSet = 1}}>
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
</div>
<slot />

<style>
    drawertitle{
        color:whitesmoke;
        font-size:30px;
    }
    .filtercontainer h6{
        display:inline-block;
        border:1px solid;
        width:100px;
        border-radius: 20%;
    }
    .filtercontainer h5{
        display:inline-block;
        color:burlywood;
    }
</style>