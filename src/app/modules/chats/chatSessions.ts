import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatSessionsKeys } from "./enums/keys";
import { MessageModel } from "../../../_metronic/helpers";

export interface LocalSession {
    messages: MessageModel[];
    summary: string;
    additionalQuestions: {question: string}[];
    extraQuestions: {question: string}[];
    category: string;
    attributes: any;
    chatSessionId: string;
}


export interface ChatSessionsState {
    session?: LocalSession;
}

const initialState: ChatSessionsState = {
    session: !!localStorage.getItem(ChatSessionsKeys.sessions) ? JSON.parse(localStorage.getItem(ChatSessionsKeys.sessions)!) : undefined
};

const chatSessionsSlice = createSlice({
    name: 'chatSessions',
    initialState,
    reducers: {
        addChatSession: (state, action: PayloadAction<LocalSession>) => {
            if (!state.session) {
                state.session = action.payload;
            }
            else if(state.session.chatSessionId === action.payload.chatSessionId) {
                state.session.messages = [...state.session.messages, ...action.payload.messages];
                state.session.summary = action.payload.summary;
                state.session.additionalQuestions = action.payload.additionalQuestions;
                state.session.extraQuestions = action.payload.extraQuestions;
                state.session.category = action.payload.category;
                state.session.attributes = action.payload.attributes;
            }
            else {
                state.session = action.payload;
            }
            localStorage.setItem(ChatSessionsKeys.sessions, JSON.stringify(state.session));
        },
        clearSessions: (state) => {
            delete state.session;
            localStorage.removeItem(ChatSessionsKeys.sessions)
        }
    }
})

export const { addChatSession, clearSessions } = chatSessionsSlice.actions;
export default chatSessionsSlice.reducer;
