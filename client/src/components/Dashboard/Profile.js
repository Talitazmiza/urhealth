import React from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Navbar from './Navbar';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
} from "reactstrap";

function Profile() {
    return (
        <div className="wrapper">
            <Navbar />
            <Sidebar />
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-5">
                        <div className="col-sm-6">
                            <h1 className="m-0">Profile</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Profile</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <h5 className="title">Edit Profile</h5>
                            </CardHeader>
                            <CardBody width="100%">
                                <Form>
                                    {/*<Row>*/}
                                    {/*    <Col className="pr-1" md="4">*/}
                                    {/*        <FormGroup>*/}
                                    {/*            <label>Company (disabled)</label>*/}
                                    {/*            <Input*/}
                                    {/*                defaultValue="Creative Code Inc."*/}
                                    {/*                disabled*/}
                                    {/*                placeholder="Company"*/}
                                    {/*                type="text"*/}
                                    {/*            />*/}
                                    {/*        </FormGroup>*/}
                                    {/*    </Col>*/}
                                    {/*    <Col className="px-1" md="3">*/}
                                    {/*        <FormGroup>*/}
                                    {/*            <label>Username</label>*/}
                                    {/*            <Input*/}
                                    {/*                defaultValue="michael23"*/}
                                    {/*                placeholder="Username"*/}
                                    {/*                type="text"*/}
                                    {/*            />*/}
                                    {/*        </FormGroup>*/}
                                    {/*    </Col>*/}
                                    {/*    <Col className="pl-1" md="4">*/}
                                    {/*        <FormGroup>*/}
                                    {/*            <label htmlFor="exampleInputEmail1">*/}
                                    {/*                Email address*/}
                                    {/*            </label>*/}
                                    {/*            <Input placeholder="Email" type="email" />*/}
                                    {/*        </FormGroup>*/}
                                    {/*    </Col>*/}
                                    {/*</Row>*/}
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <FormGroup>
                                                <label>First Name</label>
                                                <Input
                                                    defaultValue="Mike"
                                                    placeholder="Company"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <FormGroup>
                                                <label>Last Name</label>
                                                <Input
                                                    defaultValue="Andrew"
                                                    placeholder="Last Name"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <label>E-mail</label>
                                                <Input
                                                    defaultValue="Email@gmail.com"
                                                    placeholder="E-mail"
                                                    type="email"
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <label>Address</label>
                                                <Input
                                                    defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                                    placeholder="Home Address"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="4">
                                            <FormGroup>
                                                <label>Age</label>
                                                <Input
                                                    defaultValue="20"
                                                    placeholder="Age"
                                                    type="number"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="px-1" md="4">
                                            <FormGroup>
                                                <label>Height</label>
                                                <Input
                                                    defaultValue="170"
                                                    placeholder="Height"
                                                    type="number"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="px-1" md="4">
                                            <FormGroup>
                                                <label>Weight</label>
                                                <Input
                                                    defaultValue="80"
                                                    placeholder="Weight"
                                                    type="number"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                        >
                                            Save details
                                        </Button>
                                    </Row>
                            {/*        <Row>*/}
                            {/*            <Col md="12">*/}
                            {/*                <FormGroup>*/}
                            {/*                    <label>About Me</label>*/}
                            {/*                    <Input*/}
                            {/*                        cols="80"*/}
                            {/*                        defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in*/}
                            {/*that two seat Lambo."*/}
                            {/*                        placeholder="Here can be your description"*/}
                            {/*                        rows="4"*/}
                            {/*                        type="textarea"*/}
                            {/*                    />*/}
                            {/*                </FormGroup>*/}
                            {/*            </Col>*/}
                            {/*        </Row>*/}
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                    {/*<Col md="4">*/}
                    {/*    <Card className="card-user">*/}
                    {/*        /!*<div className="image">*!/*/}
                    {/*        /!*    <img alt="..." src={require(".../public/img.png").default} />*!/*/}
                    {/*        /!*</div>*!/*/}
                    {/*        <CardBody>*/}
                    {/*            <div className="author">*/}
                    {/*                <a href="#pablo" onClick={(e) => e.preventDefault()}>*/}
                    {/*                    <img*/}
                    {/*                        alt="..."*/}
                    {/*                        className="avatar border-gray"*/}
                    {/*                        //src={require("assets/img/mike.jpg").default}*/}
                    {/*                    />*/}
                    {/*                    <h5 className="title">Mike Andrew</h5>*/}
                    {/*                </a>*/}
                    {/*                <p className="description">michael24</p>*/}
                    {/*            </div>*/}
                    {/*            <p className="description text-center">*/}
                    {/*                "Lamborghini Mercy <br />*/}
                    {/*                Your chick she so thirsty <br />*/}
                    {/*                I'm in that two seat Lambo"*/}
                    {/*            </p>*/}
                    {/*        </CardBody>*/}
                    {/*        <hr />*/}
                    {/*        <div className="button-container">*/}
                    {/*            <Button*/}
                    {/*                className="btn-neutral btn-icon btn-round"*/}
                    {/*                color="default"*/}
                    {/*                href="#pablo"*/}
                    {/*                onClick={(e) => e.preventDefault()}*/}
                    {/*                size="lg"*/}
                    {/*            >*/}
                    {/*                <i className="fab fa-facebook-f" />*/}
                    {/*            </Button>*/}
                    {/*            <Button*/}
                    {/*                className="btn-neutral btn-icon btn-round"*/}
                    {/*                color="default"*/}
                    {/*                href="#pablo"*/}
                    {/*                onClick={(e) => e.preventDefault()}*/}
                    {/*                size="lg"*/}
                    {/*            >*/}
                    {/*                <i className="fab fa-twitter" />*/}
                    {/*            </Button>*/}
                    {/*            <Button*/}
                    {/*                className="btn-neutral btn-icon btn-round"*/}
                    {/*                color="default"*/}
                    {/*                href="#pablo"*/}
                    {/*                onClick={(e) => e.preventDefault()}*/}
                    {/*                size="lg"*/}
                    {/*            >*/}
                    {/*                <i className="fab fa-google-plus-g" />*/}
                    {/*            </Button>*/}
                    {/*        </div>*/}
                    {/*    </Card>*/}
                    {/*</Col>*/}
                </Row>
            </div>
        </div>
            <Footer />
            <aside className="control-sidebar control-sidebar-dark"/>
    </div>
    )
}

export default Profile;
