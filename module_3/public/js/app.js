const Stars = (props) => {
    const numberOfStars = 1 + Math.floor(Math.random() * 9);

    let stars = [];
    for(let i=0; i < numberOfStars; i++) {
        stars.push(<i key={i} className="fa fa-star"></i>);
    }
    
    return (
        <div className="col-5"> 
            {stars}
        </div>
    );
};

const Button = (props) => {
    return (
        <div className="col-2"> 
            <button>=</button>
        </div>
    );
};

const Answer = (props) => {
    return (
        <div className="col-5"> 
            ...
        </div>
    );
};

const Numbers = (props) => {
    return (
        <div className="card text-center">
            <div>
                <span>1</span>
                <span>2</span>
                <span>3</span>
            </div>
        </div>
    );
}

class Game extends React.Component {
    render() {
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr/>
                <div className="row">
                    <Stars />
                    <Button />
                    <Answer />
                </div>
                <br/>
                <Numbers />
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