<script setup>
import {useRoute} from 'vue-router'
import {ref,onMounted,computed} from 'vue'
import { v4 as uuidv4 } from 'uuid';
import store from '../store/index'
const file=ref(null)
const actuallFile=ref(null)
const isOpen=ref(false)
const allowInput=ref(false)

const isInput=ref(false)
const Nav=ref(null)
const isHomePage=computed(()=>{
    return useRoute().path==='/'?true:false;
})
// console.log(Nav)
const toggleInput=()=>{
    allowInput.value=!allowInput.value
    isOpen.value=false
}
var filename=ref(null)

const Close=()=>{
    allowInput.value=false
    isOpen.value=false
    actuallFile.value=null
    filename.value=null
}

    // console.log(is)
    // console.log(isHomePage.value)
    document.addEventListener('dragover',(e)=>{
        e.preventDefault();
            e.stopPropagation();
        if(isHomePage.value){


            allowInput.value=true;
        }
        // alert("i")
    })
    document.addEventListener('drop',(e)=>{
        e.preventDefault();
            e.stopPropagation();
        if(isHomePage.value){
            filename.value=e.dataTransfer.files[0].name
            // file.value=e.dataTransfer.files
            actuallFile.value=e.dataTransfer.files[0]
            // console.log(e.dataTransfer.files[0])
            isInput.value=true
        }
    
    })
    document.addEventListener('paste',(e)=>{
        if(e.clipboardData.files.length>0){

            // console.log(e)
            e.preventDefault();
                e.stopPropagation();
            if(isHomePage.value){
                filename.value=e.clipboardData.files[0].name
                // file.value=e.dataTransfer.files
                actuallFile.value=e.clipboardData.files[0]
                // console.log(e.dataTransfer.files[0])
                isInput.value=true
                allowInput.value=true;
            }
        }
 
    
    })



const isAllowFile=(file)=>{
    if(file){
        const arr= file.name.split('.')
        if(arr[arr.length-1]=='MENG') return true
    }
       return false
}

const passValue=async (file)=> {
    if(!isAllowFile(file))  {
        allowInput.value=!allowInput.value;
        filename.value=''
        return 0
    }
    if(isInput.value){
        // console.log(file)
        
        var json = JSON.parse(await file.text());
            try{
                json=json.filter((item)=>{
                    item.id=uuidv4();
                    return item;
                })
   
                    store.state.Notes=[...json,...store.state.Notes];
        
            }catch(err){
                json.id=uuidv4();
                store.state.Notes=[json,...store.state.Notes];
                
            }
            localStorage.setItem('Noted',JSON.stringify(store.state.Notes))
            allowInput.value=!allowInput.value;
            filename.value=''
        }
        
    }
    
    const getContent= ()=>{
        filename.value=file.value.files[0].name;
        actuallFile.value=file.value.files[0]
        isInput.value=true;
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
        <div id="container" ref="Nav">
            
            <div id="Profile"><img src="../assets/images/Profile.png" alt="Profile"></div>
            <div id="content">
                <router-link class="link" :to="{name:'home'}" >Home</router-link>
                <router-link class="link" :to="{name:'about'}" >About</router-link>
                <button class="fileToggle" v-if="isHomePage"> <p @click="isOpen=!isOpen" >File</p> 
                    <div class="data_toggle" v-if="isOpen">
                        <button @click="Save" title="Download All note to local for saving of sharing">Save</button>
                        <button @click="toggleInput(true)" title="Add more note from file on your file">Import</button>
                        <!-- <button @click="toggleInput(false)" title="Overwrite all your note with note in file">Open</button> -->
                    </div>
                </button>
            </div>
            
        </div>
        <div v-if="allowInput && isHomePage" id="getInput"> 
            <div class="getInput">
                <div >
                    <h1>Input json file</h1>
                    <svg @click="Close" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </div>
                <input type="file" ref="file" accept=".MENG"  @change="getContent()" id="inputfile">
                <label for="inputfile" :style="! isAllowFile(actuallFile) && filename!=null ?{'border':'2px solid red'}:''">Upload File
                    <br>
                    <p v-if="filename!=null" :style="! isAllowFile(actuallFile) && filename!=null?{'color':'red'}:''" >{{isAllowFile(actuallFile) && filename!=null ? filename :"File no support"}} </p>
                    <p v-else  >{{ filename}} </p>
 
                </label>
                <input  type="submit" :disabled="!isAllowFile(actuallFile) && filename!=null" :style="! isAllowFile(actuallFile)&& filename!=null?{'background-color':'red'}:''"  @click="passValue(actuallFile)" value="Submit">

                
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
input:disabled {
    background-color: rgb(216, 216, 216) !important;
    color: rgb(151, 151, 151) !important;
  cursor: not-allowed !important;
  pointer-events: all !important;
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