import React, { useRef } from "react";
import { useAppDispatch } from "../store/store";
import { savePerson } from "../store/features/personSlice";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const Add = () => {
    const username = useRef<string>("");
    const email = useRef<string>("");
    const password = useRef<string>("");
    const dispatch = useAppDispatch();

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control type="email" placeholder="name@example.com" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control type="password" placeholder="Password" />
                    </FloatingLabel>


                    <label>Person username</label>
                    <input type="text" onChange={(e) => (username.current = e.target.value)} />

                    <label>Person email</label>
                    <input type="text" onChange={(e) => (email.current = e.target.value)} />

                    <label>Person password</label>
                    <input type="text" onChange={(e) => (password.current = e.target.value)} />

                    <Button variant="primary" onClick={() => dispatch(savePerson({ username: username.current, email: email.current, password: password.current }))}>Add</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Add;