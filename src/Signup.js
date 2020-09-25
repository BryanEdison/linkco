import React from 'react';
import Form from './Form';
import styled from 'styled-components';
import {Link, useLocation} from "react-router-dom";


const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    min-height: 30vh;
    margin: 50px;

    @media only screen and (min-width: 440px) {
        min-height: 100vh;
        margin: 0px;
    }
`

const SignupContainer = styled.div`
    margin: 100px;
`

const StyledHeader = styled.div`
    font-size: 25px;
    font-weight: bolder;
    margin-bottom: 30px;
`

 const Signup = (props) => {
     const { username } = props.match.params
     console.log(props)
     return (
         <StyledContainer>
             <SignupContainer>
             <StyledHeader>Sign up for your LinkCo account</StyledHeader>
            <Form url={username}/>
             </SignupContainer>
         </StyledContainer>
     )
 }




 export default Signup