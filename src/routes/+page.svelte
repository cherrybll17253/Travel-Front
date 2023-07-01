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

    // interface iHuman {
    //     name: string;
    //     age: number;
    // }

    // let arr: iHuman[] = [];

    // onMount(async () => {
    //     const res = await fetch("/test.json");
    //     const json = await res.json();
    //     arr = json as iHuman[];
    // });
</script>

<TopAppBar style="background-color:violet;">
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
<Drawer variant="modal" bind:open style="background-color:brown">
    <Header>
        <br><br><br><drawertitle><sub>UD<sub /><sup>GA<sup>JI</sup></sup></sub></drawertitle><Title />
        <Subtitle>Enjoy our services, adventurer!</Subtitle>
    </Header>
    <Content>
        <List>
            <Item
                href="javascript:void(0)"
                on:click={() => setActive("Inbox")}
                activated={active === "Inbox"}
            >
                <Graphic class="material-icons" aria-hidden="true">
                    P
                </Graphic>
                <Text>Picked Places</Text>
            </Item>
            <Item
                href="javascript:void(0)"
                on:click={() => setActive("Star")}
                activated={active === "Star"}
            >
                <Graphic class="material-icons" aria-hidden="true">thumb</Graphic>
                <Text>Star</Text>
            </Item>
            <Item
                href="javascript:void(0)"
                on:click={() => setActive("Sent Mail")}
                activated={active === "Sent Mail"}
            >
                <Graphic class="material-icons" aria-hidden="true">send</Graphic>
                <Text>Sent Mail</Text>
            </Item>
            <Item
                href="javascript:void(0)"
                on:click={() => setActive("Drafts")}
                activated={active === "Drafts"}
            >
                <Graphic class="material-icons" aria-hidden="true">drafts</Graphic>
                <Text>Drafts</Text>
            </Item>

            <Separator />
            <Subheader tag="h6">Labels</Subheader>
            <Item
                href="javascript:void(0)"
                on:click={() => setActive("Family")}
                activated={active === "Family"}
            >
                <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
                <Text>Family</Text>
            </Item>
            <Item
                href="javascript:void(0)"
                on:click={() => setActive("Friends")}
                activated={active === "Friends"}
            >
                <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
                <Text>Friends</Text>
            </Item>
            <Item
                href="javascript:void(0)"
                on:click={() => setActive("Work")}
                activated={active === "Work"}
            >
                <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
                <Text>Work</Text>
            </Item>
        </List>
    </Content>
</Drawer>
<Scrim />

<style>
    * {
        margin: 0;
        padding: 0;
    }
    drawertitle{
        color:whitesmoke;
        font-size:30px;
    }
</style>
