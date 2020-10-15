import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';

import AuthService from "./services/auth.service";

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
    margin: 0px;
  }
`;

const StyledLinkBox = styled.a`
  width: 100%;
  height: 100%;
  padding: 6px;
  background-color: blue;
  margin: 10px;
  text-decoration: none;
  color: white;
  border-radius: 5px;

  @media only screen and (min-width: 440px) {
    width: 500px;
    height: 30px;
  }
`

const StyledHeader = styled.div`
  font-size: 20px;
  font-weight: bold;
`

const StyledTextContainer = styled.div`
  height: 100%;
`

const StyledText = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
`

const StyledLinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledImg = styled.img`
  border-radius: 50%;
  width: 96px;
  height: 96px;
  display: block;
  object-fit: contain;
  object-position: initial;
  filter: none;
  background-color: aqua;
`

export default class ProfileView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: {},
            editMode: false,
            links: [],
        };
    }

    async componentDidMount() {
      let currentUser = await AuthService.getUser(this.props.match.params.username);
      this.setState({
        username: currentUser.username,
        links: currentUser.links
      })
    }

    render() {
      const { links, username } = this.state;
        return (
            <StyledContainer>
              <Header/>
                <StyledDiv>
                    <StyledImg></StyledImg>
                    <StyledHeader>@{username}</StyledHeader>
                    {links?.map((link, idx) =>
                        (
                          <StyledLinkContainer>
                            <StyledLinkBox target='_blank' rel="noopener noreferrer" href={link}>
                                <StyledTextContainer key={idx}>
                                    <StyledText>{link}</StyledText>
                                </StyledTextContainer>
                            </StyledLinkBox>
                        </StyledLinkContainer>
                        )
                    )}
                </StyledDiv>
            </StyledContainer>
        )
    }
}