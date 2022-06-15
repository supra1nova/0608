import './App.css';
import { useState } from 'react'; // 이런 애들을 Hook이라고 부른다.
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import styled from 'styled-components';
import {Link} from "react-router-dom";

const HeaderStyled = styled(Header)`
  border-bottom: 1px solid gray;
`;

function Header(props) {
  console.log(props);
  return (
    <header className={props.className}>
      <h1>
        <Link to="/"
          onClick={(evt) => {
            // evt.preventDefault();
            props.onSelect();
          }}
        >
          WWW
        </Link>
      </h1>
    </header>
  );
}

function Nav(props) {
  const liTags = props.data.map((e) => {
    return (
      <li key={e.id}>
        <Link
          to={'/read/' + e.id}
          // href="{'/read/' + e.id}"
          onClick={(evt) => {
            // evt.preventDefault();
            props.onSelect(e.id);
          }}
        >
          {e.title}
        </Link>
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

function Create(props) {
  return <article>
    <h2>Create</h2>
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        const title = evt.target.title.value;
        const body = evt.target.title.value;
        props.onCreate(title, body);
      }}
    >
      <p>
        <input name="title" type="text" placeholder="title"></input>
      </p>
      <p>
        <textarea name="body" placeholder="body"></textarea>
      </p>
      <p>
        <input type="submit" value="Create"></input>
      </p>
    </form>
  </article>;
}



function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(3);
  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'html is...' },
    { id: 2, title: 'css', body: 'css is...' },
  ]);
  let content = null;
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB !" />;
  } else if (mode === 'READ') {
    const topic = topics.filter((e) => e.id === id)[0];
    content = <Article title={topic.title} body={`Hello, ${topic.body} !`} />;
  } else if (mode === 'CREATE') {
    content = (
      <Create
        onCreate={(title, body) => {
          const newTopic = { id: nextId, title, body };
          const newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics);
          setId(nextId);
          setMode('READ');
          setNextId(() => nextId + 1);
        }}
      ></Create>
    );
  }
  return (
    <div>
      <HeaderStyled
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
        <Button
          variant="outlined"
          onClick={() => {
            setMode('CREATE');
          }}
        >
          Create
        </Button>
        <Button>Update</Button>
      </ButtonGroup>
      <Button variant="outlined" onClick={() => {
        const newTopics = topics.filter(e => {
          if (e.id === id) {
            return false;
          } else {
            return true;
          };
        })
        setTopics(newTopics);
        setMode('WELCOME');
      }}>Delete</Button>
    </div>
  );
}

export default App;
