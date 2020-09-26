import React, { Component } from 'react';
import styled from 'styled-components';

const StyledMismatchError = styled.div`
    color: white;
    background-color: red;
    border-radius: 5px;
`

const StyledInput = styled.input`
    margin: 5px;
`

export default class Form extends Component {
    constructor(props) {
        super(props)
        //possibly antipattern to copy state from props but can't think of better solution for usecase
        this.state = {
            username: this.props.url,
            email: 'email',
            password: 'password',
            confirmPassword: 'confirm password',
            clickedEmail: false,
            clickedUsername: false,
            clickedPassword: false,
            clickedRepeatPassword: false,
            showPasswordMismatchError: false,
            minimumCharError: false
        }
    }

    componentDidMount() {
        if (!this.props.url) {
            this.setState({username: 'username'})
        }
    }

    handleUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handlePassword = (event) => {
        if (this.state.password === this.state.confirmPassword) {
            this.setState({showPasswordMismatchError: false})
        }
        this.setState({
            password: event.target.value
        })
    }

    handleConfirmPassword = (event) => {
        if (this.state.password === this.state.confirmPassword) {
            this.setState({showPasswordMismatchError: false})
        }
        this.setState({
            confirmPassword: event.target.value
        })
    }

    handleSubmit = (event) => {
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({showPasswordMismatchError: true})
        }
        alert(`${this.state.username} ${this.state.email} ${this.state.password}`)
        event.preventDefault()
    }
    
    handleClickEmail = () => {
        if (this.state.email === 'email') {
            this.setState({ email: '' })
        }
    }

    handleBlurEmail = () => {
        if (this.state.email === '') {
            this.setState({ email: 'email'})
        }
    }

    handleClickUsername = () => {
        //two if conditions to set state to username or typed input depending on click and if empty
        if (this.state.username === 'username') {
            this.setState({username: '', clickedUsername: true})
        }
    }

    handleClickUsernameBlur = () => {
        if (this.state.username === '') {
            this.setState({username: 'username', clickedUsername: false})
        }
    }

    handlePasswordClick = () => {
        this.setState({ password: '' })
    }

    handleRepeatPasswordClick = () => {
        if (this.state.confirmPassword === 'confirm password') {
            this.setState({ confirmPassword: ''})
        }
    }

    handleConfirmPasswordBlur = () => {
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ showPasswordMismatchError: true})
        }
        if (this.state.confirmPassword === '') {
            this.setState({confirmPassword: 'confirm password'})
        }
    }

    handlePasswordBlur = () => {
        if (this.state.password === '') {
            this.setState({password: 'password'})
        }
        if (this.state.password.length < 6) {
            this.setState({ minimumCharError: true })
        }
    }

    render() {

        const { email, username, password, confirmPassword, minimumCharError, showPasswordMismatchError } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <StyledInput
                        onClick={this.handleClickEmail}
                        onBlur={this.handleBlurEmail}
                        type='text'
                        value={email}
                        onChange={this.handleEmail}
                    />
                </div>
                <div>
                    <StyledInput
                    type="text"
                    value={username}
                    onChange={this.handleUsername}
                    onClick={this.handleClickUsername}
                    onBlur={this.handleClickUsernameBlur}
                    />
                </div>
                <div>
                       <StyledInput
                       type="text"
                       value={password}
                       onChange={this.handlePassword}
                       onClick={this.handlePasswordClick}
                       onBlur={this.handlePasswordBlur}
                      />
                </div>
                    {minimumCharError && <StyledMismatchError>Password must be at least 6 characters
    </StyledMismatchError> }
                <div>
                        <StyledInput
                        type="text"
                        value={confirmPassword}
                        onClick={this.handleRepeatPasswordClick}
                        onChange={this.handleConfirmPassword}
                        onBlur={this.handleConfirmPasswordBlur}
                        />
                </div>
                        {showPasswordMismatchError && <StyledMismatchError>Password and Repeat Password fields must match
</StyledMismatchError> }
                <button disabled={showPasswordMismatchError} type="submit">Submit</button>
            </form>
        )
    }
}