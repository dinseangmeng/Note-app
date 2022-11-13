<script setup>

</script>
<template>
    <header>
        <div id="container">
            <center>
                
                <div id="Profile"><img src="../assets/images/Profile.png" alt="Profile"></div>
            </center>
            
            <div id="content">
                <router-link class="link" :to="{name:'home'}" >Home</router-link>
                <router-link class="link" :to="{name:'about'}" >About</router-link>
            </div>
            
        </div>
    </header>
</template>

<style lang="scss" scoped>
header{
    font-family: 'Sono', sans-serif;
    width: 100%;
    height: fit-content;
    display: flex;
    background-color: #d6ccc2;
    justify-content: center;
    align-items: center;
}
#container{
    width: 80%;
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @media only screen and (max-width: 350px){
        justify-content: center;
    }
    align-items: center;
}
#Profile img{
    width: 5rem;
}
#content{
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    a{
        text-decoration: none; 
        color: black;
        font-size: 1.2rem;
    }
    .router-link-active{
        text-decoration: underline;
    }
}
</style>