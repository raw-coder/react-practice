import './App.css';
import Hello from "./Hello";

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
            {/* comment */}
            <Hello
                // inline comment
            />
            <div className="gray_box"></div>
            <div style={style}>{name}</div>
        </div>
    );
}

export default App;
