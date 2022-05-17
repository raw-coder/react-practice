import './App.css';
import UserList from "./UserList";
import {useRef, useState} from "react";
import CreateUser from "./CreateUser";

function App() {
    const [inputs, setInputs] = useState({
        username: '',
        email: ''
    });

    const {username, email} = inputs;
    const onChange = e => {
        const {name, value} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const [users, setUsers] = useState([
        {
            id: 1,
            username: 'user1',
            email: 'user1@user.com'
        },
        {
            id: 2,
            username: 'user2',
            email: 'user2@user.com'
        },
        {
            id: 3,
            username: 'user3',
            email: 'user3@user.com'
        }
    ]);

    const nextId = useRef(4);
    const onCreate = () => {
        const user = {
            id: nextId.current,
            username,
            email
        };
        setUsers([...users, user]);
        setInputs({
            username: '',
            email: ''
        });

        nextId.current += 1;
    }

    return (
        <div>
            <CreateUser
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
            <UserList users={users}/>
        </div>

    );
}

export default App;
