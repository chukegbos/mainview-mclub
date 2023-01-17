<template>
<!-- Back Button for accessing previous page -->
<div>
    <!-- <div class="container-div"
        v-if="showButton"
    >
        <button 
            class="btn btn-relief-primary btn-lg" 
            @click.prevent="goBack()"
        >
            <feather-icon
                icon="ArrowLeftIcon"
                class="mr-50"
            />
            GO BACK
        </button>
    </div> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            showButton: true,
            currentRoute: '',
        }
    },
    methods: {
        //go back one page
        goBack() {
            this.$router.go(-1)
        },
        toggleShowButton(val) {
            switch (val) {
                case 'LandingPage':
                    this.showButton = false
                    break;

                case 'Dashboard':
                    this.showButton = false
                    break;
            
                default:
                    this.showButton = true
                    break;
            }
        }
    },
    mounted() {
        this.currentRoute = this.$route.name
        // console.log(this.currentRoute)
        this.toggleShowButton(this.currentRoute)
    }
}
</script>

<style scoped>
.container-div {
    padding: 2px;
    display: inline-block;
}

.container-div button {
    color: white;
}
</style>>

</style>