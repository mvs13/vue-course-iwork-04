<template>
  <div class="wrapper-todo">
    
    <h1 class="title has-text-centered mb-5">MVS`s ToDo List</h1>
    
    <form 
      @submit.prevent="addTodo"
    >
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input 
            v-model="newTodoContenet"
            class="input" type="text" placeholder="Add todo"
          >
        </p>
        <p class="control">
          <button
            :disabled="!newTodoContenet"
            class="button is-info">
            Add
          </button>
        </p>
      </div>
    </form>
    
    <div v-for="todo in todos" :key="todo.id" class="card mb-5">
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column">
              {{ todo.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button class="button is-light">&check;</button>
              <button class="button is-danger ml-2">&cross;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import
import {ref} from 'vue'
import { v4 as uuidv4 } from 'uuid';
// todo
const todos = ref([
  // {
  //   id: 'id01',
  //   content: 'Make fist card',
  //   done: false
  // },
  // {
  //   id: 'id02',
  //   content: 'Make cards list',
  //   done: false
  // }
]);

// add todo
const newTodoContenet = ref('')

const addTodo = () => {
  const newTodo = {
    id: uuidv4(),
    content: newTodoContenet.value,
    done: false
  }
  todos.value.unshift(newTodo)
  newTodoContenet.value = ''
  // console.log(newTodo)
}
</script>

<style>
@import 'bulma/css/bulma.min.css';
.wrapper-todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
</style>