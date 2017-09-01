const Stars = (props) => {
    const numberOfStars = 1 + Math.floor(Math.random() * 9);

    let stars = [];
    // different style in Numbers component
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
            <span>5</span>
            <span>6</span>
        </div>
    );
};

const Numbers = (props) => {
    return (
        <div className="card text-center">
            <div>
                {Numbers.list.map((number, i) => <span key={i}>{number+1}</span>)}
            </div>
        </div>
    );
}

Numbers.list = Array.from(Array(9).keys());

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