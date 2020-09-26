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
            email: '',
            password: '',
            confirmPassword: '',
            clickedEmail: false,
            clickedUsername: false,
            clickedPassword: false,
            clickedRepeatPassword: false,
            showPasswordMismatchError: false,
        }
    }

    componentDidMount() {
        if (!this.props.url) {
            this.setState({username: ''})
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
        this.setState({clickedEmail: true})
    }

    handleClickUsername = () => {
        //two if conditions to set state to username or typed input depending on clickk and if empty
        if (this.state.username === 'username')
        this.setState({username: '', clickedUsername: true})
    }

    handlePasswordClick = () => {
        this.setState({ clickedPassword: true })
    }

    handleRepeatPasswordClick = () => {
        this.setState({ clickedRepeatPassword: true})
    }

    handleConfirmPasswordBlur = () => {
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ showPasswordMismatchError: true})
        }
    }

    render() {

        const { email, username, password, confirmPassword, clickedPassword, clickedRepeatPassword, clickedEmail, clickedUsername, showPasswordMismatchError } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    {clickedEmail ? 
                    <StyledInput
                    type='text'
                    value={email}
                    onChange={this.handleEmail}
                    /> : <StyledInput
                    onClick={this.handleClickEmail}
                    onBlur={this.handleBlurEmail}
                    type='text'
                    value={'Email'}
                    onChange={this.handleEmail}
                    /> }
                </div>
                <div>
                    {clickedUsername ? <StyledInput
                    type="text"
                    value={username}
                    onChange={this.handleUsername}
                    onClick={this.handleClickUsername}
                    /> : <StyledInput
                    type="text"
                    value={username || 'username'}
                    onChange={this.handleUsername}
                    onClick={this.handleClickUsername}
                    />}
                </div>
                <div>
                       {clickedPassword ?
                       <StyledInput
                        type="text"
                        value={password}
                        onChange={this.handlePassword}
                       /> : 
                       <StyledInput
                       type="text"
                       value={"Password"}
                       onChange={this.handlePassword}
                       onClick={this.handlePasswordClick}
                      />}
                </div>
                <div>
                        {clickedRepeatPassword ? <StyledInput
                        type="text"
                        value={confirmPassword}
                        onChange={this.handleConfirmPassword}
                        onBlur={this.handleConfirmPasswordBlur}
                        /> : <StyledInput
                        type="text"
                        value={"Repeat Password"}
                        onClick={this.handleRepeatPasswordClick}
                        onChange={this.handleConfirmPassword}
                        onBlur={this.handleConfirmPasswordBlur}
                        /> }
                </div>
                        {showPasswordMismatchError && <StyledMismatchError>Password and Repeat Password fields must match
</StyledMismatchError> }
                <button disabled={showPasswordMismatchError} type="submit">Submit</button>
            </form>
        )
    }
}