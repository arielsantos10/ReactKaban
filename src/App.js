import React, { useState } from "react";
import "./styles.css";

import Navbar from "./components/Navbar/Navbar";
import TaskList from "./components/TaskList/TaskList";

//função para gerar um novo id (vai acumulando no let idAcc)
let idAcc = 0;
const generateId = () => {
  idAcc = idAcc + 1;
  return idAcc;
};

export default function App() {
  const [tasks, setTasks] = useState([]);

  //addTask recebe os dois parametros e declara uma nova tarefa
  const addTask = (title, state) => {
    const newTask = {
      id: generateId(),
      title,
      state
    };
    //recebe a função de tarefa existentes e retorna uma nova lista(novo estado)
    //dentro está as tarefas existente, utilizando o operador para desestruturar os elementos do array existingTasks e adicionar um novo array
    setTasks((existingTasks) => {
      return [...existingTasks, newTask];
    });
  };

  //recebe os parametros e tenta achar a tarefa numa lista, e se achar vai atualizar
  //map recebe uma tarefa por vez
  //verifica se o id da tarefa é igual o id passado no parametro da função
  //retorna todos os parametros da task e sobrescreve o title e state (id continua o mesmo)
  //se não retorna a task sem atualizar
  const updateTask = (id, title, state) => {
    setTasks((existingTasks) => {
      return existingTasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, state };
        } else {
          return task;
        }
      });
    });
  };

  //existingTasks retorna um novo estado
  //método filter -> filtra a lista de tarefas que já existe
  //e permanece as tasks que são diferentes do id passado
  const deleteTask = (id) => {
    setTasks((existingTasks) => {
      return existingTasks.filter((task) => task.id !== id);
    });
  };

  return (
    //método filter -> recebe um parametro(t) e filtra as tasks pelo estado
    <div className="App">
      <Navbar />
      <div className="container">
        <TaskList
          title="Pendente"
          onAddTask={addTask}
          taskState="Pendente"
          tasks={tasks.filter((t) => t.state === "Pendente")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
        <TaskList
          title="Fazendo"
          onAddTask={addTask}
          taskState="Fazendo"
          tasks={tasks.filter((t) => t.state === "Fazendo")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
        <TaskList
          title="Completa"
          onAddTask={addTask}
          taskState="Completa"
          tasks={tasks.filter((t) => t.state === "Completa")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
}
