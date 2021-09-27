<template>
    <v-alert :type="type"
             border="top"
             dismissible>
        {{ message }}
    </v-alert>
</template>

<script>
export default {
    props: ["notification"],
    data() {
        return {
            type: this.notification.type,
            message: this.notification.message,
            timeout:null,
        }
    },
    created() {
        const temp=this;
        this.timeout = setTimeout(()=>{
            this.$store.dispatch("notification/removeNotification", {
                id: temp.notification.id
            });
        },5000);
    },
    beforeDestroy(){
        clearTimeout(this.timeout);
    }
}
</script>

<style></style>
