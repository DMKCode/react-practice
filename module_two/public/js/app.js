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

let data = [
    {
        name: "Paul O'Shannessy",
        avatar_url: "https://avatars1.githubusercontent.com/u/8445?v=3",
        company: "Facebook"
    },
    {
        name: "Ben Alpert",
        avatar_url: "https://avatars1.githubusercontent.com/u/6820?v=3",
        company: "Facebook"
    }
]

const CardList = (props) => {
    return (
        <div>
            { props.cards.map(card => <Card { ...card } />) }
        </div>
    );
};

class Form extends React.Component {
    render() {
        return (
            <form>
                <input type="text" placeholder="Github username" />
                <button type="submit">Add card</button>
            </form>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <Form />
                <CardList cards={ data } />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('content'));