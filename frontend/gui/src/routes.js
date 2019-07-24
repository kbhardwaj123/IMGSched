import React from 'react';
import { Route } from 'react-router-dom';
import EventList from './containers/EventListView';
import EventDetail from './containers/EventDetailView';
import CreateUserView from './containers/CreateUserView';
import CreateAdminView from './containers/CreateAdminView';
import CreateEvent from './containers/CreateEventView';
import LogInView from './containers/LogInView';

const BaseRouter = () => (
    <div id="content_block-child">
        <Route exact path="/IMGSched/schedule" component={EventList} />
        <Route exact path="/IMGSched/schedule/:eventID" component={EventDetail} />
        <Route exact path="/IMGSched/signUp" component={CreateUserView} />
        <Route exact path="/IMGSched/adminUp" component={CreateAdminView} />
        <Route exact path="/IMGSched/createEvent" component={CreateEvent} />
        <Route exact path="/IMGSched/logIn" component={LogInView} />
    </div>
);

export default BaseRouter