import React, { Component } from 'react';
import Form from './Form';
import styled from 'styled-components';
import Header from './Header';
import { Link } from 'react-router';
import './App.css';

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

const StyledFormContainer = styled.div`
  margin: 10px;
  border-radius: 10px;
  border: 1px solid rgb(49 109 218);
  background-color: rgb(255, 255, 255);
  overflow: hidden;
  max-width: 84vw;
  height: 50px;
`

const StyledForm = styled.form`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  padding: 0px 16px 0px 32px;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 50px;
`

const StyledHeading = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 12px;

  @media only screen and (min-width: 440px) {
    font-size: 35px;
  }
`

const StyledSubtext = styled.div`
  font-size: 12px;
  margin-bottom: 22px;

  @media only screen and (min-width: 440px) {
    font-size: 20px;
  }
`

const StyledInput = styled.input`
  border-width: 0px;
  display: block;
  height: inherit;
  max-width: 100%;
  outline: none;
  line-height: inherit;
  font-size: inherit;
  letter-spacing: inherit;
  border: none;
  color: ${props => props.clickedInput ? "black" : "grey"};
`
const StyledSpan = styled.span`
  font-weight: 100;
  font-size: 20px;
  color: #2E3D48;
  -webkit-animation: 1s blink step-end infinite;
  -moz-animation: 1s blink step-end infinite;
  -ms-animation: 1s blink step-end infinite;
  -o-animation: 1s blink step-end infinite;
  animation: 1s blink step-end infinite;

  @keyframes "blink" {
    from, to {
      color: transparent;
    }
    50% {
      color: black;
    }
  }
  
`

const StyledInputContainer = styled.div`
  display: flex;
`

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #00a1ff;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  color: white;
`

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      url: '',
      clickedInput: false
    }
  }

  handleUrlChange = (event) => {
    this.setState({url: event.target.value})
  }

  handleClick = () => {
    this.setState({url: '', clickedInput: true})
  }

  handleBlur = () => {
    this.setState({ clickedInput: false })
  }

  render() {
    return (
      <StyledContainer>
      <Header/>
      <StyledDiv>
        <StyledHeading>The only link you'll need for all your social needs</StyledHeading>
        <StyledSubtext>Connect your audience through all your social apps with one link</StyledSubtext>
        <StyledFormContainer>
        <StyledForm>
          <StyledInputContainer>
            <span>
              linkco.in
            </span>
            { !this.state.clickedInput &&  <StyledSpan
            >/</StyledSpan> }
            {this.state.clickedInput ? <StyledInput
              type='text'
              value={`${this.state.url}`}
              onChange={this.handleUrlChange}
              onBlur={this.handleBlur}
              onClick={this.handleClick}
            /> : <StyledInput
              type='text'
              value={"yournamehere"}
              onChange={this.handleUrlChange}
              onBlur={this.handleBlur}
              onClick={this.handleClick}
            /> }
            { this.state.url && <Circle>&#8594;</Circle> }
          </StyledInputContainer>
        </StyledForm>
        </StyledFormContainer>
      </StyledDiv>
      </StyledContainer>
    )
  }
}
