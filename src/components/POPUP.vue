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

const ClickeOutside=(e)=>{
    const target=e.target;
    if(target.className=="main"){
        close()
    }
}
</script>

<template>
    <div class="main" @click="ClickeOutside">
        
        <div id="container">
            <button @click="close"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
            </svg></button>
            <div class="Header">
                <h1>{{Note.title}}</h1>
                
            </div>
            <p class="date">{{Note.date}}</p>
            <textarea class="infor" readonly :value="Note.description"></textarea>
        </div>
    </div>
</template>

<style lang="scss" scoped> 
.main{
    width: 100vw;
    height: 100vh;
    background-color: #edede96f;
    font-family: 'Sono', sans-serif;
    position:fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 10000000;
    
    #container{
        // width: max-content;
        background-color: #d5bdaf;
        // opacity: 1 !important;
        position: fixed;
        z-index: 1000;
        padding: .7rem;
        padding-top:2rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        
        button{
            position: fixed;
            top:1rem;
            right: 1rem;
            color: black;
            border: none;
            outline: none  ;
            z-index: 9999;
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
        .Header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            // width: 100%;
            h1{
                font-size: 1.3rem;
                // overflow-wrap: break-word;
                // word-wrap:break-word;
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
        .infor{
            font-family: 'Sono', sans-serif;
            
        }
        textarea{
            width: 80vw;
            height:  40vh;
            background-color: transparent;
            border: none;
            outline: none;
            // resize: vertical;
            &::-webkit-scrollbar {
                width: 5px;
                
                
            }
            &::-webkit-scrollbar-track{
                background: black;
                border-radius: 999px;
            }
            &::-webkit-scrollbar-thumb{
                background: #d6ccc2;
                border-radius: 999px;
            }
        }
        .date{
            font-size: .7rem;
            margin:  .3rem 0;
        }
    }
}
</style>