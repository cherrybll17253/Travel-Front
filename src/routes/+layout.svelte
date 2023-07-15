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

    let randomSlogan = Math.floor(Math.random() * 3 + 1);

    import type MenuSurface from '@smui/menu-surface';
    import Textfield from '@smui/textfield'; 
    let surface: MenuSurface;
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
                activated={active === "Fdistance"}
            >
                <Graphic class="material-icons" aria-hidden="true">list</Graphic>
                <Text>By distance</Text>
            </Item>
            <Item
                href="javascript:void(0)"
                on:click={() => setActive("Fbudget")}
                activated={active === "Fbudget"}
            >
                <Graphic class="material-icons" aria-hidden="true">list</Graphic>
                <Text>By budget</Text>
            </Item>
            <Item
                href="javascript:void(0)"
                on:click={() => setActive("Fweather")}
                activated={active === "Fweather"}
            >
                <Graphic class="material-icons" aria-hidden="true">list</Graphic>
                <Text>By weather(may change frequently)</Text>
            </Item>
        </List>
    </Content>
</Drawer>
<Scrim />
<slot />

<style>
    drawertitle{
        color:whitesmoke;
        font-size:30px;
    }
</style>