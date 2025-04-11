import ListaTarefas from './components/ListaTarefas';

import './App.scss'; //importa o bootstrap editado e css global

function App() {

    return (
        <>
            <h1 className='text-center'>Gerenciador de Tarefas</h1>
            <ListaTarefas />
        </>
    );
}

export default App;