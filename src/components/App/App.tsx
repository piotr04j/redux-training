import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import {fetchPosts, selectAllPostsAdapter} from '../../store/slice/posts/postsSlice';
import {useAppDispatch} from '../../store/hook/hook';
import { useSelector } from 'react-redux';
import Modal from "../Modal/Modal";

function App() {
    const dispatch = useAppDispatch()
    const posts = useSelector(selectAllPostsAdapter.selectAll)

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
        <ul>
            {
                posts && posts.map( item => {
                    return <li key={item.id}>{item.title}</li>
                })
            }
        </ul>
        <Modal />
    </div>
  );
}

export default App;
