import { useState } from 'react';

function ListaTarefas() {
    const [tarefas, setTarefas] = useState([]);
    const [novaTarefa, setNovaTarefa] = useState('');

    const adicionarTarefa = () => {
        if (novaTarefa.trim() !== '') {
            setTarefas([...tarefas, novaTarefa]);
            setNovaTarefa('');
        }
    };

    const removerTarefa = (index) => {
        setTarefas(tarefas.filete((_, i) => i !== index));
    };

    return (
        <div>
            <h2>Lista de Tarefas</h2>
            <input 
                type="text"
                value={novaTarefa}
                onChange={(e) => setNovaTarefa(e.target.value)}
                placeholder='Digite uma nova tarefa'
            />
            <button onClick={adicionarTarefa}>Adicionar</button>
            <ul>
                {tarefas.map((tarefa, index) => (
                    <li key={index}>
                        {tarefa} <button onClick={() =>
                            removerTarefa(index)}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaTarefas;