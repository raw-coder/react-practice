import './App.css';
import UserList from "./UserList";
import {useCallback, useMemo, useReducer, useRef, useState} from "react";
import CreateUser from "./CreateUser";

function countActiveUsers(users) {
    console.log('Counting active users');
    return users.filter(user => user.active).length;
}

const initialState = {
    inputs: {
        username: '',
        email: ''
    },
    users: [
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
    ]
};

function reducer(state, action) {
    switch (action.type) {
        case 'CHANGE_INPUT':
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.name]: action.value
                }
            };
        case 'CREATE_USER':
            return {
                inputs: initialState.inputs,
                users: state.users.concat(action.user)
            };
        case 'TOGGLE_USER':
            return {
                ...state,
                users: state.users.map(user => user.id === action.id ? {...user, active: !user.active} : user)
            };
        case 'REMOVE_USER':
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.id)
            }
        default:
            return state;
    }
}

function App() {

    const [state, dispatch] = useReducer(reducer, initialState, undefined);
    const nextId = useRef(4);

    const {users} = state;
    const {username, email} = state.inputs;

    const onChange = useCallback((e) => {
        const {name, value} = e.target;
        dispatch({
            type: 'CHANGE_INPUT',
            name,
            value
        });
    }, []);

    const onCreate = useCallback(() => {
        dispatch({
            type: 'CREATE_USER',
            user: {
                id: nextId.current,
                username,
                email
            }
        });
        nextId.current += 1;
    }, [username, email]);

    const onToggle = useCallback((id) => {
        dispatch({
            type: 'TOGGLE_USER',
            id
        });
    }, []);

    const onRemove = useCallback((id) => {
        dispatch({
            type: 'REMOVE_USER',
            id
        });
    }, [])

    const count = useMemo(() => countActiveUsers(users), [users]);

    return (
        <div>
            <CreateUser
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
            <UserList
                users={users}
                onToggle={onToggle}
                onRemove={onRemove}
            />
            <div>Active Users : {count}</div>
        </div>

    );
}

export default App;
