import React from 'react';
import { Form, Spinner, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import GoogleLogin from 'react-google-login'; 


const onFaliure = response => console.error(response);

class LogInForm extends React.Component {
    constructor() {
        super();
        this.inputUsername = React.createRef();
        this.inputPassword = React.createRef();
    }

    google(response) {
        console.log(response);
        this.props.onGoogleAuth(response.code);
    }

    validateForm() {
        return this.inputUsername.current.value.length>0 && this.inputPassword.current.value.length>0 
    }

    
    handleFormSubmit = (event, requestType) => {
        event.preventDefault();
        const username = this.inputUsername.current.value;
        const password = this.inputPassword.current.value;
        this.props.onAuth(username, password);
        
        }
    render() {
        let errorMessage = null;
        if(this.props.error) {
            errorMessage = (
                <p>
                    {this.props.error.message}
                </p>
            );
        }
        return(
            <fieldset>
                <legend>Log In</legend>
                {errorMessage}
                {
                    this.props.loading?
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                    :
                    <Form onSubmit={(event) => this.handleFormSubmit(event,this.props.requestType)}>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control ref={this.inputUsername} type="text" placeholder="Username" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPasswordimport">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={this.inputPassword} type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Log In
                        </Button>
                    </Form>
                }
                login with Google:
                <div><GoogleLogin clientId="592584768306-fvesv7hlgldcqk49uuff6ne6jmi16oo8.apps.googleusercontent.com" buttonText="Google+" responseType="code" onSuccess={(response) => this.google(response)} onFailure={onFaliure}/></div>
            </fieldset>
        );
    }
    
}
const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error:state.error
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password)),
        onGoogleAuth: (token) => dispatch(actions.authGoogleLogin(token))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);

