const Card = (props) => {
    return (
        <div style={{ margin: '1em' }}>
            <img width="75" src={ props.avata_url } alt=""/>
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
            { props.cards.map(card => <Card { ...card } />) }
        </div>
    );
};

ReactDOM.render(<Card />, document.getElementById('content'));