import './App.css';
import InputSample from "./InputSample";
import UserList from "./UserList";

function App() {
    const name = 'react';
    const style = {
        backgroundColor: 'black',
        color: 'aqua',
        fontSize: 24,
        padding: '1rem'
    }

    return (
        <div>
            <InputSample/>
            <UserList/>
        </div>

    );
}

export default App;
