import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';
class CommentForm extends React.Component {
    constructor() {
        super();
        this.inputComment = React.createRef();
    }
    
    handleFormSubmit = (event, requestType) => {
        event.preventDefault();
        console.log("posting comment");
        axios.defaults.headers = {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            Authorization: `Token ${this.props.token}`
        }
        const body1 = this.inputComment.current.value;
        console.log(body1);
        const eventID = this.props.eventID;
        console.log(eventID);
        console.log(this.props.username);
        console.log(requestType)
        const data = qs.stringify({body: body1,username:this.props.username,eventID: eventID})
        if (requestType=='POST') {
            axios.post('http://127.0.0.1:8000/IMGSched/comment_creator/',data)
            .then(res => console.log(res))
            .catch(err => console.err(err))
        }
    }
    
    render() {
        return(
            <fieldset>
                <legend>Write Comment</legend>
                <Form onSubmit={(event) => this.handleFormSubmit(event,this.props.requestType)}>
                    <Form.Group controlId="comment1">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control ref={this.inputComment} as="textarea" rows="3" />

                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Post Comment
                    </Button>
                </Form>
            </fieldset>    
        );
    }
}

const mapStateToProps = state => {
    return {
      isAuthenticated:  state.token!== null,
      token: state.token,
      username: state.username
    };
}
 

export default connect(mapStateToProps, null)(CommentForm)