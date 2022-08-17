<template>
<div>
  <div class="header mb-3">
    <h3>This a sample table</h3>
  </div>
  <div>
    <div>
      <b-card title="Table Header" sub-title="Table subtitle">
           <b-card-text>
             <b-table striped hover :items="items"></b-table>
              </b-card-text>
      </b-card>
    </div>
  </div>

</div>
</template>

<script>
import {
  BRow,
  BCol,
  BLink,
  BCardText,
  BCardTitle,
  BImg,
  BCard,
  BForm,
  BButton,
  BTable,
} from "bootstrap-vue";
export default {
  components: {
    BTable,
    BCard,
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

<style></style>
