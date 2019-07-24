import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import AdminCreationForm from '../components/AdminCreateForm'; 
const API_URL= 'http://localhost:8000';

class CreateAdminView extends React.Component {
    render () {
        return(
            <AdminCreationForm />
        );
    }
}
export default CreateAdminView