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

 const Signup = () => {
    let location = useLocation();
     return (
         <StyledContainer>
             <SignupContainer>
             <StyledHeader>Sign up for your LinkCo account</StyledHeader>
            <Form url={location.url}/>
             </SignupContainer>
         </StyledContainer>
     )
 }




 export default Signup