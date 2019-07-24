import React from 'react';
import fb from '../images/fb.png';
import insta from '../images/insta.png';
import tw from '../images/tw.png';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../store/actions/auth';
const CustomLayout = (props) => {
    return (
        <div id="root-grandchild">
            <div className="header">
            <div id="header1">
                IMGSched
            </div>
            <div id="header2">
                <table>
                    <tbody>
                        <tr>
                            <td><a href="">Home</a></td>
                            <td><Link to="/IMGSched/createEvent">Create event</Link></td>
                            <td><Link to="/IMGSched/schedule">Schedule</Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="header3">
                {
                    props.isAuthenticated ?
                    <Button className="logout_button" onClick={props.logout}>Log Out</Button>
                    :
                    <span><Link to="/IMGSched/signUp">Sign Up</Link>
                    <Link to="/IMGSched/logIn">Log In</Link></span>

                }
            </div>
            </div>
            <div className="dummy"></div>
            <div className="mover">
                <div className="mover1">Contact Us:</div>
                <div className="mover2">
                    <table>
                        <tbody>
                            <tr>
                            <td><img src={fb} alt="" height="50" width="50" /></td>
                            <td><img src={insta} alt="" height="50" width="50" /></td>
                            <td><img src={tw} alt="" height="50" width="50" /></td>                    
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="content_block">
                {props.children}    
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));
