import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

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
        <Container fluid='md' className='border border-2 rounded-3 p-3'>
            <Row>
                <Col> 
                    <Form.Control
                        type='text'
                        value={nova_tarefa.title}
                        onChange={(e) => set_nova_tarefa({
                            title: e.target.value,
                            description: nova_tarefa.description,
                            sub_tasks: [],
                        })}
                        placeholder='Digite uma nova tarefa'
                    />
                    <Form.Control
                        as='textarea'
                        type='text'
                        value={nova_tarefa.description}
                        onChange={(e) => set_nova_tarefa({
                            title: nova_tarefa.title,
                            description: e.target.value,
                            sub_tasks: [],
                        })}
                        placeholder='Digite a descrição'
                    />
                    <Button onClick={add_tarefa}>Adicionar</Button>
                </Col>
                <Col> 
                    <h2>Lista de Tarefas</h2>
                    <ul>
                        {tarefas.map((tarefa, index) => (
                            
                            <li key={index}> {/*Exemplo teste, será transformado em componente próprio*/}
                                <h3>{tarefa.title}</h3>
                                <p>{tarefa.description ? tarefa.description : null}</p>
                                <Button onClick={() => remove_tarefa(index)}>Remover</Button>
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}

export default ListaTarefas;