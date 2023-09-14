
    
   
  <!-- <div style="margin-top: 1em;">
    <Button
      on:click={() => {
        const idx = selected.indexOf('Doc');
        if (idx > -1) {
          selected.splice(idx, 1);
        } else {
          selected.push('Doc');
        }
        selected = selected;
      }}>Toggle Doc Programmatically</Button
    >
  </div> -->
   <br>
Selected: {selected}
   
  <script lang="ts">
    import Checkbox from '@smui/checkbox';
    import FormField from '@smui/form-field';
   
    let options = [
      'A','B','C'
    ];
    let selected:string[] = [];
  </script>