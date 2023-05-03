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
    
    <!-- 
      Использование :class позволит добавлять форматирование, описанное классом has-background-success-light,
      при условии, что элемент списка todos, будет помечен, как выполненный todo.done: true 
    -->
    <div
      v-for="todo in todos" :key="todo.id"
      class="card mb-5"
      :class="{'has-background-success-light':todo.done}"
      >
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div
              class="column"
              :class="{'has-text-success line-through' : todo.done}"
              >
              {{ todo.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button
                class="button is-light"
                :class="todo.done ? 'is-success' : 'is-light'"
                @click="toggleDone(todo.id)"
                >
                  &check;
                </button>
              <button
                @click="deleteTodo(todo.id)"
                class="button is-danger ml-2"
                >
                &cross;
              </button>
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
const todos = ref([]);

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

// delete Todo
const deleteTodo = (id) => {
  todos.value = todos.value.filter((todo) => todo.id !== id)
  // console.log(id)
}

//toggle done for todo
const toggleDone = (id) => {
  const index4Toggle = todos.value.findIndex(todo => todo.id === id )
  // можно просто инвертировать не выполняя дополнительной проверки при помощи if
  todos.value[index4Toggle].done = !todos.value[index4Toggle].done
  // if (todos.value[index4Toggle].done){
  //   todos.value[index4Toggle].done = false  
  // }else{
  //   todos.value[index4Toggle].done = true  
  // }
  // console.log(id)
}
</script>

<style>
@import 'bulma/css/bulma.min.css';
.wrapper-todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
.line-through {
  text-decoration: line-through;
}
</style>