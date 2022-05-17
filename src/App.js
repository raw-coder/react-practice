import './App.css';
import UserList from "./UserList";
import {useCallback, useMemo, useRef, useState} from "react";
import CreateUser from "./CreateUser";

function countActiveUsers(users) {
    console.log('Counting active users');
    return users.filter(user => user.active).length;
}

function App() {
    const [inputs, setInputs] = useState({
        username: '',
        email: ''
    });

    const {username, email} = inputs;
    const onChange = useCallback((e) => {
        const {name, value} = e.target;
        setInputs(inputs => ({
            ...inputs,
            [name]: value
        }));
    }, []);

    const [users, setUsers] = useState([
        {
            id: 1,
            username: 'user1',
            email: 'user1@user.com',
            active: true
        },
        {
            id: 2,
            username: 'user2',
            email: 'user2@user.com',
            active: false
        },
        {
            id: 3,
            username: 'user3',
            email: 'user3@user.com',
            active: false
        }
    ]);

    const nextId = useRef(4);
    const onCreate = useCallback(() => {
        const user = {
            id: nextId.current,
            username,
            email
        };
        setUsers(users => ([...users, user]));
        setInputs({
            username: '',
            email: ''
        });

        nextId.current += 1;
    }, [username, email]);

    const onRemove = useCallback((id) => {
        setUsers(users => (users.filter(user => user.id !== id)));
    }, [])

    const onToggle = useCallback((id) => {
        setUsers(users => (users.map(user => user.id === id ? {...user, active: !user.active} : user)))
    }, []);

    const count = useMemo(() => countActiveUsers(users), [users]);

    return (
        <div>
            <CreateUser
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
            <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
            <div>Active Users : {count}</div>
        </div>

    );
}

export default App;
