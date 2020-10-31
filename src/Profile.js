import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Switch from './auxcomponents/Switch';
import EditView from './EditView';

import AuthService from "./services/auth.service";

const StyledContainer = styled.div`
  height: 100vh;
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

const StyledProfileView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 30vh;

  @media only screen and (min-width: 440px) {
    background-color: rgb(123 117 117 / 10%);
    padding: 40px 0;
    height: 800px;
  }
`;

const StyledMobileView = styled.div`
  @media only screen and (min-width: 440px) {
    margin: 20px 50px;
    height: 80%;
    background-color: white;
    border: solid 28px black;
    border-radius: 50px;
    padding: 15px;
    min-width: 300px;
  }
`

const StyledInputContainer = styled.div`
    display: flex;
    align-items: center; 
`

const StyledLinkBox = styled.a`
  width: 100%;
  height: 100%;
  padding: 6px;
  background-color: blue;
  margin: 10px;
  text-decoration: none;
  color: white;
  border-radius: 10px;

  @media only screen and (min-width: 440px) {
    width: 280px;
    height: 50px;
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
  padding: 10px;
  border: none;
`

const StyledLinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

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

const StyledEditInput = styled.div`
  display: contents;
`;

const StyledBoxContainer = styled.div`
  border-radius: 10px;
  width: 100%;
  padding: 0px 14px;
  background-color: #f9f6f6;

  @media only screen and (min-width: 440px) {
    width: 20%;
  }
`

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

const StyledBodyContainer = styled.div`
  @media only screen and (min-width: 500px) {
    display: flex;
    justify-content: space-evenly;
    margin: 0 15px;
    height: 100%;
  }
`

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
      editMode: false,
      value: [],
      links: [],
      newLink: ''
    };
  }

  async componentDidMount() {
    let currentUser = await AuthService.getCurrentUser(this.props.userid);
    let value = [];
    currentUser.user.links.forEach((link) => {
      value.push(false)
    })
    await this.setState({
      currentUser: currentUser.user,
      username: currentUser.user.username,
      links: currentUser.user.links,
      value
    })
  }

  async componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.state.links) !== JSON.stringify(prevState.links)) {
      let currentUser = await AuthService.getCurrentUser(this.props.userid);
      let value = [];
      currentUser.user.links.forEach((link) => {
        value.push(false)
      })
      await this.setState({
        links: currentUser.user.links,
        value
      })
    } else {
      return false
    }
  }

  handleEdit = () => {
    this.setState({ editMode: true })
  }

  handleSave = () => {
    this.setState({ editMode: false })
    const updatedLinks = []
    const links = this.state.links.forEach((link, index) => {
      if (this.state.value[index] === false) {
        updatedLinks.push(link)
      }
    })
    AuthService.editUser(this.props.userid, updatedLinks)
      .then(response => {
        if (response.status === 200) {
          //Should be changed to API response instead
          this.setState({ links: updatedLinks })
        }
      })
  }

  handleToggleClick = (idx) => {
    let newValues = this.state.value;
    newValues[idx] = !newValues[idx];
    this.setState({ value: newValues })
  }

  handleChange = (event) => {
    this.setState({ newLink: event.target.value })
  }

  handleSubmit = (event) => {
    const parsedLink = `https://${this.state.newLink}`
    const updatedLinks = [...this.state.links, parsedLink]
    AuthService.editUser(this.props.userid, updatedLinks)
      .then(response => {
        if (response.status === 200) {
          //Should be changed to API response instead
          this.setState({ links: updatedLinks })
        }
      });
    this.setState({ newLink: '' })
    event.preventDefault();
  }

  handleLinkChange = () => {
    AuthService.getCurrentUser(this.props.userid)
      .then(response => {
        this.setState({ links: response?.user?.links})
      })
  }

  render() {
    const { links, username, newLink, editMode, currentUser } = this.state;
    return (
      <StyledContainer>
        <Header />
        <StyledBodyContainer>
          <EditView handleLinkChange={this.handleLinkChange} currentUser={currentUser} />
          <StyledProfileView>
            <StyledMobileView>
              <StyledImg></StyledImg>
              <StyledHeader>@{username}</StyledHeader>
              {editMode ? <StyledEditInput>
                <StyledButton onClick={this.handleSave}>Save Changes</StyledButton>
                <StyledBoxContainer>
                  <div>Add New Link</div>
                  <form onSubmit={this.handleSubmit}>
                    <StyledInputContainer>
                      <StyledSpan>https://</StyledSpan>
                      <StyledInput onChange={this.handleChange} value={newLink} />
                      {newLink.length > 1 && <button>Submit</button>}
                    </StyledInputContainer>
                  </form>
                </StyledBoxContainer>
              </StyledEditInput> :
                <StyledButton onClick={this.handleEdit}>Edit Profile</StyledButton>
              }
              {links?.map((link, idx) =>
                (
                  <StyledLinkContainer>
                    {editMode && <div>
                      <Switch
                        idx={idx}
                        isOn={this.state.value[idx] || false}
                        handleToggle={this.handleToggleClick}
                      />
                    </div>}
                    <StyledLinkBox target='_blank' rel="noopener noreferrer" href={link.url}>
                      <StyledTextContainer key={idx}>
                        <StyledText>{link.name}</StyledText>
                      </StyledTextContainer>
                    </StyledLinkBox>
                  </StyledLinkContainer>
                )
              )}
            </StyledMobileView>
          </StyledProfileView>
        </StyledBodyContainer>
      </StyledContainer>
    )
  }
}