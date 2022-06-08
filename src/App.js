import './App.css';
import { useState } from 'react'; // 이런 애들을 Hook이라고 부른다.
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function Header(props) {
  console.log(props);
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(evt) => {
            evt.preventDefault();
            props.onSelect();
          }}
        >
          WWW
        </a>
      </h1>
    </header>
  );
}

function Nav(props) {
  console.log('props', props.data);
  const liTags = props.data.map((e) => {
    return (
      <li key={e.id}>
        <a
          href="{'/read/' + e.id}"
          onClick={(evt) => {
            evt.preventDefault();
            props.onSelect(e.id);
          }}
        >
          {e.title}
        </a>
      </li>
    );
  });
  return (
    <nav>
      <ol>{liTags}</ol>
    </nav>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  console.log(mode, id);
  const topics = [
    { id: 1, title: 'html', body: 'html is...' },
    { id: 2, title: 'css', body: 'css is...' },
  ];
  let content = null;
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB !" />;
  } else if (mode === 'READ') {
    const topic = topics.filter(e => e.id === id)[0];
    content = <Article title={topic.title} body={`Hello, ${topic.body} !`} />;
    // content = <Article title="READ" body="Hello, READ !" />;
  }
  return (
    <div>
      <Header
        onSelect={() => {
          setMode('WELCOME');
        }}
      />
      <Nav
        data={topics}
        onSelect={(id) => {
          setMode('READ');
          setId(id);
        }}
      />
      {content}
      <ButtonGroup>
        <Button variant="outlined" onClick={() => alert('create!')}>
          Create
        </Button>
        <Button>Update</Button>
      </ButtonGroup>
      <Button variant="outlined">Delete</Button>
    </div>
  );
}

export default App;
