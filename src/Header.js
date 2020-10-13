import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AuthService from './services/auth.service.js'

const StyledHeader = styled.div`
    display: flex;
    font-size: 20px;
    @media only screen and (min-width: 440px) {
        font-size: 30px;
      }
`

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    height: 64px;
`

const StyledHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0px 24px;
    width: 100%;
    justify-content: space-between;
`
const StyledSignup = styled.button`
    margin: 5px;
    height: 32px;
    padding: 0px calc(16px);
    border-radius: calc(8px);
    cursor: pointer;
    width: auto;
    position: relative;
    display: flex;
    flex-direction: row;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(38, 50, 56);
    background: rgb(162 192 247);
    border: none;
    outline: none;
`

const StyledLogin = styled.a`
    margin: 5px;
`

const StyledRightHeader = styled.div`
    display: flex;
    margin: 5px 0;
    align-items: center;
`

 const Header = (props) => {
     const isAuthorized = AuthService.checkAuth();
    return (
        <StyledContainer>
            <StyledHeaderContainer>
                <StyledHeader>linkco</StyledHeader>
                <StyledRightHeader>
                { isAuthorized ? <StyledSignup onClick={() => AuthService.logout()}>Log out</StyledSignup> : <React.Fragment><Link to="/login/" style={{ textDecoration: 'none', color: '#635858' }}>
                    <StyledLogin>Log In</StyledLogin>
                    </Link>
                        <Link to="/signup/" style={{ textDecoration: 'none' }}>
                            <StyledSignup> Sign up free</StyledSignup>
                        </Link> </React.Fragment> }
                </StyledRightHeader>
            </StyledHeaderContainer>
        </StyledContainer>
    )
}

export default Header