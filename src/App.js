import './App.css';
import Hello from "./Hello";
import Wrapper from "./wrapper";
import Counter from "./Counter";

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
            <Hello name="react" color="red" isSpecial={true}/>
            <Hello color="blue" isSpecial/>
            <Hello color="green" isSpecial={false}/>
            <div className="gray_box"></div>
            <div style={style}>{name}</div>
            <Counter/>
        </Wrapper>
    );
}

export default App;
