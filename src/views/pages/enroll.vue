<template>
    <b-overlay :show="is_busy" rounded="sm">
        <div class="container-fluid">           
            <div class="mb-2 p-2 text-center">
                <h4>
                    <strong v-show="!editMode">New Member</strong>
                    <strong v-show="editMode">Update Member</strong>
                </h4>
            </div>

            <div class="alert alert-danger p-2" v-if="Object.keys(errors).length > 0">
                <ul>
                    <li v-for="error in errors" :key="error.id" v-bind:value="error.id">
                        {{ error[0] }}
                    </li>
                </ul>
            </div>

            <form-wizard @on-complete="editMode ? updateUser() : createUser()">
                <tab-content title="Login Detail" icon="fa fa-user">
                    <b-card no-body>
                        <b-card-body>
                            <div class="row">
                                <div class="col-md-4 form-group">
                                    <label>First Name</label>
                                    <input v-model="form.firstname" type="text" required class="form-control"/>
                                </div>

                                <div class="col-md-4 form-group">
                                    <label>Middle Name</label>
                                    <input v-model="form.middlename" type="text" class="form-control"/>
                                </div>

                                <div class="col-md-4 form-group">
                                    <label>Last Name</label>
                                    <input v-model="form.lastname" type="text" required class="form-control"/>
                                </div>

                                <div class="col-md-4 form-group">
                                    <label>Membership ID</label>
                                    <input v-model="form.membership_id" type="text" required class="form-control"/>
                                </div>

                                <div class="col-md-4 form-group">
                                    <label>Admission Date</label>
                                    <input v-model="form.entrance_date" type="date" required class="form-control"/>
                                </div>

                                <div class="col-md-4 form-group">
                                    <label>Member's Types</label>
                                    <select v-model="form.member_type" class="form-control" required>
                                        <option value=null> -- Select Type-- </option>
                                        <option v-for="option in member_types" :key="option.id" v-bind:value="option.id">
                                            {{ option.name }}
                                        </option>
                                    </select>
                                </div>


                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Photo Image</label>
                                        <input type="file" accept="image/*"  @change="uploadImage" name="image" class="form-control">
                                    </div>
                                </div>


                                <div class="col-md-4 form-group">
                                    <label>Date of Birth</label>
                                    <input v-model="form.dob" type="date" class="form-control"/>
                                </div>

                                <div class="col-md-4">
                                    <b-form-group class="">
                                        <label>Gender</label>
                                        <b-form-select v-model="form.gender" :options="gender" required></b-form-select>
                                    </b-form-group>
                                </div>

                                <div class="col-md-4 form-group">
                                    <label>Email</label>
                                    <input v-model="form.email" type="email" required class="form-control">
                                </div>

                                <div class="col-md-4 form-group">
                                    <label>Phone Number</label>
                                    <input v-model="form.phone" type="tel" required class="form-control">
                                </div>


                                <div class="col-md-4">
                                    <b-form-group class="">
                                      <label>State of Origin</label>
                                      <select v-model="form.state" class="form-control" @change="onChange($event)" required>
                                      <option value=null> -- Select State -- </option>
                                        <option v-for="option in states" :key="option.id" v-bind:value="option.id">
                                          {{ option.title }}
                                        </option>
                                      </select>
                                    </b-form-group>
                                </div>

                                <div class="col-md-4">
                                    <b-form-group class="">
                                      <label>LGA of Origin</label>
                                      <select v-model="form.lga" class="form-control" required>
                                        <option value=null> -- Select LGA -- </option>
                                        <option v-for="option in lgas" :key="option.id" v-bind:value="option.id">
                                          {{ option.name }}
                                        </option>
                                      </select>
                                    </b-form-group>
                                </div>  

                                <div class="col-md-8 form-group">
                                    <label>Residential Address</label>
                                    <input v-model="form.address" type="text" required class="form-control">
                                </div>

                            </div>
                        </b-card-body>
                    </b-card>
                </tab-content>

                <tab-content title="Membership Cards" icon="fas fa-person-booth">
                    <b-card no-body>
                        <b-card-body>
                            <b-button type="button" variant="primary" @click="onAddNewCard" size="sm" class="float-right m-2">
                                Add More
                            </b-button>
                            <table class="table table-striped table-responsive-md text-center">
                                <thead>
                                    <tr>
                                        <th>Card Number</th>
                                        <th>
                                            
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="card in form.card_numbers" v-bind:key="card.id">
                                        <td>
                                            <b-form-input v-model="card.card_number" type="text" class="form-control" required></b-form-input>
                                        </td>
                                        <td>
                                            <a href="javascript:void(0)" @click="onRemoveCard(form.card_numbers.indexOf(card))"><i class="fa fa-times text-red fa-2x"></i></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </b-card-body>
                    </b-card>
                </tab-content>

                <tab-content title="Member Sections" icon="fa fa-check">
                    <b-card no-body>
                        <b-card-body>
                            <div class="row">
                                <div class="col-md-3" v-for="section in sections" :key="section.id">
                                    <div class="m-1">
                                        <input type="checkbox" v-model="form.sections" :value="section.id" number> {{ section.name }}
                                    </div>
                                </div>
                            </div>
                        </b-card-body>
                    </b-card>
                </tab-content>
            </form-wizard> 
        </div>
    </b-overlay>
</template>

