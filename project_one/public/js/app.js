class Button extends React.Component {
    state = { 
        counter: 0
    }

    handleClick = () => {
        // this.setState({ counter: this.state.counter + 1 });
        
        // when updating the state using a value from the current state use other contract of setState method i.e. prevState
        this.setState((prevState) => ({
            counter: prevState.counter + 1
        }))
    }

    render() {
        return (
            <button onClick={ this.handleClick }>{ this.state.counter }</button>
        );
    }
}

ReactDOM.render(<Button />, document.getElementById('content'));