<template>
<div>
  <div class="header mb-3">
    <h3>Dashboar</h3>
  </div>
</div>
</template>

<script>
  export default {
    components: {
      BTable,
      BCard,
    },

    mounted() {
      if (localStorage.getItem('reloaded')) {
      } 
      else {
          // Set a flag so that we know not to reload the page twice.
          localStorage.setItem('reloaded', '1');
          location.reload();
      }
    },

    data() {
      return {
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
      }
    }
  };
</script>

<style>
</style>
