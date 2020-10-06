import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { isEmail } from "validator";

import AuthService from "./services/auth.service";


const StyledMismatchError = styled.div`
    color: white;
    margin: 2px;
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

const StyledSpan = styled.span`
    border-width: 0px;
    display: block;
    padding: 1px 0px;
    height: inherit;
    border-bottom: 1px solid #d7dce1;
    outline: none;
    line-height: inherit;
    font-size: inherit;
    letter-spacing: inherit;
`

const StyledInputContainer = styled.div`
    display: flex;
    align-items: center; 
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
            password: '',
            confirmPassword: '',
            showPasswordMismatchError: false,
            minimumCharError: false,
            showPasswordNumberRequiredError: false,
            notValidEmailError: false,
            usernameExists: false,
            emailExists: false
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
        if (this.state.usernameExists) {
            AuthService.checkUserName(
                event.target.value
              ).then(
                response => {
                  this.setState({usernameExists: false})
                },
                error => {
                  this.setState({usernameExists: true})
                }
              );
        }
    }

    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        })
        if (isEmail(event.target.value)) {
            this.setState({notValidEmailError: false})
        } else {
            if (this.state.emailExists) {
                AuthService.checkEmail(
                    event.target.value
                  ).then(
                    response => {
                      this.setState({emailExists: false})
                      console.log(response)
                    },
                    error => {
                        console.log(error)
                      this.setState({emailExists: true})
                    }
                  );
            }
        }
    }

    handlePassword = (event) => {
        this.setState({
            password: event.target.value
        })
        if (event.target.value === this.state.confirmPassword) {
            this.setState({ showPasswordMismatchError: false })
        }
        if (event.target.value !== this.state.confirmPassword && this.state.confirmPassword !== '') {
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

      event.preventDefault()
    
        AuthService.register(
          this.state.username,
          this.state.email,
          this.state.password
        ).then(
          response => {
            console.log(response.data.message)
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            console.log(resMessage)
          }
        );

    }

    handleClickEmail = () => {
        if (this.state.email === 'email') {
            this.setState({ email: '' })
        }
    }

    handleBlurEmail = (event) => {
        if (!isEmail(event.target.value)) {
            this.setState({notValidEmailError: true})
        } else if (this.state.email === '') {
            this.setState({ email: 'email' })
        }
        if (this.state.email !== '') {
            AuthService.checkEmail(
                event.target.value
              ).then(
                response => {
                  this.setState({emailExists: false})
                  console.log('email', response)
                },
                error => {
                    console.log('email',error)
                  this.setState({emailExists: true})
                }
              );
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
        AuthService.checkUserName(
            this.state.username
          ).then(
            response => {
              this.setState({usernameExists: false})
              console.log(response)
            },
            error => {
                console.log(error)
              this.setState({usernameExists: true})
            }
          );
    }

    handleConfirmPasswordBlur = () => {
        if (this.state.password !== this.state.confirmPassword && this.state.confirmPassword !== '') {
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

        const { email, emailExists, username, password, confirmPassword, minimumCharError,
            showPasswordMismatchError, showPasswordNumberRequiredError,
            notValidEmailError, usernameExists } = this.state

        const disableSubmitButton = minimumCharError || showPasswordMismatchError || showPasswordNumberRequiredError || notValidEmailError;
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
                { notValidEmailError && <StyledMismatchError>Not a valid email address
                </StyledMismatchError> }
                { emailExists && <StyledMismatchError>Email exists already
                </StyledMismatchError> }
                <StyledInputContainer>
                    <StyledSpan>linkco.in/</StyledSpan>
                    <StyledInput
                        type="text"
                        value={username}
                        onChange={this.handleUsername}
                        onClick={this.handleClickUsername}
                        onBlur={this.handleClickUsernameBlur}
                    />
                </StyledInputContainer>
                { usernameExists && <StyledMismatchError>Username exists already
                </StyledMismatchError> }
                <div>
                <div>Password</div>
                    <StyledInput
                        type="password"
                        value={password}
                        onChange={this.handlePassword}
                        onBlur={this.handlePasswordBlur}
                    />
                </div>
                {minimumCharError && <StyledMismatchError>Password must be at least 6 characters
    </StyledMismatchError>}
                {showPasswordNumberRequiredError && <StyledMismatchError>Password must contain at least 1 number
    </StyledMismatchError>}
                <div>
                    <div>Confirm Password</div>
                    <StyledInput
                        type="password"
                        value={confirmPassword}
                        onChange={this.handleConfirmPassword}
                        onBlur={this.handleConfirmPasswordBlur}
                    />
                </div>
                {showPasswordMismatchError && <StyledMismatchError>Password fields must match
</StyledMismatchError>}
                <StyledButton disabled={disableSubmitButton} type="submit">Submit</StyledButton>
                <Link to="/login/" style={{ textDecoration: 'none', color: '#635858' }}>
                    <StyledSignin>Already have an account?</StyledSignin>
                    </Link>
            </form>
        )
    }
}