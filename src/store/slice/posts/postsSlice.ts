import {createSlice, createAsyncThunk, createEntityAdapter, createReducer} from '@reduxjs/toolkit';
import axios from 'axios';

interface Post {
    userId: number,
    id: number,
    title: string,
    body: string
}

const postsAdapter = createEntityAdapter<Post[]>();
const initialState = postsAdapter.getInitialState();
export const postsSelectors = postsAdapter.getSelectors()
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get<{data: Post[]}>('https://jsonplaceholder.typicode.com/posts')

    return response.data
})

const postReducer = createReducer(initialState, builder => {
    builder.addDefaultCase((state, action) => state)
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: { ...postReducer},
    extraReducers: builder => {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                postsAdapter.setAll(state, action.payload);
            })
    }
})

const reducer = postsSlice.reducer;
export default reducer;
