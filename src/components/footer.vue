<script setup>
const year=(new Date).getFullYear()

</script>
<template>
    <div id="footer">
        © Copy right {{year}} By  <a href="https://www.dinseangmeng.xyz" target="_blank">DINSEANGMENG</a>
    </div>
</template>

<style lang="scss" scoped>
    #footer{
        width: 100%;
        text-align: center;
        background-color: #d6ccc2;
        font-family: 'Sono', sans-serif;
        padding: .7rem 0;
        margin-top: auto;
        a{
            text-decoration: none;
            color: black;
        }
    }

</style>