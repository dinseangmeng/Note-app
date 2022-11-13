<script setup>
import DateNow from '../utils/DataNow'
import Trucate from '../utils/Trucate';
/* add icons to the library */

const prop=defineProps({
  Title:{
    type:String,
    default:"Title"
  },
  CreateDate:{
    type:String,
    default:DateNow()
  },
  Description:{
    type:String,
    default:'Description'
  }
})

const emit=defineEmits(['onDelete','onEdit','TitleClick'])
const fireDelete=()=>{
  emit('onDelete');
}
const fireEdit=()=>{
  emit('onEdit');
}
const TitleOnClick=()=>{
  emit('TitleClick');
}
</script>
<template>
  
  <div id="container">
    <div class="header">
      <h2 class="title" @click="TitleOnClick">{{Title}}</h2>
      <div class="Tool">
        <div class="delete" @click="fireDelete">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
          </svg>
        </div>
        <div class="edit" @click="fireEdit">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg>
        </div>
      </div>
    </div>
    <p class="date">{{CreateDate}}</p>
    <p class="infor">{{Trucate(Description,80,'...')}}</p>
  </div>
  
</template>

<style lang="scss" scoped>
#container{
  padding: .7rem;
  width: 300px;
  flex-shrink: 1;
  background-color: #d5bdaf;
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
      .edit{
        color: green;
        cursor: pointer;
      }
    }
  }
}
</style>