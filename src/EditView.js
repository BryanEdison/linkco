import React, { Component } from 'react'
import styled from 'styled-components'
import LinksTab from './HeaderTabs/LinksTab'
import BackgroundTab from './HeaderTabs/BackgroundTab'
import SettingsTab from './HeaderTabs/SettingsTab'

const StyledEditView = styled.div`
  display: none;

  @media only screen and (min-width: 500px) {
    display: block;
    width: 100%;
  }
`

const StyledEditLinks = styled.div`
  cursor: pointer;
  margin: 0 10px;
  &:hover {
    border-bottom: 2px solid black;
  }
`

const StyledEditHeader = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
  align-items: center;
  height: 58px;
  border: 1px solid #7b757561;
  border-color: 2px grey;
`

const StyledBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  align-items: center;
  justify-content: center;
`

const StyledLinkContainer = styled.div`
  align-items: center;
  background-color: #7b757561;
  height: 65px;
  width: 580px;
  margin: 20px;
  padding: 15px;
`

const StyledButton = styled.button`
  background-color: lightblue;
  margin: 20px;
  width: 580px;
  border-radius: 6px;
  padding: 15px;
  border: none;
`

export default class EditView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clickedTab: 'Links',
        };
    }

    handleTabClick = (clickedTab) => {
        this.setState({ clickedTab })
    }

    render() {
        const user = this.props.currentUser;
        let tab;
        if (this.state.clickedTab === 'Links') {
            tab = user._id && <LinksTab handleLinkChange={this.props.handleLinkChange} id={user._id} />
        }
        if (this.state.clickedTab === 'Background') {
            tab = <BackgroundTab user={user} />
        }
        if (this.state.clickedTab === 'Settings') {
            tab = <SettingsTab user={user} />
        }

        return (
            <StyledEditView>
                <StyledEditHeader>
                    <StyledEditLinks onClick={() => {this.handleTabClick('Links')}}>Links</StyledEditLinks>
                    <StyledEditLinks onClick={() => {this.handleTabClick('Background')}}>Appearance</StyledEditLinks>
                    <StyledEditLinks onClick={() => {this.handleTabClick('Settings')}}>Settings</StyledEditLinks>
                </StyledEditHeader>
                <StyledBodyContainer>
                    {tab}
                </StyledBodyContainer>
            </StyledEditView>
        )
    }
}