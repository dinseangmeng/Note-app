<script setup>
import DateNow from '../utils/DataNow'
import Trucate from '../utils/Trucate';
/* add icons to the library */

const prop=defineProps({
  Note:Object
})
// console.log(prop.Note)

const emit=defineEmits(['onDelete','onEdit','TitleClick','download'])
const fireDelete=()=>{
  emit('onDelete');
}
const fireEdit=()=>{
  emit('onEdit');
}
const TitleOnClick=()=>{
  emit('TitleClick');
}
const downloadOnClick=()=>{
  emit('download');
}
</script>
<template>
  
  <div id="container" :style="{ '--Conatiner-Color':Note.color}">
    <div class="header">
      <h2 class="title" @click="TitleOnClick">{{Trucate(Note.title,20,'...')}}</h2>
      <div class="Tool">
        <div class="download" @click="downloadOnClick" title="Download only this note for  sharing or saving">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
          </svg>
        </div>
        <div class="delete" @click="fireDelete" title="Delete this note">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
          </svg>
        </div>
        <div class="edit" @click="fireEdit" title="Edit this note">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg>
        </div>
      </div>
    </div>
    <p class="date">{{Note.date}}</p>
    <p class="infor">{{Trucate(Note.description,80,'...')}}</p>
  </div>
  
</template>

<style lang="scss" scoped>
#container{
  padding: .7rem;
  width: 300px;
  flex-shrink: 1;
  background-color: #d5bdaf;
  box-shadow:0 5px 0px var(--Conatiner-Color) ;
  font-family: 'Sono', sans-serif;
  .date{
    font-size: .7rem;
  }
  .infor{
    font-size: 1rem;
  }
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title{
      cursor: pointer;
    }
    .Tool{
      display: flex;
      gap: 1rem;
      .delete{
        color: red;
        cursor: pointer;
        
      }
      .download{
        color: rgb(44, 142, 228);
        cursor: pointer;
      }
      .edit{
        color: green;
        cursor: pointer;
      }
    }
  }
}
</style>