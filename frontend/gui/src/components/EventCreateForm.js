import React from 'react';
import { Form, Button} from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import qs from 'qs';



class EventForm extends React.Component {
    constructor() {
        super();
        this.inputName = React.createRef();
        this.inputDate = React.createRef();
        this.inputVenue = React.createRef();
        this.inputManager = React.createRef();
        this.inputDescription = React.createRef();
    }

    state = {
        managers: [],
    }

    componentDidMount() {
        axios.defaults.headers = {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            Authorization: `Token ${this.props.token}`
        }
        axios.get('http://127.0.0.1:8000/IMGSched/people2/')
        .then(res => {
            this.setState({
                managers: res.data
            });
            console.log(res.data);
            console.log(this.props.token);
        })
    }

    handleFormSubmit = (event) => {
        console.log("creating event");
        event.preventDefault();
        const name1 = this.inputName.current.value;
        const date1 = this.inputDate.current.value;
        const venue1 = this.inputVenue.current.value;
        const manager1 = this.inputManager.value;
        const description1 = this.inputDescription.current.value;
        const data = {
            name: name1,
            date: date1,
            venue: venue1,
            manager: manager1,
            description:  description1
        }
        console.log(manager1)
        axios.post('http://127.0.0.1:8000/IMGSched/schedule3/',qs.stringify(data))
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    render() {
        return(
            <div style={{width: '100%',display: 'flex',justifyContent: 'center',}}>
                {
                    this.props.isAuthenticated?
                    <fieldset>
                <legend>Create Event</legend>
                <Form onSubmit={(event) => this.handleFormSubmit(event)}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Name</Form.Label>
                    <Form.Control ref={this.inputName} type="text" placeholder="Enter event name" />
                </Form.Group>
                <Form.Group controlId="formBasicdate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control ref={this.inputDate} type="date" placeholder="date of event" />
                </Form.Group>
                <Form.Group controlId="formBasicVenue">
                    <Form.Label>Venue </Form.Label>
                    <Form.Control ref={this.inputVenue} type="text" placeholder="Enter the venue" />
                </Form.Group>
                <Form.Group controlId="formBasicManager">   
                    <Form.Label>Manager</Form.Label>
                    <Form.Control as="select" ref={select => this.inputManager=select} >
                    {
                        this.state.managers.map( c => (
                            <option value={c.id}>{c.user_name.username}</option>
                        ))
                    }
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicDesc">
                    <Form.Label>Description</Form.Label>
                    <Form.Control ref={this.inputDescription} type="text" placeholder="enter brief description" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create Event
                </Button>
            </Form>
            </fieldset>
            :
            <div>You need to log in to crete Event</div>
                }
            </div>
            
            
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated:  state.token!== null,
        username: state.username,
        error:state.error,
        token: state.token
    };
  }
  

export default connect(mapStateToProps, null)(EventForm);
