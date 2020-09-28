import React from 'react';
import Form from './Form';
import styled from 'styled-components';
import Header from './Header';


const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
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

 const Signup = (props) => {
     const { username } = props.match.params
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