import { useEffect, useState } from 'react';
import Poem from './components/Poem';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './App.css';

function App() {
  const [poem, setPoem] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [stats, setStats] = useState({});

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
      let sum = 0;
      let words = 0;
      let lines = 0;
      const puncRegex = /[,.:;?!-_]/;
      data[0].lines.forEach(line => {
        if (line !== '') {
          try {
            words += line.match(/\s/g).length + 1;
          } catch {
            words += 1;
          }
          sum += line.length;
          lines++;
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
            lines: {name: 'Lines', value: lines},
            avgLength:{name: 'Average characters per line', value:  Math.round(sum / lines)},
            avgWords: {name: 'Average words per line', value: Math.round(words / lines)},
            enjambments: {name: 'Enjambments', value: enjambments},
            endStops: {name: 'End stops', value: endStops},
          }
        )
      });
    });
  }

  return (
    <div className="App">
      <div id="header">
        <h1>Poetry Stats</h1>
      </div>
      <TableContainer id="stats" component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            {Object.keys(stats).map((key) => (
              <TableRow key={key}>
                <TableCell >
                  {stats[key].name}
                </TableCell>
                <TableCell align="right" >{stats[key].value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Container id="newPoem" maxWidth="sm">
        <Button onClick={getPoem} variant="contained" color="primary" >New Poem</Button>
      </Container>
      <div id="content">
        {(isLoaded) ? <Poem poem={poem} />: 'Loading'}
      </div>
    </div>
  );
}

export default App;
