const Stars = (props) => {
    return (
        <div> 
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
        </div>
    );
};

const Button = (props) => {
    return (
        <div> 
            <button>=</button>
        </div>
    );
};

const Answer = (props) => {
    return (
        <div> 
            ...
        </div>
    );
};

class Game extends React.Component {
    render() {
        return (
            <div>
                <h3>Play Nine</h3>
                <Stars />
                <Button />
                <Answer />
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <Game />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('content'));