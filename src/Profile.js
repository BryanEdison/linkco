import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Switch from './auxcomponents/Switch'

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

const StyledButton = styled.button`
  background-color: lightblue;
  margin: 20px;
  border-radius: 6px;
`

// const StyledLinkContainer = styled.div`
//   back
// `;


export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: {},
            editMode: false
        };
    }

    async componentDidMount() {
      this.setState({currentUser: await AuthService.getCurrentUser(this.props.userid)})
    }

    handleEdit = () => {
      console.log('edit clicked')
      this.setState({ editMode: true })
    }

    handleSave = () => {
      console.log('save clicked')
      this.setState({ editMode: false })
    }

    render() {
      console.log('state', this.state)
        const links = [{ name: 'instagram', url: 'https://instagram.com/ealulema' }, { name: 'facebook', url: 'https://facebook.com/ealulema' }, { name: 'youtube', url: 'https://youtube.com' }]
        return (
            <StyledContainer>
              <Header/>
                <StyledDiv>
                    <StyledHeader>@{this.state.currentUser?.user?.username}</StyledHeader>
                    { this.state.editMode ? <StyledButton onClick={this.handleSave}>Save Changes</StyledButton> :
                    <StyledButton onClick={this.handleEdit}>Edit Profile</StyledButton> }
                    {links.map((link, idx) =>
                        (
                          <React.Fragment>
                        <Switch/>
                        <StyledLinkBox target='_blank' rel="noopener noreferrer" href={link.url}>
                            <StyledTextContainer key={idx}>
                                <StyledText>{link.name}</StyledText>
                            </StyledTextContainer>
                        </StyledLinkBox>
                        </React.Fragment>
                        )
                    )}
                </StyledDiv>
            </StyledContainer>
        )
    }
}