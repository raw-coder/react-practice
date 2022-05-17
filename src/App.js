import './App.css';
import Hello from "./Hello";
import Wrapper from "./wrapper";

function App() {
    const name = 'react';
    const style = {
        backgroundColor: 'black',
        color: 'aqua',
        fontSize: 24,
        padding: '1rem'
    }

    return (
        <Wrapper>
            <Hello name="react" color="red"/>
            <Hello color="blue"/>
            <div className="gray_box"></div>
            <div style={style}>{name}</div>
        </Wrapper>
    );
}

export default App;
