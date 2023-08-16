import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Person {
    _id?: string;
    username: string;
    email: string;
}

interface PersonState {
    persons: Person[]
}

const initialState: PersonState = {
    persons: []
}

// the first "person/fetch" should be unique
export const fetchPerson = createAsyncThunk("person/fetch", async (thunkAPI) => {
    const response = await fetch('http://localhost:8080/users', {
        method: "GET"
    })

    const data = await response.json();
    return data;
});

type userInput = {
    username: string,
    email: string,
    password: string
}
export const savePerson = createAsyncThunk("person/save", async (user: userInput, thunkAPI) => {
    const response = await fetch('http://localhost:8080/auth/register', {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            username: user.username, email: user.email, password: user.password
        })
    })

    const data = await response.json();
    return data;
})

export const PersonSlice = createSlice({
    name: "person",
    initialState,
    reducers: {
        addPerson: (state, action: PayloadAction<{ user: userInput }>) => {
            state.persons.push({
                // id: state.persons.length,
                username: action.payload.user.username,
                email: action.payload.user.email,
            })
        }
    },
    extraReducers: (builder) => {

        // Here you can add case for the 
        // fullfilled 
        // waiting 
        // rejected/error 
        builder.addCase(fetchPerson.fulfilled, (state, action) => {
            state.persons = action.payload
        });

        builder.addCase(savePerson.fulfilled, (state, action) => {
            state.persons.push(action.payload)
        })

    }
})

export default PersonSlice.reducer;
export const { addPerson } = PersonSlice.actions;