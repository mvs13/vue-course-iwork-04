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
                class="button"
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
// из Vue берём работу с реактивными данными, обработчик события жизненного цикла onMounted
import {ref, onMounted} from 'vue'
// @ - обращение к модулям, определённым внутри папки src
import { supabase } from '@/database'
// todo
const todos = ref([]);

// add todo
const newTodoContenet = ref('')

async function addTodo() {
  const { data, error } = await supabase
    .from('todos')
    .insert([
      {
        content: newTodoContenet.value,
        done: false
      },
    ])
  newTodoContenet.value = ''
}

// delete Todo
async function deleteTodo(id) {
  const { data, error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)
}

//toggle done for todo
async function toggleDone(id) {
  const index4Toggle = todos.value.findIndex(todo => todo.id === id )
  const { data, error } = await supabase
    .from('todos')
    .update({ done: !todos.value[index4Toggle].done })
    .eq('id', id)

  // const index4Toggle = todos.value.findIndex(todo => todo.id === id )
  // можно просто инвертировать не выполняя дополнительной проверки при помощи if
  // todos.value[index4Toggle].done = !todos.value[index4Toggle].done
  // if (todos.value[index4Toggle].done){
  //   todos.value[index4Toggle].done = false  
  // }else{
  //   todos.value[index4Toggle].done = true  
  // }
  // console.log(id)
}

async function getTodos() {
  // https://egaeiimprrzelsjvoevf.supabase.co/rest/v1/todos?select=*&apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnYWVpaW1wcnJ6ZWxzanZvZXZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwNTA3MTMsImV4cCI6MTk5ODYyNjcxM30.NKLq2EHkDH49qYEL1rKR8ZNudW4Z2LS4Nbi30jLCweo
  // Не забыть настроить доступ по чтению к таблице для анонимных пользователей
  const { data } = await supabase
    .from('todos')
    .select('*')
    .order('id', { ascending: false })
  todos.value = data
}

function subscribeOnTodosEvents() {
  const channel = supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'todos'
      },
      (payload) => getTodos()
    )
    .subscribe((status) => {
      // let statusDate = new Date()
      // console.log('Status is : ' + status +'('+statusDate.toUTCString()+')')
    })
}

onMounted(() => {
  getTodos()
  subscribeOnTodosEvents()
})

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