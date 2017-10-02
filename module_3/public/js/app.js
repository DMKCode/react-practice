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
            {props.selectedNumbers.map((number, i) => 
                <span key={ i }>{ number }</span>
            )}
        </div>
    );
};

const Numbers = (props) => {
    const numberClassName = (number) => {
        if(props.selectedNumbers.indexOf(number+1) >= 0) {
            return 'selected';
        }
    }

    const handleOnClick = (event) => props.selectNumber(event.target.dataset.value);

    return (
        <div className="card text-center">
            <div>
                { Numbers.list.map((number, i) => 
                    <span key={i} className={ numberClassName(number) } data-value={ number+1 } onClick={ handleOnClick }>{ number+1 } </span>
                )}
            </div>
        </div>
    );
}

Numbers.list = Array.from(Array(9).keys());

class Game extends React.Component {
    state = {
        selectedNumbers: []
    }

    selectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            selectedNumbers: this.state.selectedNumbers.concat(clickedNumber)
        }));
    }
    render() {
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr/>
                <div className="row">
                    <Stars />
                    <Button />
                    <Answer selectedNumbers={ this.state.selectedNumbers } />
                </div>
                <br/>
                <Numbers selectedNumbers={ this.state.selectedNumbers } selectNumber={ this.selectNumber } />
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