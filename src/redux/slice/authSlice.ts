import { createSlice } from "@reduxjs/toolkit";
import { SignUpInterface } from "@src/services/model";


interface InitialState {
    token: string | null;
    user: any[];
    isLoading: boolean;
    signData: SignUpInterface
}

const initialState: InitialState = {
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') as string) : null,
    user: [],
    isLoading: false,
    signData: {
        username: '',
        name: '',
        email: '',
        password: '',
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.token = action.payload.access_token;
            localStorage.setItem('token', action.payload.access_token);
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setSignData: (state, action) => {
            state.signData = action.payload
        }
    }
});

export const { setUser, setIsLoading, setSignData } = authSlice.actions;
export default authSlice.reducer;