<script>
    import axios from 'axios';
    import { Form } from 'vform';
    
    export default {
        created(){
            this.loadPage();
        },

        data(){
            return{
                form: new Form({
                    id: "",
                    firstname: "",
                    lastname: "",
                    middlename: "",
                    email: "",
                    phone: "",
                    address: "",
                    state: null,
                    city: null,
                    address: '',
                    member_type: null,
                    card_numbers: [],
                    entrance_date: '',
                    image: '',
                    gender: null,
                    dob: '',
                    educationItems: [],
                    sections: [],
                    membership_id: '',
                }),
                is_busy: false,
                editMode: false,
         
                member_types: [],
                sections: [],
                states: {},
                lgas: {},
                lgah: {},
                gender: [
                    { value: null, text: 'Select Gender' },
                    { value: 'male', text: 'Male' },
                    { value: 'female', text: 'Female' },
                ],
                marital_status: [
                    { value: null, text: '--Select--' },
                    { value: 'Single', text: 'Single' },
                    { value: 'Married', text: 'Married' },
                    { value: 'Widow', text: 'Widow' },
                    { value: 'Widower', text: 'Widower' },
                    { value: 'Divorced', text: 'Divorced' },
                ],

                level: [
                    { value: null, text: '--Select--' },
                    { value: 'High School', text: 'High School' },
                    { value: 'University', text: 'University' },
                ],

                degree: [
                    { value: null, text: '--Select--' },
                    { value: 'BSc', text: 'BSc' },
                    { value: 'MSc', text: 'MSc' },
                    { value: 'MBA', text: 'MBA' },
                    { value: 'PhD', text: 'PhD' },
                    { value: 'Others', text: 'Others' },
                ],
                errors: {},
            }
        },

        methods: {
            onAddNewService(){
                this.form.educationItems.push(this.setServiceModel({}));  
            },

            onAddNewCard(){
                this.form.card_numbers.push(this.setCardModel({}));  
            },

            setServiceModel(model, newModel){
                model.institution = newModel !== undefined ? newModel.institution: '';
                model.level = newModel !== undefined ? newModel.level: null;
                model.degree = newModel !== undefined ? newModel.degree: null;
                return model;
            },

            setCardModel(model, newModel){
                model.card_number = newModel !== undefined ? newModel.card_number: null;
                return model;
            },

            onRemoveService(item_no)
            {
                this.form.educationItems.splice(item_no,1);
            },

            onRemoveCard(item_no)
            {
                this.form.card_numbers.splice(item_no,1);
            },

            loadPage(){
                let id = this.$route.params.id;
                if(id){
                    if(this.is_busy) return;
                    this.is_busy = true;

                    this.editMode = true;
                    axios.get('/members/' + id)
                    .then((response) => {
                        this.form.id = response.data.user.id;
                        this.form.first_name= response.data.member.firstname;
                        this.form.last_name= response.data.member.lastname;
                        this.form.middle_name= response.data.member.middlename;
                        this.form.email= response.data.user.email;
                        this.form.phone= response.data.member.phone;
                        this.form.address= response.data.member.address;
                        this.form.city = response.data.member.city;
                        this.form.state = response.data.member.state;
                        if(this.form.state) {
                            axios.get('/loadLGA/'+ this.form.state) 
                            .then(({data}) => {
                                this.lgah = data;
                                this.form.city= response.data.member.city;
                            })
                        }
                        this.form.member_type= response.data.member.member_type;
                        this.form.entrance_date= response.data.user.entrance_date;
                        this.form.gender= response.data.user.gender;
                        this.form.dob=response.data.user.dob;
                        this.form.card_numbers = response.data.MemberCards;
                        this.form.sections= response.data.MemberSection;
                        this.form.membership_id= response.data.user.unique_id;
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(() => {
                        this.is_busy = false;
                    });
                }

                axios.get('/members/details')
                .then((response) => {
                    this.member_types = response.data.data.member_types;
                    this.sections = response.data.data.sections;
                    this.states = response.data.data.states;
                })
            },

            onChange(event) {
                let id = event.target.value;
                axios.get('/loadLGA/'+id) 
                .then(({data}) => {
                    this.lgas = data;
                })
            },

            uploadImage(e){
                let file = e.target.files[0];
                let reader = new FileReader();
                if(file['size'] < 2388608){
                    reader.onloadend = (file) => {
                        this.form.image = reader.result;
                    }
                    reader.readAsDataURL(file);
                }
                else
                {
                   Swal("Failed!", "Oops, You are uploading a large file, try again. Upload file less that 8MB", "Warning")
                }
            },

            createUser() {
                if(this.is_busy) return;
                this.is_busy = true;
                console.log(this.form)
                this.form.post("/members")

                .then(() => {
                    this.is_busy = false;
                    Swal.fire(
                        "Created!",
                        "Member Created Successfully.",
                        "success"
                    );
                    this.$router.push({path: '/members/'+ this.form.membership_id });
                })

                .catch((err) => {
                    this.errors = err.response.data.errors;
                })
                .finally(() => {
                    this.is_busy = false;
                }); 
            },

            updateUser() {
                if(this.is_busy) return;
                this.is_busy = true;

                axios.put("/members" + this.form.id, this.form)
                .then(() => {
                    Swal.fire("Updated!", "Member Updated Successfully.", "success");
                    this.$router.push({ path: "/members" });
                })

                .catch()
                .finally(() => {
                    this.is_busy = false;
                });
            },
        },
    }  
</script>

<style>
    .wizard-header {
        display:none;
    }
</style>