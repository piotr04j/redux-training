import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import { fetchPosts } from '../../store/slice/posts/postsSlice';
import {useAppDispatch} from '../../store/hook/hook';

function App() {
   const dispatch = useAppDispatch()

    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
          <button onClick={() => dispatch(fetchPosts())}>
              Get Posts!
          </button>
      </div>
    </div>
  );
}

export default App;
