import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateDoctor, getAllDoctor } from "../../../actions/doctors";

import {Card, Nav, Form, Row, Col, InputGroup, Tabs, Tab, Button} from 'react-bootstrap';
import 'date-fns';

function ProfileContent() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Profile</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                <li className="breadcrumb-item active">Profile</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <Card style={{ width: '70rem', height: '30rem', variant: 'left'}}>
                                {/*<Card.Header>*/}
                                {/*    */}
                                {/*</Card.Header>*/}
                                <Card.Body>
                                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                                        <Tab eventKey="profile" title="Profile">
                                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                                                        <Form.Label>Full Name</Form.Label>
                                                        <Form.Control
                                                            plaintext
                                                            readOnly
                                                            value="dodi hadid"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                                        <Form.Label>E-mail</Form.Label>
                                                        <Form.Control
                                                            plaintext
                                                            readOnly
                                                            value="dodi@gmail.com"
                                                        />
                                                    </Form.Group>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                                                        <Form.Label>SIP</Form.Label>
                                                        <Form.Control
                                                            plaintext
                                                            readOnly
                                                            value="31214434777"
                                                        />
                                                    </Form.Group>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                                                        <Form.Label>Category</Form.Label>
                                                        <Form.Control
                                                            plaintext
                                                            readOnly
                                                            value="organs"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                                        <Form.Label>Practice Place</Form.Label>
                                                        <Form.Control
                                                            plaintext
                                                            readOnly
                                                            value="surabaya"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                                        <Form.Label>Patients</Form.Label>
                                                        <Form.Control
                                                            plaintext
                                                            readOnly
                                                            value="10"
                                                        />
                                                    </Form.Group>
                                                </Row>
                                            </Form>
                                        </Tab>
                                        <Tab eventKey="setting" title="Setting">
                                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                                                        <Form.Label>Full Name</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder="Name"
                                                            defaultValue="Mark"
                                                        />
                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                                        <Form.Label>E-mail</Form.Label>
                                                        <InputGroup hasValidation>
                                                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Username"
                                                                aria-describedby="inputGroupPrepend"
                                                                required
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please choose a username.
                                                            </Form.Control.Feedback>
                                                        </InputGroup>
                                                    </Form.Group>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                                                        <Form.Label>SIP</Form.Label>
                                                        <Form.Control type="number" placeholder="SIP" required />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a valid SIP.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                                                        <Form.Label>Doctor Category</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder="Doctor Category<"
                                                            defaultValue="internal disease"
                                                        />
                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                                        <Form.Label>Practice Place</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder="Practice Place"
                                                            defaultValue="Surabaya"
                                                        />
                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                                        <Form.Label>Patients</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="number"
                                                            placeholder="Total patients"
                                                            defaultValue="0"
                                                        />
                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                    </Form.Group>
                                                </Row>
                                                <Button className="text-center" type="submit">Save changes</Button>
                                            </Form>
                                        </Tab>
                                    </Tabs>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileContent;
