import { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Tarefa from './Tarefa';

function ListaTarefas() {
    const teste = JSON.parse(localStorage.getItem('tasks'))
    const [tarefas, set_tarefas] = useState(teste === null ? [] : teste);
    const [task_index, set_task_index] = useState(parseInt(localStorage.getItem('task_index')) || 0);
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

            const new_task_index = task_index + 1;
            set_task_index(new_task_index);

            set_tarefas([...tarefas, nova_tarefa])

            set_nova_tarefa({
                id: new_task_index,
                title: '',
                description: '',
                sub_tasks: [],
                completed: false,
            });
        }
    };

    const complete_tarefa = (id) => {
        set_tarefas(tarefas.map((tarefa) => 
            tarefa.id === id ? {
                ...tarefa,
                completed: !tarefa.completed
            } :
            tarefa
        ))
    }

    const remove_tarefa = (id) => {
        set_tarefas(tarefas.filter((tarefa) => id !== tarefa.id))
    };

    const set_subtarefas = (id, updated_tarefa) => {
        set_tarefas(tarefas.map((tarefa) => 
            tarefa.id === id ?
            updated_tarefa :
            tarefa
        ))
    }

    const sort_tarefas = (type) => {
        switch (type) {
            case 'order_desc':
                set_tarefas([...tarefas].sort((a, b) => b.id - a.id));
                break;
            case 'order_asc':
                set_tarefas([...tarefas].sort((a, b) => a.id - b.id));
                break;
            case 'title':
                set_tarefas([...tarefas].sort((a, b) => a.title.localeCompare(b.title)))
                break;
            default: break;
        }
    }

    useEffect(() => localStorage.setItem('tasks', JSON.stringify(tarefas)), [tarefas])

    useEffect(() => localStorage.setItem('task_index', JSON.stringify(task_index)), [task_index])

    return (
        <Container className='mt-5'>
            <Row>
                <Col> 
                    <Container className='text-center, border border-2 rounded-3 p-3'>
                        <h2>Lista de Tarefas</h2>
                        {tarefas.length !== 0 ? (
                            <>
                                <span className='ms-2 fs-5' as='h1'>Ordem:</span>
                                <ButtonGroup className='m-2'>
                                    <Button 
                                        variant='outline-primary'
                                        onClick={() => sort_tarefas('order_asc')}
                                    >Mais velha</Button>
                                    <Button 
                                        variant='outline-primary'
                                        onClick={() => sort_tarefas('order_desc')}
                                    >Mais nova</Button>
                                    <Button 
                                        variant='outline-primary'
                                        onClick={() => sort_tarefas('title')}
                                    >Alfabética</Button>
                                </ButtonGroup>
                                <ul className='p-0 m-2'>
                                    {tarefas.map((tarefa, index) => (
                                        <li key={index}>
                                            <Tarefa 
                                                tarefa={tarefa} 
                                                set_subtarefas={set_subtarefas}
                                                complete_tarefa={complete_tarefa} 
                                                remove_tarefa={remove_tarefa}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <span className='text-muted'>Nenhuma tarefa cadastrada</span>
                        )}
                    </Container>
                </Col>
                <Col> 
                    <Container className='text-center, border border-2 rounded-3 p-3'>
                        <h2>Nova tarefa</h2>
                        <div className='p-2 mt-2'>
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
                                placeholder='Digite o título'
                            />
                            <Form.Control
                            className='my-2'
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
                        </div>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default ListaTarefas;