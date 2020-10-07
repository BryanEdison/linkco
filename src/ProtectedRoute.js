import React from 'react'
import { Redirect } from 'react-router-dom'
import AuthService from './services/auth.service.js'

class ProtectedRoute extends React.Component {
    render() {
        const Component = this.props.component;
        const isAuthenticated = AuthService.checkAuth();
        return isAuthenticated ? (
            <Component userid={this.props.computedMatch.params.userid || null} />
        ) : (
            <Redirect to={{ pathname: '/login' }} />
        );
    }
}

export default ProtectedRoute;