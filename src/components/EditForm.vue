<script setup>
import {ref,computed }from 'vue'
import store  from '../store/index';

const prop=defineProps({
    LABEL:{
        type:String,
        default:"Submit"
    },
    Title:{
        type:String,
        default:''
    },
    Description:{
        type:String,
        default:''
    },
    id:{
        type:String,
        default:''
    },
    COLOR:{
        type:String,
        default:'#000000'
    }
    ,
    adding:{
        type:Boolean,
        default:false
        
    }
    
})
const ColorTheme=ref(prop.COLOR)
// =prop.Title;
// console.log(document.querySelector('.INPUTTITLE'))
const TitleValue=ref(prop.Title)

const DESCRIPTION=ref(prop.Description)
const SaveEdit= (e)=>{
    e.preventDefault();
    if (DESCRIPTION.value!='' || TitleValue.value!=''){
        const note={
            id:prop.id,
            title:TitleValue.value,
            description:DESCRIPTION.value,
            color:ColorTheme
        }
        store.commit('Update', note )
        //  const note
        store.commit('Toggle')
    }
}
const cancelEdit=(e)=>{
    e.preventDefault;
    store.commit('Toggle')
}
const cancelAdd=(e)=>{
    e.preventDefault
    store.state.Adding=!store.state.Adding
}
const SaveAdd=(e)=>{
    
    e.preventDefault
    
    const note={
        title:TitleValue.value,
        description:DESCRIPTION.value,
        color:ColorTheme
    }
    store.commit('addNote', note )
    //  const note
    store.state.Adding=!store.state.Adding
    
}
</script>

<template>
    <form v-if="!adding" @submit="SaveEdit">
        <input type="text" placeholder="Title"  v-model="TitleValue" pattern=".*\S+.*" required >
        <textarea placeholder="Desciption"  v-model="DESCRIPTION" pattern=".*\S+.*" required></textarea>
        <div>
            <input @click="cancelEdit" 
            type="submit" class="cancel" value="Cancel">
            <input 
            type="submit" :value="LABEL">
            
        </div>
        <input type=color v-model="ColorTheme" >
    </form>
    <form v-if="adding" @submit=" SaveAdd">
        <input type="text" placeholder="Title"  v-model="TitleValue" pattern=".*\S+.*" required title="Title can't be empty">
        <textarea placeholder="Desciption"  v-model="DESCRIPTION" pattern=".*\S+.*" required title="Description can't be empty"></textarea>
   
        <div>
            <input @click="cancelAdd" 
            type="submit" class="cancel" value="Cancel">
            <input  
            type="submit" :value="LABEL">
            
        </div>
        <input type=color v-model="ColorTheme" >
    </form>
</template>

<style lang="scss" scoped>
form{
    width: max-content;
    font-family: 'Sono', sans-serif;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    background-color: #d5bdaf;
    border-radius: 3px;
    padding: .5rem;
    position: relative;
    input[type="color"] {
        appearance: none;
        border: none;
        width: 32px;
        height: 32px;
        cursor: pointer;
        
    }
    input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 0;
    }
    input[type="color"]::-webkit-color-swatch {
        border: none;
    }
    div{
        display: flex;
        height: max-content;
        justify-content: center;
        // flex-basis: 100%;
        gap: .5rem;
        input[type='submit']{
            font-family: 'Sono', sans-serif;
            flex-basis: 50%;
            height: max-content;
            padding: .5rem;
            border: none;
            outline: none;
            background-color: rgb(74, 74, 241);
            color: white;
            cursor: pointer;
            
            &:hover{
                background-color: rgb(87, 87, 249);
            }
            
        }
        .cancel{
            background-color: rgb(250, 42, 42) !important;
        }
    }
    input[type='color']{
        width: 100%;
        height: 10px;
    }
    input[type='text']{
        width: 100%;
        padding: .5rem;
        font-family: 'Sono', sans-serif;
        background-color:transparent ;
        border-radius: 2px;
        border: none;
        border-bottom: 1.5px solid black;
        outline: none;
        &::placeholder{
            font-family: 'Sono', sans-serif;
            color: black;
        }
    }
    
    textarea{
        width: 100%;
        background-color: transparent;
        border: none;
        border-bottom: 1.5px solid black;
        font-family: 'Sono', sans-serif;
        outline: none;
        padding: .5rem;
        // resize:vertical ;
        &::placeholder{
            font-family: 'Sono', sans-serif;
            color: black;
        }
        
    }
}
</style>