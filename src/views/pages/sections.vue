<template>
  <b-overlay :show="is_busy" rounded="sm">
    <b-container fluid>

      <b-row class="mb-2">
        <b-col md="6">
          <h2><strong>List of Member's Sections</strong></h2>
        </b-col>

        <b-col md="6">
          <b-button variant="outline-primary" @click="newModal" class="float-right mx-1">
              Add Section
          </b-button>
          
          <span class="float-right" size="sm">
            <b-input-group>
                <b-form-input
                  id="filter-input"
                  v-model="filter"
                  type="search"
                  placeholder="Type to Search"
                ></b-form-input>

                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                </b-input-group-append>
            </b-input-group>
          </span>
        </b-col>
      </b-row>

      <div class="card">
        <div class="card-body">
          <b-table
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :filter-included-fields="filterOn"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            sort-icon-left
            :bordered="bordered" 
            :hover="hover"
            show-empty
            id="my-table"
            small
            @filtered="onFiltered"
          >
            <template #cell(index)="data">
              <!--{{ data.index + 1 }}-->
              <input type="checkbox" v-model="action.selected" :value="data.item.id" number>
            </template>

            <template #cell(actions)="row">
              <!--<b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
                Info modal
              </b-button>-->
              <b-button variant="info" size="sm" @click="editModal(row.item)" class="mr-1">
                Edit
              </b-button>
              <b-button variant="danger" size="sm" @click="onDeleteAll(row.item.id)" class="mr-1">
                Delete
              </b-button>
              <!--<b-button size="sm" @click="row.toggleDetails">
                {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
              </b-button>-->
            </template>

            <template #row-details="row">
              <b-card>
                <ul>
                  <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                </ul>
              </b-card>
            </template>
          </b-table>

          <!-- Info modal -->
          <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
            <pre>{{ infoModal.content }}</pre>
          </b-modal>
        </div>

        <div class="card-footer">
          <b-row class="mb-2">
            <b-col md="4">
              <b-form-group
                label="Showing"
                label-for="per-page-select"
                label-cols-md="4"
                label-align-sm="right"
                label-size="sm"
                class="mb-0"
              >
                <b-form-select
                  id="per-page-select"
                  v-model="perPage"
                  :options="pageOptions"
                  size="sm"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md="4">

              <b-pagination
                aria-controls="my-table"
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>
            </b-col>
          </b-row>
        </div>
      </div>

      <b-modal ref="addNewType" hide-footer :title="title">
        <b-form @submit.prevent="editMode ? updateType() : createType()">
          <div class="modal-body">
            <div class="form-group">
              <label>Name<span class="text-danger pulll-right">*</span></label>
              <input v-model="dform.name" type="text" name="name" required class="form-control"/>
              
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="hideModal">
                Close
            </button>
            <button v-show="editMode" type="submit" class="btn btn-success">
                Update
            </button>
            <button v-show="!editMode" type="submit" class="btn btn-primary">
                Create
            </button>
          </div>
        </b-form>
      </b-modal>

    </b-container>
  </b-overlay>
</template>

<script>
  import axios from 'axios';
  import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
  
  export default {
    data() {
      return {
        is_busy: false,
        editMode: false,
        title: '',

        action: {
          selected: []
        },
        
        dform: {
          id: "",
          name: "",
        },

        items: [],
        fields: [
          { key: 'index', label: '' },
          
          { key: 'name', label: 'Name of Section', sortable: true, sortDirection: 'desc' },
          { key: 'actions', label: 'Actions' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 25,
        bordered: true,
        hover: true,
        fixed: true,
        pageOptions: [5, 10, 25, 50, 100, { value: 100, text: "All" }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        },
      }
    },

    created() {
        this.load();
    },

    methods: {
      load() {
        if(this.is_busy) return;
        this.is_busy = true;
        axios.get('/section')
        .then(res => {
          this.items = res.data.data;
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            this.is_busy = false;
        });
      },
      
      info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },

      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },

      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },

      onRowSelected(items) {
        this.selected = items
      },
      selectAllRows() {
        this.$refs.selectableTable.selectAllRows()
      },
      clearSelected() {
        this.$refs.selectableTable.clearSelected()
      },

      newModal() {
          (this.editMode = false), this.reset();
          this.title = 'Add New Section';
          this.$refs['addNewType'].show()
      },

      hideModal() {
        this.$refs['addNewType'].hide()
      },

      fill(type) {
        this.dform.name = type.name;
        this.dform.id = type.id;
      },

      editModal(type) {
        (this.editMode = true), this.reset();
        this.title = 'Edit Section';
        this.fill(type);
        this.$refs['addNewType'].show();
      },

      reset(){
        this.dform.name = ''
      },

      createType() {
        if (this.is_busy) return;
        this.is_busy = true;
        this.$refs['addNewType'].hide()
       
        //this.dform.post("/api/members/sections")

        axios.post('/section', this.dform)
        .then((response) => {
          this.text = response.data.message;
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Success`,
              text: response.data.message,
              variant: "success",
            },
          });
        })
        .catch(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "An Error Occured",
              icon: "XIcon",
              variant: "errror",
            },
          });
        })
        .finally(() => {
            this.is_busy = false;
            this.load(); 
        });
      },

      updateType() {
          if (this.is_busy) return;
          this.is_busy = true;

          this.$refs['addNewType'].hide()
          axios.put("/section/" + this.dform.id, this.dform)
          .then((response) => {
            this.text = response.data.message;
            this.$toast({
              component: ToastificationContent,
              props: {
                title: `Success`,
                text: response.data.message,
                variant: "success",
              },
            });
          })
          .catch(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: "An Error Occured",
                icon: "XIcon",
                variant: "errror",
              },
            });
          })
          .finally(() => {
              this.is_busy = false;
              this.load(); 
          });
      },

      onDeleteAll(id) {
          if(id){
              this.action.selected.push(id);
          }
          
          Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!"
          })
          .then(result => {
              if (result.value) {
                  if (this.is_busy) return;
                  this.is_busy = true;
                  axios.get('/section/delete', { params: this.action})
                  .then((response) => {
                      Swal.fire(
                          "Deleted!",
                          response.data.message,
                          "success"
                      );
                      this.is_busy = false;
                  })
                  .catch(() => {
                      Swal.fire(
                          "Failed!",
                          "Ops, Something went wrong, try again.",
                          "warning"
                      );
                  })
                  .finally(() => {
                    this.is_busy = false;
                    this.load(); 
                });
              }
          });
      },
    },

    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
      }
    },

    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
    },
  }
</script>