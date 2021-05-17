import { useEffect, useState } from 'react';
import Poem from './components/Poem';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import './App.css';

function App() {
  const [poem, setPoem] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [stats, setStats] = useState({});
  const styles = {
    display: 'grid',
    justifyContent: 'center',
  };

  useEffect(() => {
    getPoem();
  }, []);

  const getPoem = () => {
    fetch('https://poetrydb.org/random')
    .then(res => res.json())
    .then(data => {
      setPoem(() => data[0]);
      setIsLoaded(() => true);
      let enjambments = 0;
      let endStops = 0;
      const puncRegex = /[,.:;?!]/;
      data[0].lines.forEach(line => {
        if (line !== '') {
          if (line[line.length - 1].match(puncRegex)) {
            endStops++;
          } else {
            enjambments++;
          }
        }
      });
      setStats(() => {
        return (
          {
            enjambments: enjambments,
            endStops: endStops,
          }
        )
      });
    });
  }

  return (
    <div className="App">
      <div id="header">
        <h1>Poetry</h1>
        <Container style={styles} maxWidth="sm">
          <Button onClick={getPoem} variant="contained" color="primary">New Poem</Button>
        </Container>
        <Container style={styles} maxWidth="sm">
          <p><strong>Enjambments: {stats.enjambments}</strong><br />
          <strong>End-stop lines: {stats.endStops}</strong></p>
        </Container>
      </div>
      <div id="content">
        {(isLoaded) ? <Poem poem={poem} styles={styles} />: 'Loading'}
      </div>
    </div>
  );
}

export default App;
