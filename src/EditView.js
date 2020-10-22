import React, { Component } from 'react'
import styled from 'styled-components'

const StyledEditView = styled.div`
  display: none;

  @media only screen and (min-width: 500px) {
    display: flex;
    width: 100%;
  }
`

const StyledEditLinks = styled.div`
  margin: 0 10px;
`

const StyledEditHeader = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
  align-items: center;
  height: 58px;
  margin: 0px 15px;
  border: 1px solid #7b757561;
  border-color: 2px grey;
`

export default class EditView extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {

        return (
            <StyledEditView>
            <StyledEditHeader>
              <StyledEditLinks>Links</StyledEditLinks>
              <StyledEditLinks>Background</StyledEditLinks>
              <StyledEditLinks>Analytics</StyledEditLinks>
              <StyledEditLinks>Settings</StyledEditLinks>
            </StyledEditHeader>
          </StyledEditView>
            )
    }
}