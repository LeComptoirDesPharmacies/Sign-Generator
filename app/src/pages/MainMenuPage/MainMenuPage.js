import './MainMenuPage.scss';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NavTabs from "../../components/navTabs/navTabs"
import { NotificationContainer } from 'react-notifications';
import '../../components/modalMessage/notification.scss';

//Page qui contient le menu
class MainMenuPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
               <NavTabs location={this.props.location}/>
               <NotificationContainer />
            </div>
        );
    }
}
export default withRouter(MainMenuPage);