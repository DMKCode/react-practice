const Stars = (props) => {

    let stars = [];
    // different style in Numbers component
    for(let i=0; i < props.numberOfStars; i++) {
        stars.push(<i key={i} className="fa fa-star"></i>);
    }
    
    return (
        <div className="col-5"> 
            {stars}
        </div>
    );
};

const Button = (props) => {
    let button;

    switch(props.answwerIsCorrect) {
        case true:
            button = 
                <button className="btn btn-success" onClick={ props.acceptAnswer }>
                    <i className="fa fa-check"></i>
                </button>;
            break;

        case false:
            button = 
                <button className="btn btn-danger">
                    <i className="fa fa-times"></i>
                </button>;
            break;

        default:
            button = 
            <button className="btn"
                    onClick={ props.checkAnswer } 
                    disabled={ props.selectedNumbers.length === 0 }>
                    =
            </button>; 
            break;
    }
    
    return (
        <div className="col-2 text-center"> 
            { button }
            <br /> <br />
            <button className="btn btn-warning btn-sm" 
                onClick={ props.redraw }
                disabled={  props.redraws === 0 } >
                <i className="fa fa-refresh"></i> { props.redraws }
            </button>
        </div>
    );
};

const Answer = (props) => {
    return (
        <div className="col-5"> 
            {props.selectedNumbers.map((number, i) => 
                <span key={ i } onClick={ () => props.unSelectNumber(number) }>{ number }</span>
            )}
        </div>
    );
};

const Numbers = (props) => {
    const numberClassName = (number) => {
        if(props.usedNumbers.indexOf(number) >= 0) {
            return 'used';
        }
        if(props.selectedNumbers.indexOf(number) >= 0) {
            return 'selected';
        }
    }

    return (
        <div className="card text-center">
            <div>
                { Numbers.list.map((number, i) => 
                    <span key={i} className={ numberClassName(number+1) } onClick={ () => props.selectNumber(number+1) }>{ number+1 } </span>
                )}
            </div>
        </div>
    );
}

Numbers.list = Array.from(Array(9).keys());

class Game extends React.Component {
    state = {
        selectedNumbers: [],
        numberOfStars: 1 + Math.floor(Math.random() * 9),
        answwerIsCorrect: null,
        usedNumbers: [],
        redraws: 5,
    };

    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) return;
        this.setState(prevState => ({
            answwerIsCorrect: null,
            selectedNumbers: this.state.selectedNumbers.concat(clickedNumber)
        }));
    };

    unSelectNumber = (clickedNumber) => {
        this.setState(prevState => ({ 
            answwerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber) }));
    };

    checkAnswer = () => {
        this.setState(prevState => ({
            answwerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        }));
    };

    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answwerIsCorrect: null,
            numberOfStars: 1 + Math.floor(Math.random() * 9),
        }));
    };

    redraw = () => {
        if(this.state.redraws === 0) { return; }
        this.setState(prevState => ({
            selectedNumbers: [],
            answwerIsCorrect: null,
            numberOfStars: 1 + Math.floor(Math.random() * 9),
            redraws: prevState.redraws - 1,
        }));
    }

    render() {
        const { 
            selectedNumbers, 
            numberOfStars, 
            answwerIsCorrect,
            usedNumbers,
            redraws 
        } = this.state;

        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr/>
                <div className="row">
                    <Stars numberOfStars={ numberOfStars } />
                    <Button selectedNumbers={ selectedNumbers }
                            checkAnswer={ this.checkAnswer }
                            answwerIsCorrect={ answwerIsCorrect }
                            acceptAnswer={ this.acceptAnswer }
                            redraw={ this.redraw }
                            redraws={ redraws } />
                    <Answer selectedNumbers={ selectedNumbers } 
                            unSelectNumber={ this.unSelectNumber } />
                </div>
                <br/>
                <Numbers selectedNumbers={ selectedNumbers } 
                        selectNumber={ this.selectNumber } 
                        usedNumbers={ usedNumbers } />
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