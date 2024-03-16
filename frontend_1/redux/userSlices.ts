import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OpponentInfo {
    name: string;
    email: string;
    socketId: string;
    id?: string;
}

export interface UserState {
    name: string;
    email: string;
    id?: string;
    sign : string,
    opponentInfo: OpponentInfo;
}

const initialOpponentInfo: OpponentInfo = {
    name: '',
    email: '',
    socketId: '',
};

const initialState: UserState = {
    name: '',
    email: '',
    id: '',
    sign : '',
    opponentInfo: initialOpponentInfo,
};

const userSlice = createSlice({
    name: 'user slice',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserState>) => {
            const { name, email, id } = action.payload;
           return {...state, name, email, id}
        },
        setSign : (state, action) => {
           return {...state, sign : action.payload};
        },
        setOpponentInfo : (state, action : PayloadAction<OpponentInfo>) => {
            const { name, email, id, socketId } = action.payload;
            return {
                ...state,
                opponentInfo: {
                    ...state.opponentInfo,
                    name,
                    email,
                    id, 
                    socketId,
                }
            };
        }
    }
});

export const { setUserInfo, setOpponentInfo, setSign } = userSlice.actions;
export default userSlice.reducer;
