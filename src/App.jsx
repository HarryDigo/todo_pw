import ListaTarefas from "./components/ListaTarefas";

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'; //importa o bootstrap para o projeto

function App() {

    return (
        <>
            <h1>Gerenciador de Tarefas</h1>
            <ListaTarefas />
        </>
    );
}

export default App;