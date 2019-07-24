import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CommentList from '../components/Comments';
import CommentForm from '../components/CommentCreationForm';


class EventDetail extends React.Component {
    
    state = {
        events: [],
        people: [],
        admin_value: {}
    }

    componentDidMount() {
        if (this.props.token) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${this.props.token}`
            }
            const eventID = this.props.match.params.eventID;
            axios.get(`http://127.0.0.1:8000/IMGSched/schedule2/${eventID}/`)
                .then(res => {
                    this.setState({
                        events: [res.data]
                    });
                })
            
            axios.get(`http://127.0.0.1:8000/IMGSched/people2/`)
            .then(res => {
                this.setState({
                    people: res.data
                });
                const accounts = this.state.people;
                console.log(`${this.props.username}`);
                for(var i=0, len = accounts.length;i<len;++i) {
                    if (accounts[i].user_name.username == `${this.props.username}` ) {
                        console.log(`${accounts[i].admin_value}`);
                        this.setState({
                            admin_value: {
                                is_admin: accounts[i].admin_value
                            }
                        });
                    }
                }
            })
            
        }
    }

    
    render() {
        return(
            <div id="timeline_list2" >
                {
                    this.state.events.map( c => (
                        <div key={c.id} className="timeline_list_child">   
                                <div className="timeline_detail_div">
                                    <div id="head_div"><h3>{c.name}</h3></div>
                                    <p>{c.description}</p>
                                    <p>Venue: {c.venue} , Manager: {c.manager.user_name.username}</p>
                                    <p>Planned for: {c.date}</p>
                                </div>
                        <div id="comment"><CommentList eventID={c.id} /></div>
                        <CommentForm eventID={c.id} requestType={`POST`}/>
                        <div>{ `${this.props.username}` }</div>
                        </div>
                    ))
                } 
            </div>
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
 

export default connect(mapStateToProps, null)(EventDetail)