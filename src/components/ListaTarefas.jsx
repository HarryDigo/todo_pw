import { useState } from 'react';

function ListaTarefas() {
    const [tarefas, set_tarefas] = useState([]);
    const [nova_tarefa, set_nova_tarefa] = useState({
        title: '',
        description: '',
        sub_tasks: [],
    });

    const add_tarefa = () => {
        if (nova_tarefa.title.trim() !== '') {
            set_tarefas([...tarefas, nova_tarefa]);
            set_nova_tarefa({
                title: '',
                description: '',
                sub_tasks: [],
            });
        }
    };

    const remove_tarefa = (index) => {
        set_tarefas(tarefas.filter((_, i) => i !== index));
    };

    return (
        <div>
            <h2>Lista de Tarefas</h2>
            <input
                type='text'
                value={nova_tarefa.title}
                onChange={(e) => set_nova_tarefa({
                    title: e.target.value,
                    description: nova_tarefa.description,
                    sub_tasks: [],
                })}
                placeholder='Digite uma nova tarefa'
            />
            <input
                type='text'
                value={nova_tarefa.description}
                onChange={(e) => set_nova_tarefa({
                    title: nova_tarefa.title,
                    description: e.target.value,
                    sub_tasks: [],
                })}
                placeholder='Digite a descrição'
            />
            <button onClick={add_tarefa}>Adicionar</button>
            <ul>
                {tarefas.map((tarefa, index) => (
                    
                    <li key={index}> {/*Exemplo teste, será transformado em componente próprio*/}
                        <h3>{tarefa.title}</h3>
                        <p>{tarefa.description ? tarefa.description : null}</p>
                        <button onClick={() => remove_tarefa(index)}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaTarefas;