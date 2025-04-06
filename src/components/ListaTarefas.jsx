import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Tarefa from './Tarefa';

function ListaTarefas() {
    const [task_index, set_task_index] = useState(parseInt(localStorage.getItem('task_index')) || 0);
    const [tarefas, set_tarefas] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
    const [nova_tarefa, set_nova_tarefa] = useState({
        id: task_index,
        title: '',
        description: '',
        sub_tasks: [],
        completed: false,
    });

    const add_tarefa = () => {
        if (nova_tarefa.title.trim() !== '') {
            set_nova_tarefa({
                id: task_index,
                title: nova_tarefa.title,
                description: nova_tarefa.description,
                sub_tasks: [],
                completed: false,
            });

            set_task_index(task_index + 1); //incrementa o estado e o local storage
            localStorage.setItem('task_index', task_index + 1);

            set_tarefas([...tarefas, nova_tarefa]);
            localStorage.setItem('tasks', JSON.stringify([...tarefas, nova_tarefa]));
            set_nova_tarefa({
                id: task_index + 1,
                title: '',
                description: '',
                sub_tasks: [],
                completed: false,
            });
        }
    };

    const remove_tarefa = (index, id) => {
        console.log(index);
        set_tarefas(tarefas.filter((_, i) => i !== index));
        localStorage.setItem('tasks', JSON.stringify(tarefas.filter((_, i) => i !== id)));
    };

    const sort_tarefas = () => {
        //const sorted_tarefas = tarefas.sort((a, b) => b.id - a.id);
        set_tarefas([...tarefas.reverse()]);
        localStorage.setItem('tasks', JSON.stringify([...tarefas]));
        console.log(tarefas);
    }

    return (
        <Container className='mt-5'>
            <Button variant='primary' onClick={sort_tarefas}>Ordenar</Button>
            <Row>
                <Col> 
                    <Container className='text-center, border border-2 rounded-3 p-3'>
                        <h2>Lista de Tarefas</h2>
                        {tarefas.length !== 0 ? (
                            <ul className='p-0 m-2'>
                                {tarefas.map((tarefa, index) => (
                                    <li key={index}>
                                        <Tarefa tarefa={tarefa} remove_tarefa={remove_tarefa} index={index} />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <span className='text-muted'>Nenhuma tarefa cadastrada</span>
                        )}
                    </Container>
                </Col>
                <Col> 
                    <Container>
                        <Form.Control
                            type='text'
                            value={nova_tarefa.title}
                            onChange={(e) => set_nova_tarefa({
                                id: nova_tarefa.id,
                                title: e.target.value,
                                description: nova_tarefa.description,
                                sub_tasks: nova_tarefa.sub_tasks,
                                completed: nova_tarefa.completed,
                            })}
                            placeholder='Digite uma nova tarefa'
                        />
                        <Form.Control
                            as='textarea'
                            type='text'
                            value={nova_tarefa.description}
                            onChange={(e) => set_nova_tarefa({
                                id: nova_tarefa.id,
                                title: nova_tarefa.title,
                                description: e.target.value,
                                sub_tasks: nova_tarefa.sub_tasks,
                                completed: nova_tarefa.completed,
                            })}
                            placeholder='Digite a descrição (opcional)'
                        />
                        <Button variant='primary' onClick={add_tarefa}>Adicionar</Button>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default ListaTarefas;