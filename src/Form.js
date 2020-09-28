import React, { Component } from 'react';
import styled from 'styled-components';

const StyledMismatchError = styled.div`
    color: white;
    background-color: red;
    border-radius: 5px;
    padding: 0 10px;
`

const StyledInput = styled.input`
    margin: 30px 0;
    border-width: 0px;
    display: block;
    height: inherit;
    border-bottom: 1px solid #d7dce1;
    width: 100%;
    outline: none;
    line-height: inherit;
    font-size: inherit;
    letter-spacing: inherit;
    color: ${props => props.clickedInput ? "black" : "grey"};
`

const StyledButton = styled.button`
    background-color: #8ccfe4;
    width: 100%;
    border: 0;
    border-radius: 8px;
    margin: 20px 0;
    padding: 9px 14px;
    color: white;
    font-weight: bolder;
`

const StyledSignin = styled.div`
    text-align: center;
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
            showPasswordMismatchError: false,
            minimumCharError: false,
            showPasswordNumberRequiredError: false,
        }
    }

    componentDidMount() {
        if (!this.props.url) {
            this.setState({ username: 'username' })
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
        this.setState({
            password: event.target.value
        })
        if (event.target.value === this.state.confirmPassword) {
            this.setState({ showPasswordMismatchError: false })
        }
        if (event.target.value !== this.state.confirmPassword && this.state.confirmPassword !== 'confirm password') {
            this.setState({ showPasswordMismatchError: true })
        }
        if (event.target.value.length > 5) {
            this.setState({ minimumCharError: false })
        }

        let hasNumber = /\d/;

        if (hasNumber.test(event.target.value)) {
            this.setState({ showPasswordNumberRequiredError: false })
        }
    }

    handleConfirmPassword = (event) => {
        if (this.state.password === this.state.confirmPassword &&
            this.state.confirmPassword !== event.target.value) {
            this.setState({ showPasswordMismatchError: true })
        }
        this.setState({
            confirmPassword: event.target.value
        })
        if (this.state.password === event.target.value) {
            this.setState({ showPasswordMismatchError: false })
        }
    }

    handleSubmit = (event) => {
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ showPasswordMismatchError: true })
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
            this.setState({ email: 'email' })
        }
    }

    handleClickUsername = () => {
        if (this.state.username === 'username') {
            this.setState({ username: '' })
        }
    }

    handleClickUsernameBlur = () => {
        if (this.state.username === '') {
            this.setState({ username: 'username' })
        }
    }

    handlePasswordClick = () => {
        if (this.state.password === 'password') {
            this.setState({ password: '' })
        }
    }

    handleRepeatPasswordClick = () => {
        if (this.state.confirmPassword === 'confirm password') {
            this.setState({ confirmPassword: '' })
        }
    }

    handleConfirmPasswordBlur = () => {
        if (this.state.confirmPassword === '') {
            this.setState({ confirmPassword: 'confirm password' })
        } else if (this.state.password !== this.state.confirmPassword && this.state.confirmPassword !== 'confirm password') {
            this.setState({ showPasswordMismatchError: true })
        }
    }

    handlePasswordBlur = () => {
        if (this.state.password === '') {
            this.setState({ password: 'password' })
        } else {
            if (this.state.password.length < 6) {
                this.setState({ minimumCharError: true })
            }
            let hasNumber = /\d/;

            if (!hasNumber.test(this.state.password)) {
                this.setState({ showPasswordNumberRequiredError: true })
            }
        }
    }

    render() {

        const { email, username, password, confirmPassword, minimumCharError, showPasswordMismatchError, showPasswordNumberRequiredError } = this.state
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
                        type="password"
                        value={password}
                        onChange={this.handlePassword}
                        onClick={this.handlePasswordClick}
                        onBlur={this.handlePasswordBlur}
                    />
                </div>
                {minimumCharError && <StyledMismatchError>Password must be at least 6 characters
    </StyledMismatchError>}
                {showPasswordNumberRequiredError && <StyledMismatchError>Password must contain at least 1 number
    </StyledMismatchError>}
                <div>
                    <StyledInput
                        type="password"
                        value={confirmPassword}
                        onClick={this.handleRepeatPasswordClick}
                        onChange={this.handleConfirmPassword}
                        onBlur={this.handleConfirmPasswordBlur}
                    />
                </div>
                {showPasswordMismatchError && <StyledMismatchError>Password fields must match
</StyledMismatchError>}
                <StyledButton disabled={showPasswordMismatchError} type="submit">Submit</StyledButton>
                <StyledSignin>Already have an account?</StyledSignin>
            </form>
        )
    }
}