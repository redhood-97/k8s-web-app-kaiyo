import React, { useRef } from "react";
import { useAppDispatch } from "../store/store";
import { addPerson, savePerson } from "../store/features/personSlice";

const Add = () => {
    const username = useRef<string>("");
    const email = useRef<string>("");
    const password = useRef<string>("");
    const dispatch = useAppDispatch();

    return (
        <div>
            <label>Person username</label>
            <input type="text" onChange={(e) => (username.current = e.target.value)} />

            <label>Person email</label>
            <input type="text" onChange={(e) => (email.current = e.target.value)} />

            <label>Person password</label>
            <input type="text" onChange={(e) => (password.current = e.target.value)} />

            <button onClick={() => dispatch(savePerson({ username: username.current, email: email.current, password: password.current }))}>Add</button>

        </div>
    )
}

export default Add;