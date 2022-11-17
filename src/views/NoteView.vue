<script setup>
  import Card from '../components/Card.vue'
  import EditForm from '../components/EditForm.vue'
  import store from '../store';
  import POPUP from '../components/POPUP.vue'
  import {ref} from 'vue'

  const isOpen=ref(false)
  const note=ref()
const TitleClicked=(id)=>{
 note.value=(store.getters.getNote(id))
 isOpen.value=true

}
const closing=()=>{
  note.value={}
  isOpen.value=false

}
const deleting=(id)=>{
  store.commit('DeleteNote',id)
 
}
const Download=(id)=>{
  const NOTE=store.getters.getNote(id)
  const blob=new Blob([JSON.stringify(NOTE)],{type:'application/json'}   )
    const link= URL.createObjectURL(blob)
    var element = document.createElement('a');
    element.setAttribute('href',link);
    element.setAttribute('download', `${NOTE.id}.MENG`);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    URL.revokeObjectURL(link)
    document.body.removeChild(element);

}
</script>
 
<template>
  <main :id="isOpen? 'StopScroll' : ''">
    <button id="New" @click="$store.state.Adding=true">Note <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-plus" viewBox="0 0 16 16">
  <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"/>
  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
  </svg></button>

    <div  v-for="note in $store.state.Notes" :key="note.id">
      <Card v-if="!note.isEditing"
      :Note="note"
      @TitleClick="TitleClicked(note.id)"
       @onDelete="deleting(note.id)"
       @onEdit="$store.commit('Toggle',note.id)"
       @download="Download(note.id)"
       />
       
      <EditForm v-else 
      :Title="note.title" 
      :Description="note.description"
      :COLOR="note.color"
      
      LABEL="Save"
      :id="note.id"
      />
      
    </div>
    <EditForm v-if="$store.state.Adding" :adding="true"
      />
    <POPUP 
    v-if="isOpen" 

    @isClose="closing"
    :Note="note"
    @onDelete="$store.commit('DeleteNote',note.id)"

    />
  </main>
</template>
<style lang="scss" scoped>
#StopScroll{
  overflow: hidden;
}
main{
  width: 100vw;
  padding: 3rem .7rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: .7rem;
  // position: relative;
  position:initial;
  background-color: #edede9;
  // margin-bottom: 1rem;
}
button{
  padding: .5rem;
  position: absolute;
  top: 104px;
  @media only screen and (max-width: 350px){
    top: 130px;
  }
  right: 1rem;
  background: rgb(49, 49, 250);
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  font-family: 'Sono', sans-serif;
  color: white;
  cursor: pointer;
}
</style>