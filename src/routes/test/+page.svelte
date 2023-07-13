<div style="min-width: 100px;">
  <Button on:click={() => surface.setOpen(true)}>Set Budget</Button>
  <MenuSurface bind:this={surface} anchorCorner="BOTTOM_LEFT">
    <div
      style="margin: 1em; display: flex; flex-direction: column; align-items: flex-end;"
    >
      <Textfield bind:value={name} label="From : " />
      <Textfield bind:value={email} label="To : " type="email" />
      <Button style="margin-top: 1em;" on:click={() => {surface.setOpen(false); console.log(`${name}, ${email}`); set = 1}}>
        Submit
      </Button>
    </div>
  </MenuSurface>
  <h1 id="budget">Budget set as : Didn't set yet</h1>
  <img src="https://media.discordapp.net/attachments/881132710356205630/1127584839755903096/20230709_205816.jpg?width=373&height=663">
</div>

<script lang="ts">
  import MenuSurface from '@smui/menu-surface';
  import Textfield from '@smui/textfield';
  import Button from '@smui/button';

  let surface: MenuSurface;
  let set = 0;
  let name = '';
  let email = '';

  if(set == 1){
    let budget = document.getElementById("budget")
    budget.innerHTML = `Budget set as : ${name} ~ ${email}`
    set = 0
  }
</script>
