import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    createReducer,
    Dictionary,
    EntityId
} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from '../../store';

interface Post {
    userId: number,
    id: number,
    title: string,
    body: string
}

interface ActionError {
    error: {
        message: string
    }
}

interface PostsState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null,
    entities: Dictionary<Post>,
    ids: EntityId[]
}

const postsAdapter = createEntityAdapter<Post>();
const initialState: PostsState = {
    status: 'idle',
    error: null,
    ...postsAdapter.getInitialState()
}

export const selectAllPostsAdapter = postsAdapter.getSelectors<RootState>(state => state.posts)

export const fetchPosts = createAsyncThunk<Post[], null, {rejectValue: ActionError}>('posts/fetchPosts', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')

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
                postsAdapter.addMany(state, action.payload);
            })
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || null
            })
    }
})

const reducer = postsSlice.reducer;
export default reducer;

