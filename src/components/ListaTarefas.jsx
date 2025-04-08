import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
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

    let sort_type = localStorage.getItem('sort_type');

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
            localStorage.setItem('task_index', new_task_index);

            const new_tarefas = [...tarefas, nova_tarefa];
            set_tarefas(new_tarefas);
            localStorage.setItem('tasks', JSON.stringify(new_tarefas));

            set_nova_tarefa({
                id: new_task_index,
                title: '',
                description: '',
                sub_tasks: [],
                completed: false,
            });
        }
    };

    const remove_tarefa = (id) => {
        const new_tarefas = [...tarefas].filter((a) => a.id !== id);
        set_tarefas(new_tarefas);
        localStorage.setItem('tasks', JSON.stringify(new_tarefas));
        console.log(JSON.parse(localStorage.getItem('tasks')));
        console.log(new_tarefas);
        console.log(id)

        update();
    };

    function update() {window.location.reload();}

    const sort_tarefas = () => {
        let sorted_tarefas = tarefas;
        switch (sort_type) {
            case 'order_desc':
                sorted_tarefas = tarefas.sort((a, b) => b.id - a.id);
                break;
            case 'order_asc':
                sorted_tarefas = tarefas.sort((a, b) => a.id - b.id);
                break;
            case 'title':
                sorted_tarefas = tarefas.sort((a, b) => a.title.localeCompare(b.title))
                break;
            default: break;
        }
        localStorage.setItem('tasks', JSON.stringify(sorted_tarefas));
        set_tarefas(sorted_tarefas);

        window.location.reload();
    }

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
                                        variant={sort_type == 'order_asc' ? 'primary' : 'outline-primary'}
                                        onClick={() => {
                                            sort_type ='order_asc';
                                            localStorage.setItem('sort_type', sort_type);
                                            sort_tarefas();
                                        }}
                                    >Mais velha</Button>
                                    <Button 
                                        variant={sort_type == 'order_desc' ? 'primary' : 'outline-primary'}
                                        onClick={() => {
                                            sort_type = 'order_desc';
                                            localStorage.setItem('sort_type', sort_type);
                                            sort_tarefas();
                                        }}
                                    >Mais nova</Button>
                                    <Button 
                                        variant={sort_type == 'title' ? 'primary' : 'outline-primary'}
                                        onClick={() => {
                                            sort_type = 'title';
                                            localStorage.setItem('sort_type', sort_type);
                                            sort_tarefas();
                                        }}
                                    >Alfabética</Button>
                                </ButtonGroup>
                                <ul className='p-0 m-2'>
                                    {tarefas.map((tarefa, index) => (
                                        <li key={index}>
                                            <Tarefa tarefa={tarefa} remove_tarefa={remove_tarefa} index={index} />
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