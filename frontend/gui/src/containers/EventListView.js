import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class EventList extends React.Component {
    
    state = {
        events: [],
        invites: [],
    }

    componentDidMount() {
        if (this.props.token) {
            console.log(this.props.token);
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${this.props.token}`
            }
            axios.get('http://127.0.0.1:8000/IMGSched/schedule2/')
                .then(res => {
                    this.setState({
                        events: res.data
                    });
                })
            axios.get('http://127.0.0.1:8000/IMGSched/invites/')
                .then(res => {
                    this.setState({
                        invites: res.data
                    });
                })
        }
    }


    
    render() {
        return(
            <ul id="timeline_list" style={{listStyleType: 'none', paddingLeft: 0, width: '80%'}}>
                {
                    this.state.events.map( c => (
                        <li key={c.id} align="start">
                            <Link to={`/IMGSched/schedule/${c.id}`} className="bubble">
                                <div id="timeline_date">{c.date} <div id="triangle_right"></div></div>
                                <div className="bubble_decor">
                                    <h3>{c.name}</h3>
                                    <p>{c.description}</p>
                                    <p>Venue: {c.venue} , Manager: {c.manager.user_name.username}</p>
                                </div>
                            </Link> 
                        </li>
                    ))
                } 
                  
            </ul>
        );
    }
}

const mapStateToProps = state => {
    return {
      isAuthenticated:  state.token!== null,
      token: state.token
    };
  }
 

export default connect(mapStateToProps, null)(EventList)