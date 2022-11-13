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
    adding:{
        type:Boolean,
        default:false

    }
    
})
// =prop.Title;
// console.log(document.querySelector('.INPUTTITLE'))
const TitleValue=ref(prop.Title)

const DESCRIPTION=ref(prop.Description)
const SaveEdit= (e)=>{
    e.preventDefault();
    const note={
        id:prop.id,
        title:TitleValue.value,
        description:DESCRIPTION.value
    }
    store.commit('Update', note )
    //  const note
    store.commit('Toggle')
}
const cancelEdit=(e)=>{
    e.preventDefault;
    store.commit('Toggle')
}
const cancelAdd=(e)=>{
    e.preventDefault
    store.state.Adding=!store.state.Adding
}
const SaveAdd=()=>{
    const note={
        title:TitleValue.value,
        description:DESCRIPTION.value
    }
    store.commit('addNote', note )
    //  const note
    store.state.Adding=!store.state.Adding
}
</script>

<template>
    <form v-if="!adding">
        <input type="text" placeholder="Title"  v-model="TitleValue" >
        <textarea placeholder="Desciption"  v-model="DESCRIPTION"></textarea>
        <div>
            <input @click="cancelEdit" 
            type="submit" class="cancel" value="Cancel">
            <input @click=" SaveEdit" 
            type="submit" :value="LABEL">
            
        </div>
    </form>
    <form v-if="adding">
        <input type="text" placeholder="Title"  v-model="TitleValue" >
        <textarea placeholder="Desciption"  v-model="DESCRIPTION"></textarea>
        <div>
            <input @click="cancelAdd" 
            type="submit" class="cancel" value="Cancel">
            <input @click=" SaveAdd" 
            type="submit" :value="LABEL">
            
        </div>
    </form>
</template>

<style lang="scss" scoped>
form{
    width: 300px;
    font-family: 'Sono', sans-serif;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    background-color: #d5bdaf;
    border-radius: 3px;
    padding: .5rem;
    div{
        display: flex;
        justify-content: space-between;
        flex-basis: 100%;
        gap: .5rem;
        input[type='submit']{
            font-family: 'Sono', sans-serif;
            flex-basis: 50%;
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
        resize:vertical ;
        &::placeholder{
            font-family: 'Sono', sans-serif;
            color: black;
        }
        
    }
}
</style>