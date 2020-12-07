import React from "react";
import "./tasklist.css";
import PropTypes from "prop-types";
import plusIcon from "../../img/plus-icon.svg";

import TaskItem from "../TaskItem/TaskItem";

//import React, { useState } from "react";

//componente tasklist recebendo a props title passada como parametro
export default function TaskList({
  title,
  taskState,
  onAddTask,
  tasks,
  onTaskUpdate,
  onDeleteTask
}) {
  //useState -> funções reacts chamadas de hooks
  //recebe o valor default (inicial) -> zero
  //retornando um valor array com dois elementos e desestruturando com duas variaves
  //count -> estado que vai controlar
  //setCount -> função que atualiza o estado

  //const [count, setCount] = useState(0);

  //função increment quando é chamada executa a função setCount que veio do useState
  //a setCount recebe o parametro currentCount(valor atual) e retorna o parametro com novo valor(o +1)
  /*const increment = () => {
    setCount((currentCount) => {
      return currentCount + 1;
    });
  };*/

  //dentro do return
  /*<div className="content">
    {count}
    <button onClick={increment}>Incrementar</button>
  </div>*/

  //função chama o onAddTaks passando os parametros
  //o taskState vem do TaskList do App.js, para adicionar uma tarefa no estado especifico
  const addTask = () => {
    onAddTask("Nova Tarefa", taskState);
  };

  return (
    <div className="tasklist">
      <div className="title">{title}</div>
      <div className="content">
        {
          //map -> tranformar um elemento em outro (ex: numeros para strings)
          //map task recebe os elementos da lista e retorna um html
          //no html está atribuindo um id unico para cada elemento da lista e está renderizando o titulo
          tasks.map((task) => {
            //return <div key={task.id}>{task.title}</div>;
            return (
              <TaskItem
                key={task.id}
                id={task.id}
                title={task.title}
                taskState={task.state}
                onTaskUpdate={onTaskUpdate}
                onDeleteTask={onDeleteTask}
              />
            );
          })
          //se tasks length for verdadeiro, ou seja, nao ter nenhum registro
          //vai executar a div de lista vazia
        }
        {tasks.length === 0 && <div className="empty-list">Lista Vazia</div>}
        <button onClick={addTask} className="btn">
          <img src={plusIcon} alt="plus" />
          Adicionar Tarefa
        </button>
      </div>
    </div>
  );
}

//biblioteca proptypes para definir os tipos das props
TaskList.propTypes = {
  title: PropTypes.string.isRequired,
  onAddTask: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired
};
