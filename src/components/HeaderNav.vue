<script setup>
import {ref} from 'vue'

import store from '../store/index'
const file=ref(null)

const isOpen=ref(false)
const allowInput=ref(false)
const toggleInput=()=>{
    allowInput.value=!allowInput.value
    isOpen.value=false
}
var filename=ref(null)


const extractName=(fullPath)=>{
    if (fullPath) {
    var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
    filename.value = fullPath.substring(startIndex);
    if (filename.value.indexOf('\\') === 0 || filename.value.indexOf('/') === 0) {
        filename.value = filename.value.substring(1);
    }
    
}
}
const passValue=async (file)=> {
    
        const json = JSON.parse(await file.files[0].text());
        // console.log("json", json);
        store.state.Notes=json;
        localStorage.setItem('Noted',JSON.stringify(store.state.Notes))
        allowInput.value=!allowInput.value;
        filename.value=''

}

const Save=()=>{
    const blob=new Blob([JSON.stringify(store.state.Notes)],{type:'application/json'}   )
    const link= URL.createObjectURL(blob)
    var element = document.createElement('a');
    element.setAttribute('href',link);
    element.setAttribute('download', 'Dinseangmeng_Noteapp.MENG');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    URL.revokeObjectURL(link)
    document.body.removeChild(element);
    isOpen.value=false
}
</script>
<template>
    <header>
        <div id="container">
            
            <div id="Profile"><img src="../assets/images/Profile.png" alt="Profile"></div>
            
            
            
            <div id="content">
                <router-link class="link" :to="{name:'home'}" >Home</router-link>
                <router-link class="link" :to="{name:'about'}" >About</router-link>
                <button class="fileToggle" > <p @click="isOpen=!isOpen">File</p> 
                    <div class="data_toggle" v-if="isOpen">
                        <button @click="Save">Save</button>
                        <button @click="toggleInput">Open</button>
                    </div>
                </button>
            </div>
            
        </div>
        <div v-if="allowInput" id="getInput"> 
            <div class="getInput">
                <div >
                    <h1>Input json file</h1>
                    <svg @click="allowInput=!allowInput" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </div>
                <input type="file" ref="file" accept=".MENG"  @change="extractName(file.value)" id="inputfile">
                <label for="inputfile" >Upload Images
                    <br>
                    <p >{{filename}}</p>
                </label>
                <input type="submit" @click="passValue(file)" value="Submit">
                
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
    display: block;
    padding: .4rem 0;
    
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
    .fileToggle{
        border: none;
        font-family: 'Sono', sans-serif;
        padding: 0 .5rem;
        color: black;
        font-size: 1.2rem;
        outline: none;
        background-color: #edede9;
        border-radius: 2px;
        position: relative;
        cursor: pointer;
        .data_toggle{
            // background-color: #edede9;
            display: flex;
            gap: .3rem;
            flex-direction: column;
            position: absolute;
            width: 100%;
            z-index: 99999;
            top: 110%;
            left: 0;
            button{
                width: 100%;
                padding: .3rem .7rem;
            }
        }
        
    }
}
#getInput {
    width: 100%;
    height: 100vh;
    background-color: #edede9bb;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99999;
    .getInput{
        display: flex;

        flex-direction: column;
        gap: .7rem;
        align-items: center;
        background-color: #d6ccc2;
        padding: 1rem;
        border-radius: 3px;
        div{
            width: 100%;
            gap: 3rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            h1{
                font-size: 1.3rem;
            }
            svg{
                cursor: pointer;
                transition: 200ms;
                &:hover{
                    color: rgb(55, 55, 255);
                }
            }
        }
        #inputfile{
            display: none;
        }
        label{
            padding: .3rem 1rem;
            border: 2px rgb(49, 49, 250) solid;
            cursor: pointer;
            text-align: center;
        }
        input[type='submit']{
            padding: .3rem;
            width: 100%;
            border: none;
            outline: none;
            background-color: rgb(49, 49, 250);
            color: white;
            font-family: 'Sono', sans-serif;
            font-size: 1.2rem;
            border-radius: 2px;
            cursor: pointer;

        }
    }
}

</style>