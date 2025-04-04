import { useState } from 'react';

function ListaTarefas() {
    const [tarefas, set_tarefas] = useState([]);
    const [nova_tarefa, set_nova_tarefa] = useState('');

    const add_tarefa = () => {
        if (nova_tarefa.trim() !== '') {
            set_tarefas([...tarefas, nova_tarefa]);
            set_nova_tarefa('');
        }
    };

    const remove_tarefa = (index) => {
        set_tarefas(tarefas.filter((_, i) => i !== index));
    };

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <input
                type='text'
                value={nova_tarefa}
                onChange={(e) => set_nova_tarefa(e.target.value)}
                placeholder='Digite uma nova tarefa'
            />
            <button onClick={add_tarefa}>Adicionar</button>
            <ul>
                {tarefas.map((tarefa, index) => (
                    <li key={index}>
                        {tarefa}
                        <button onClick={() => remove_tarefa(index)}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaTarefas;