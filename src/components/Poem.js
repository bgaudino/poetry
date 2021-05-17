import Container from '@material-ui/core/Container';

export default function Poem(props) {
    const poem = props.poem;
    const styles = props.styles;
    return (
        <div>
            <Container style={styles} maxWidth="sm">
                <h2>{poem.title}</h2>
                <span>
                    by&nbsp;
                    <a href={`https://en.wikipedia.org/wiki/${poem.author.replaceAll(' ', '_')}`} target="_blank" rel="noreferrer">
                        {poem.author}
                    </a>
                </span>
                    
                <hr />
                {poem.lines.map(line => {
                    if (line === '') {
                        return <br />
                    } else {
                        return <p>{line}</p>
                    }
                })}
            </Container>
        </div>
    )
}