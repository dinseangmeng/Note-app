<script setup>
import DateNow from '../utils/DataNow'
import Trucate from '../utils/Trucate';
/* add icons to the library */

const prop=defineProps({
    Note:Object
})

const emit=defineEmits(['onDelete','onEdit','isClose'])
const fireDelete=()=>{
    emit('onDelete');
}
const fireEdit=()=>{
    emit('onEdit');
}
const close=()=>{
    emit('isClose')
}
</script>

<template>
    <div class="main">
        <button @click="close"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
        </svg></button>
        <div id="container">
            <div class="Header">
                <h1>{{Note.title}}</h1>

            </div>
            <p class="date">{{Note.date}}</p>
            <p class="infor">{{Note.description}}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped> 
.main{
    width: 100vw;
    height: 100%;
    background-color: #edede96f;
    font-family: 'Sono', sans-serif;
    position: absolute;
    top: 0;
    left: 0;
    button{
        position: absolute;
        top:.5rem;
        right: .5rem;
        color: black;
        border: none;
        outline: none  ;
        background-color: transparent;
        cursor: pointer;
        svg{
            --size:1.5rem;
            width: var(--size);
            height: var(--size);
            &:hover{
                color: rgb(255, 48, 48);
            }
            transition: 200ms;
        }
    }
    #container{
        width: 80%;
        background-color: #d5bdaf;
        // opacity: 1 !important;
        position: absolute;
        z-index: 1000;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        .Header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            h1{
                font-size: 1.3rem;
            }
            .Tool{
                display: flex;
                gap: 1rem;
                .delete{
                    color: red;
                    cursor: pointer;
                    margin-right: 1rem;
                    
                }
                .edit{
                    color: green;
                    cursor: pointer;
                }
            }
        }
        .date{
            font-size: .7rem;
        }
    }
}
</style>