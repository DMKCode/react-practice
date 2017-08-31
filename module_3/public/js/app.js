const Card = (props) => {
    return (
        <div style={{ margin: '1em' }}>
            <img width="75" src={ props.avatar_url } alt=""/>
            <div style={{ display: 'inline-block', marginLeft: 10 }}>
                <div style={{ fontSize: '1.25em', fontWeight: 'bold' }}>{ props.name }</div>
                <div>{ props.company }</div>
            </div>
        </div>
    );
};

const CardList = (props) => {
    return (
        <div>
            { props.cards.map(card => <Card key={ card.id } { ...card } />) }
        </div>
    );
};

class Form extends React.Component {
    state = { 
        userName: '' 
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Event: Form Submit', this.state.userName);
        fetch(`https://api.github.com/users/${this.state.userName}`, {
            method: 'get'
        })
        .then(data => data.json())
        .then(data => {
            this.props.onSubmit(data);
            this.setState({ userName: ''});
        })
        .catch(function(err) {
            console.log(err);
        });
    }

    render() {
        return (
            <form onSubmit={ this.handleSubmit } >
                <input 
                    value={ this.state.userName }
                    onChange={ (event) => this.setState({ userName: event.target.value }) }
                    type="text" 
                    placeholder="Github username" 
                />
                <button type="submit">Add card</button>
            </form>
        );
    }
}

class App extends React.Component {
    state = {
        cards: []
    };

    addNewCard = (cardInfo) => {
        this.setState(prevState => ({
            cards: prevState.cards.concat(cardInfo)
        }));
    }

    render() {
        return (
            <div>
                <Form onSubmit={ this.addNewCard }/>
                <CardList cards={ this.state.cards } />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('content'));