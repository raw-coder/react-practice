import React, {useEffect} from "react";

const User = React.memo(function({user, onRemove, onToggle}) {
    useEffect(() => {
       console.log('User Component Mounted');
       console.log(user);
       return () => {
           console.log('User Component Unmounted');
           console.log(user);
       }
    }, [user]);

    return (
        <div>
            <b
                style={{
                    cursor: 'pointer',
                    color: user.active ? 'green' : 'black'
                }}
                onClick={() => onToggle(user.id)}
            >
                {user.username}
            </b>
            <span>({user.email})</span>
            <button onClick={() => onRemove(user.id)}>Remove</button>
        </div>
    )
});

function UserList({users, onRemove, onToggle}) {
    return (
        <div>
            {users.map(user => (
                <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle}/>
            ))}
        </div>
    );
}

export default React.memo(UserList);