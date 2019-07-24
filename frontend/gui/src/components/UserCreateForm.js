import React from 'react';
import { Form, Button} from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux'
import * as actions from '../store/actions/auth';
import qs from 'qs';

const passRegex=/^(?=.*[a-z A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;


class UserCreationForm extends React.Component {
    constructor() {
        super();
        this.inputUsername = React.createRef();
        this.inputPassword1 = React.createRef();
        this.inputPassword2 = React.createRef();
        this.inputEmail = React.createRef();
        this.inputEnroll = React.createRef();
    }
    
    componentWillReceiveProps(newProps) {
        console.log("props have changed");
        console.log(newProps.token);
        const data = {
            username: this.inputUsername.current.value,
            email: this.inputEmail.current.value,
            admin_password: "random",
            enroll: this.inputEnroll.current.value
        }
        axios.defaults.headers = {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            Authorization: `Token ${newProps.token}`
        }
        console.log(`${this.inputUsername.current.value}`);
        axios.post(`http://127.0.0.1:8000/IMGSched/creator/`,qs.stringify(data))
        .then(res => console.log(res))
    }

    handleFormSubmit = (event, requestType) => {
        event.preventDefault();
        const username1 = this.inputUsername.current.value;
        const email1 = this.inputEmail.current.value;
        const password1 = this.inputPassword1.current.value;
        const confirm_password1 = this.inputPassword2.current.value;
        if(password1===confirm_password1) {
            this.props.onAuth(username1, email1, password1, confirm_password1);
        }
        }
        
        // switch(requestType) {
        //     case 'post':
        //         return axios.post('http://127.0.0.1:8000/',{
        //             username: username1,
        //             enroll: enroll1,
        //             email: email1,
        //             password: password1,
        //             is_admin: is_admin1
        //         })
        //         .then(res => console.log(res))
        //         .catch(err => console.err(error))
        //     case 'put':
        //         return axios.put('http://127.0.0.1:8000/1',{
        //         username: username1,
        //         enroll: enroll1,
        //         email: email1,
        //         password: password1,
        //         is_admin: is_admin1
        //     })
        //     .then(res => console.log(res))
        //     .catch(err => console.err(error))
        // }


    handleChangePassword() {
        if (!passRegex.test(this.inputPassword1.current.value)) {
            document.getElementById('changeIt').innerHTML="regex fail";
            console.log("regex fail");
        }
        else {
            document.getElementById('changeIt').innerHTML="";
            console.log("regex pass");
        }
        console.log(this.inputPassword1.current.value);
    }

    handleChangeConfirmPassword() {
        if(!(this.inputPassword1.current.value===this.inputPassword2.current.value)) {
            document.getElementById('changeIt2').innerHTML="password does'nt match";
        }
        else {
            document.getElementById('changeIt2').innerHTML="";
        }
    }
    
    render() {
        return(
            <fieldset>
                <Form onSubmit={(event) => this.handleFormSubmit(event,this.props.requestType)}>
                    
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control ref={this.inputUsername} type="text" placeholder="Username" />
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicEnroll">
                        <Form.Label>Enrollment No.</Form.Label>
                        <Form.Control ref={this.inputEnroll} type="text" placeholder="Enroll. No." />
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control ref={this.inputEmail} type="email" placeholder="Enter email" />
                        
                    </Form.Group>
                    
                    <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control ref={this.inputPassword1} onChange={()=> this.handleChangePassword()} type="password" placeholder="Password" />    
                    </Form.Group>
                    
                    <Form.Text className="text-muted"><span id="changeIt"></span></Form.Text>
                    
                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control ref={this.inputPassword2} onChange={()=> this.handleChangeConfirmPassword()} type="password" placeholder="Confirm Password" />
                        
                    </Form.Group>
                    
                    <Form.Text className="text-muted"><span id="changeIt2" ></span></Form.Text>
                    
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </Form>
            </fieldset>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error:state.error,
        token: state.token,
        username: state.username
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCreationForm);