import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


function analyser(pk) {
    return "hi!!";
}

class CommentList extends React.Component {
    
    state = {
        comments: []
    }

    componentDidMount() {
        Axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
        }
        Axios.get(`http://127.0.0.1:8000/IMGSched/comments/`)
            .then(res => {
                this.setState({
                    comments: res.data
                });
            })
    }
    
    

    render() {
        const comment_list = this.state.comments;
        var filter_list = [];
        for (var i=0, len = comment_list.length;i<len;++i) {
            if(this.props.eventID===comment_list[i].event_name.id) {
                filter_list.push(comment_list[i]);
            }
        }
        return(
            <ul>
                {
                    filter_list.map( c => (
                        <li key={c.id} align="start">
                                <div>
                                    <p>{c.posted_by.user_name.username}</p>
                                    <p>{c.posted_on}</p>
                                    <p>{c.body}</p>
                                </div>
                             
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
 

export default connect(mapStateToProps, null)(CommentList)