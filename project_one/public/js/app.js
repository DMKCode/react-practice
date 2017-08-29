class Button extends React.Component {
    handleClick = () => {
        this.props.handleClick(this.props.incrementValue)
    }

    render() {
        return (
            <button onClick={ this.handleClick }>+{ this.props.incrementValue }</button>
        );
    }
}

const Result = (props) => {
    return (
        <div>{ props.counter }</div>
    );
}

class App extends React.Component {
    state = {
        counter: 0
    }

    incrementCounter = (value) => {
        // this.setState({ counter: this.state.counter + 1 });
        
        // when updating the state using a value from the current state use other contract of setState method i.e. prevState
        this.setState((prevState) => ({
            counter: prevState.counter + value
        }))    
    }
    
    render() {
        return (
            <div>
                <Button incrementValue={ 1 } handleClick={ this.incrementCounter } />
                <Button incrementValue={ 5 } handleClick={ this.incrementCounter } />
                <Button incrementValue={ 10 } handleClick={ this.incrementCounter } />
                <Button incrementValue={ 100 } handleClick={ this.incrementCounter } />
                <Result counter={ this.state.counter } />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('content'));