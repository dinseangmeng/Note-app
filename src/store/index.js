import { createStore } from 'vuex'
import DateNow from '../utils/DataNow'
import uniqid from 'uniqid';
// Create a new store instance.
const store = createStore({
  state :{
    Adding:false,
    Notes:localStorage.getItem('Noted')!=null?JSON.parse(localStorage.getItem('Noted')):[
      // {
      //   id:'1',
      //   isEditing:false,
      //   title:'Math',
      //   description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type ",
      //   date:DateNow()
      // },   
      //    {
      //   id:'2',
      //   isEditing:false,
      //   title:'Math',
      //   description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type ",
      //   date:DateNow()
      // },      {
      //   id:'3',
      //   isEditing:false,
      //   title:'Math',
      //   description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type ",
      //   date:DateNow()
      // }
    ]
  },
  mutations: {
    addNote(state,Note){
      Note.id=uniqid();
      Note.date=DateNow();
      state.Notes=[...state.Notes,Note]
      localStorage.setItem('Noted',JSON.stringify(state.Notes))
    },
    DeleteNote(state,id){
      state.Notes=state.Notes.filter((note)=>{
        if(note.id!=id){
          return note
        }
      })
      localStorage.setItem('Noted',JSON.stringify(state.Notes))
    },
    Toggle(state,id){
      state.Notes=state.Notes.filter((note)=>{
        if(note.id==id){
          note.isEditing=!note.isEditing;
          return note
        }
        note.isEditing=false;
        return note;
      })
      localStorage.setItem('Noted',JSON.stringify(state.Notes))
    },
    Update(state,note){
      console.log(note)
      state.Notes=state.Notes.filter((item)=>{
        if(item.id==note.id){
          item.title=note.title;
          item.description=note.description;
          return item
        }
        return item;
      })
      localStorage.setItem('Noted',JSON.stringify(state.Notes))
    },
  


  },
  getters:{
    getNote:(state)=>(id)=>{

      const  note= state.Notes.find((note)=>note.id==id)
      return JSON.parse(JSON.stringify(note))
       
    }
  }

})
export default store


// Install the store instance as a plugin
