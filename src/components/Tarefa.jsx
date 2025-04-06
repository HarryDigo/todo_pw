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

function Tarefa({ tarefa, remove_tarefa, index }) {
    const [open, set_open] = useState(false); //estado do collapse

    const [subtarefas, set_subtarefas] = useState(tarefa.sub_tasks); //pega as subtarefas da tarefa
    const [nova_subtarefa, set_nova_subtarefa] = useState({ //estado da nova subtarefa
        completed: false,
        text: '',
    });

    const [completed, set_completed] = useState(tarefa.completed); //estado da tarefa estar completa ou não
    const [all_completed, set_all_completed] = useState(subtarefas.every(subtarefa => subtarefa.completed)); //estado de todas as subtarefas estarem completas ou não

    //adicona uma nova subtarefa
    const add_subtarefa = () => {
        if (nova_subtarefa.text.trim() !== '') {
            set_subtarefas([...subtarefas, nova_subtarefa]); //adiciona para o estado e atualiza o objeto da tarefa
            tarefa.sub_tasks.push(nova_subtarefa);
            localStorage.setItem(`task_${tarefa.id}`, JSON.stringify(tarefa)); //atualiza no local storage

            set_nova_subtarefa({ //reseta a nova subtarefa
                completed: false,
                text: '',
            });
        }
    };

    const remove_subtarefa = (index) => {
        set_subtarefas(subtarefas.filter((_, i) => i !== index)); //remove do estado, do objeto e do local storage
        tarefa.sub_tasks.splice(index, 1);
        localStorage.setItem(`task_${tarefa.id}`, JSON.stringify(tarefa));
    };

    useEffect(() => { //verifica se todas as subtarefas estão completas para validar a completação(??) da tarefa
        if (subtarefas.length === 0) { //se não tem subtarefas, a tarefa pode ser completa
            set_all_completed(true);
        } else { //se tiver subtarefas, verifica se todas estão completas
            const all_completed = subtarefas.every(subtarefa => subtarefa.completed);
            set_all_completed(all_completed);
            if (!all_completed) {
                set_completed(false);
                tarefa.completed = false;
            }
        }
        localStorage.setItem(`task_${tarefa.id}`, JSON.stringify(tarefa)); //atualiza a tarefa no local storage
    }, [subtarefas, tarefa, tarefa.completed]); //mesmo que só use o subtarefas e o completed, precisa deixar as dependencias completas, portanto usa o tarefa também :3

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
                    {subtarefas.map((subtarefa, index) => ( //lista das subtarefas
                        <div key={index} className='d-flex justify-content-between align-items-center'>
                            <Form.Check
                                className='text-break'
                                checked={subtarefa.completed}
                                label={subtarefa.text}
                                onChange={() => { //atualiza o estado da subtarefa (e subtarefas para ativar o useEffect)
                                    subtarefa.completed = !subtarefa.completed;
                                    set_subtarefas([...subtarefas]);
                                }}
                            />
                            <Button className='p-0 ms-2' variant='link' onClick={() => remove_subtarefa(index)}><img src={remove}/></Button>
                        </div>
                    ))}
                </div>
                <Button 
                    disabled={!all_completed} //só ligta o botão se todas as subtarefas estiverem completas
                    variant='secondary' 
                    onClick={() => {
                        set_completed(!completed) //atualiza o estado da tarefa
                        tarefa.completed = !completed;
                    }}
                >Concluída</Button>
                <Button className='mx-2' variant='danger' onClick={() => remove_tarefa(index, tarefa.id)}>Remover</Button> {/*remova a tarefa com uma callbacjk*/}
            </>
        )
    }

    return (
        <Card className='my-3'> {/*card da tarefa*/}
            <Card.Header as='h4' className='d-flex justify-content-between'> 
                <div className='d-flex align-items-center'>
                    <span className='pb-1 text-break'>{tarefa.title}</span> {/*mini padding de baixo para arrumar quando tem 2 ou mais linhas*/}
                    <img className='px-2'  src={completed ? check : null} />
                </div>
                <Button //botão do collapse
                    className='float-end p-0'
                    variant='link'
                    onClick={() => set_open(!open)}
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
