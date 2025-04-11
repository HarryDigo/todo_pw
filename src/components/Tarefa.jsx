import { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';

//imports dos meus icones
import add from '../assets/add.svg';
import check from '../assets/check.svg';
import collapse from '../assets/collapse.svg';
import expand from '../assets/expand.svg';
import remove from '../assets/remove.svg';

function Tarefa({ tarefa, set_subtarefas, complete_tarefa, remove_tarefa }) {
    //estados essenciais de tarefa, subtarefa, e nova subtarefa=
    const [nova_subtarefa, set_nova_subtarefa] = useState({ //estado da nova subtarefa
        completed: false,
        text: '',
    });

    const [open, set_open] = useState(false); //estado do collapse
    const [all_completed, set_all_completed] = useState(tarefa.sub_tasks.every(subtarefa => subtarefa.completed) || true); //estado de todas as subtarefas estarem completas ou não

    //adicona uma nova subtarefa
    const add_subtarefa = () => {
        console.log(tarefa)
        if (nova_subtarefa.text.trim() !== '') {
            const updated_tarefa = {
                ...tarefa,
                sub_tasks: [...tarefa.sub_tasks, nova_subtarefa]
            }

            set_all_completed(false)
            set_subtarefas(tarefa.id, updated_tarefa)

            set_nova_subtarefa({ //reseta a nova subtarefa
                completed: false,
                text: '',
            });
        }
    };

    const remove_subtarefa = (index) => {
        const updated_tarefa = {
            ...tarefa,
            sub_tasks: tarefa.sub_tasks.filter((_, i) => i !== index)
        }
        set_all_completed(updated_tarefa.sub_tasks.every(subtarefa => subtarefa.completed))
        set_subtarefas(tarefa.id, updated_tarefa)
    };

    const tarefa_inside = () => { //componentes internos em comum da tarefa com e sem descrição
        return (
            <>
                <div className='d-flex align-items-center'>
                    <Form.Control //input do texto da nova subtarefa
                    type='text'
                    value={nova_subtarefa.text}
                    onChange={(e) => set_nova_subtarefa({
                        completed: false,
                        text: e.target.value,
                    })}
                    placeholder='Digite uma nova subtarefa'
                    />
                    <Button className='p-0 ps-2' variant='link' onClick={add_subtarefa}><img src={add}/></Button> {/*botão de adicionar subtarefa*/}
                </div>
                <div className='m-2'> 
                    {tarefa.sub_tasks.map((subtarefa, index) => ( //lista das subtarefas
                        <div key={index} className='d-flex justify-content-between align-items-center'>
                            <Form.Check
                                className='text-break'
                                checked={subtarefa.completed}
                                label={subtarefa.text}
                                onChange={() => {
                                    const updated_tarefa = {
                                        ...tarefa,
                                        sub_tasks: tarefa.sub_tasks.map((subtarefa, i) => 
                                            index === i ? {
                                                ...subtarefa,
                                                completed: !subtarefa.completed
                                            } :
                                            subtarefa
                                        )
                                    }
                                    set_all_completed(updated_tarefa.sub_tasks.every(subtarefa => subtarefa.completed))
                                    set_subtarefas(tarefa.id, updated_tarefa)
                                }}
                            />
                            <Button className='p-0 ms-2' variant='link' onClick={() => remove_subtarefa(index)}><img src={remove}/></Button>
                        </div>
                    ))}
                </div>
                <Button 
                    disabled={!all_completed} //só ligta o botão se todas as subtarefas estiverem completas
                    variant='secondary' 
                    onClick={() => complete_tarefa(tarefa.id)}
                >Concluída</Button>
                <Button className='mx-2' variant='danger' onClick={() => {
                    remove_tarefa(tarefa.id); 
                    set_open(false)
                    }}>Remover</Button> {/*remova a tarefa com uma callbacjk*/}
            </>
        )
    }
    
    useEffect(() => {
        if (tarefa.completed && !all_completed) complete_tarefa(tarefa.id);
    }, [all_completed])

    return (
        <Card className='my-3'> {/*card da tarefa*/}
            <Card.Header as='h4' className='d-flex justify-content-between'> 
                <div className='d-flex align-items-center'>
                    <span className='pb-1 text-break'>{tarefa.title}</span> {/*mini padding de baixo para arrumar quando tem 2 ou mais linhas*/}
                    <img className='px-2' src={tarefa.completed ? check : null} />
                </div>
                <Button //botão do collapse
                    className='float-end p-0'
                    variant='link'
                    onClick={() => {
                        set_all_completed(tarefa.sub_tasks.every(subtarefa => subtarefa.completed));
                        set_open(!open);
                    }}
                    aria-controls='collapse'
                    aria-expanded={open}
                >
                    <img src={open ? collapse : expand}/> {/*icone de acordo com o estado do collapse*/}
                </Button>
            </Card.Header>
            {tarefa.description ? ( //troca entre os dois tipos de card (com ou sem descrição)
                <Card.Body> 
                    <Card.Text as="span" className='text-break'>{tarefa.description}</Card.Text>
                    <Collapse in={open}>
                        <div id='collapse'>
                            {tarefa_inside()} {/*pega os componentes internos em comum*/}
                        </div>
                    </Collapse>
                </Card.Body>
            ) : (
                <Collapse in={open}>
                    <div id='collapse'>
                        <Card.Body> 
                            {tarefa_inside()} {/*pega os componentes internos em comum*/}
                        </Card.Body>
                    </div>
                </Collapse>
            )}
        </Card>
    )
}

export default Tarefa;
