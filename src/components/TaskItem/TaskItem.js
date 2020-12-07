import React, { useState } from "react";
import PropTypes from "prop-types";
import "./task-item.css";

export default function TaskItem({
  id,
  title,
  taskState,
  onTaskUpdate,
  onDeleteTask
}) {
  //isEditing -> flag(chave) para controlar o estado da tarefa (quando está exibindo ou editando)
  //setIsEditing -> método que faz a alteração da flag
  //false -> ta sempre como display(mostrando a tarefa) e quando clicar vai mostrar com input
  const [isEditing, setIsEditing] = useState(false);

  const [editableTitle, setEditableTitle] = useState(title);

  //event -> traz a nova versão que foi inserida no input
  //atribui o texto do input para o newTitle
  //passa o valor para o setEditableTitle
  const onTitleChange = (event) => {
    const newTitle = event.target.value;
    setEditableTitle(newTitle);
    //chama o onTaskUpdade sempre que o titulo mudar
    onTaskUpdate(id, newTitle, taskState);
  };

  //verificar se a tecla enter foi apertada
  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      //após clicar no enter, verifica se o campo editableTitle está vazio
      //se estiver vazio, chama o onDeleteTask passando o id
      if (editableTitle.length === 0) {
        onDeleteTask(id);
      }
    }
  };

  //função chama o método onTaskUpdate passando os parametros id, title e o novo estado da tarefa
  const onTaskStateChange = (event) => {
    onTaskUpdate(id, title, event.target.value);
  };

  if (isEditing) {
    //onChange -> monitora as mudanças do input e avisa o componente react
    return (
      <div className="task-item">
        <input
          type="text"
          value={editableTitle}
          onChange={onTitleChange}
          onKeyPress={onKeyPress}
        />
      </div>
    );
  } else {
    //onClick recebe um evento e executa a função setIsEditing
    return (
      //select usa o onChange para chamar a função onTaskStateChange
      //o valor do select é o valor do estado atual da tarefa
      <div className="task-item">
        <div onClick={(e) => setIsEditing(true)}>{editableTitle}</div>
        <select onChange={onTaskStateChange} value={taskState}>
          <option value="Pendente">Pendente</option>
          <option value="Fazendo">Fazendo</option>
          <option value="Completa">Completa</option>
        </select>
      </div>
    );
  }
}

//biblioteca proptypes para definir os tipos das props
TaskItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  taskState: PropTypes.string.isRequired
};
