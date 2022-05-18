import React, {useContext, useEffect} from "react";
import {UserDispatch} from "./App";

const User = React.memo(function ({user}) {
    useEffect(() => {
        console.log('User Component Mounted');
        console.log(user);
        return () => {
            console.log('User Component Unmounted');
            console.log(user);
        }
    }, [user]);

    const dispatch = useContext(UserDispatch);

    return (
        <div>
            <b
                style={{
                    cursor: 'pointer',
                    color: user.active ? 'green' : 'black'
                }}
                onClick={() => dispatch({
                    type: 'TOGGLE_USER',
                    id: user.id
                })}
            >
                {user.username}
            </b>
            <span>({user.email})</span>
            <button onClick={() => dispatch({
                type: 'REMOVE_USER',
                id: user.id
            })}>Remove
            </button>
        </div>
    )
});

function UserList({users}) {
    return (
        <div>
            {users.map(user => (
                <User user={user} key={user.id}/>
            ))}
        </div>
    );
}

export default React.memo(
    UserList,
    (prevProps, nextProps) => prevProps.users === nextProps.users
);