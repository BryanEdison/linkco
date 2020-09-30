import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const StyledContainer = styled.div`
height: 100vh;
`

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 30vh;
  margin: 50px;

  @media only screen and (min-width: 440px) {
    min-height: 100vh;
    margin: 0px;
  }
`;

const StyledLinkBox = styled.a`
  width: 200px;
  height: 10px;
  background-color: blue;
  margin: 10px;
  text-decoration: none;
  color: white;
  border-radius: 4px;

  @media only screen and (min-width: 440px) {
    width: 500px;
    height: 30px;
  }
`

const StyledHeader = styled.div`
  font-size: 20px;
  font-weighht: bold;
`


const Profile = () => {
    const links = [{name: 'instagram', url: 'https://instagram.com/ealulema'},{name: 'facebook', url: 'https://facebook.com/ealulema'},{name: 'youtube', url: 'https://youtube.com'}]
    return (
        <StyledContainer>
            <StyledDiv>
            <StyledHeader>@ealulema</StyledHeader>
            {links.map((link, idx) => 
                (<StyledLinkBox target='_blank' rel="noopener noreferrer" href={link.url}>
                <div key={idx}>
                <div>{link.name}</div>
                </div>
                </StyledLinkBox>
                )
            )}
            </StyledDiv>
        </StyledContainer>
    )
}

export default Profile