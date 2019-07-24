import React from 'react';
import { Link } from 'react-router-dom';
import UserCreationForm from '../components/UserCreateForm'; 

class CreateUserView extends React.Component {
    render () {
        return(
            <div id="content_block-grandchild">
                <UserCreationForm />
                <div>
                    <Link to="/IMGSched/adminUp">Create Admin</Link>
                </div>
            </div>
        );
    }
}
export default CreateUserView