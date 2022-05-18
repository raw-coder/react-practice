import './App.css';
import UserList from "./UserList";
import {createContext, useCallback, useMemo, useReducer, useRef} from "react";
import CreateUser from "./CreateUser";
import useInputs from "./hooks/useInputs";
import ErrorBoundary from "./ErrorBoundary";

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

export const UserDispatch = createContext(null);

function App() {
    const [{username, email}, onChange, reset] = useInputs({
        username: '',
        email: ''
    });

    const [state, dispatch] = useReducer(reducer, initialState, undefined);
    const nextId = useRef(4);

    const {users} = state;

    const onCreate = useCallback(() => {
        dispatch({
            type: 'CREATE_USER',
            user: {
                id: nextId.current,
                username,
                email
            }
        });
        reset();
        nextId.current += 1;
    }, [username, email]);

    const count = useMemo(() => countActiveUsers(users), [users]);

    return (
        <ErrorBoundary>
            <UserDispatch.Provider value={dispatch}>
                <CreateUser
                    username={username}
                    email={email}
                    onChange={onChange}
                    onCreate={onCreate}
                />
                {/* 고의로 error 발생 */}
                <UserList />
                {/*<UserList users={users}/>*/}
                <div>Active Users : {count}</div>
            </UserDispatch.Provider>
        </ErrorBoundary>
    );
}

export default App;
