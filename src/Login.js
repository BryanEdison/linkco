import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import AuthService from "./services/auth.service";



const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 30vh;
    padding: 50px;
    background-color: #f9f9f9;

    @media only screen and (min-width: 440px) {
        min-height: 100vh;
        margin: 0px;
    }
`

const SignupContainer = styled.div`
    margin: 100px 0;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
`

const StyledHeader = styled.div`
    font-size: 24px;
    margin-bottom: 30px;
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

 export default class Login extends Component {
     constructor(props) {
         super(props)
         this.state = {
            password: '',
            username: '',
         }
     }

     handleUsername = (event) => {
        this.setState({
            username: event.target.value
        })
        event.preventDefault()
     }

    handlePassword = (event) => {
        this.setState({
            password: event.target.value
        })
        event.preventDefault()
    }


    handleSubmit = (event) => {
        AuthService.login(this.state.username, this.state.password).then(
            (response) => {
              this.props.history.push("/profile");
            },
            error => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              this.setState({
                loading: false,
                message: resMessage
              });
            }
          );
          event.preventDefault();
    }


     render() {
         const { username, password } = this.state;
        return (
            <StyledContainer>
                <SignupContainer>
                <StyledHeader>Log in to your LinkCo account</StyledHeader>
                <form onSubmit={this.handleSubmit}>
                <div>Username</div>
                <StyledInput
                    type="text"
                    value={username}
                    onChange={this.handleUsername}
                    onClick={this.handleClickUsername}
                />     
                <div>Password</div>           
                <StyledInput
                    type="password"
                    value={password}
                    onChange={this.handlePassword}
                    onClick={this.handleClickPassword}
                />
                <StyledButton type="submit">Submit</StyledButton>
                </form>
                <div>Forgot your password? Click here to reset</div>
                    <Link to="/signup/" style={{ color: '#635858', textDecoration: 'none' }}>
                        <div>Don't have an account?</div>
                    </Link>
                </SignupContainer>
            </StyledContainer>
        )
     }
 }