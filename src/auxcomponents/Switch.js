import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    width: 100px;
    height: 50px;
    background: grey;
    border-radius: 100px;
    transition: background-color .2s;
    content: '';
    top: 2px;
    left: 2px;
    width: 45px;
    height: 45px;
    border-radius: 45px;
    transition: 0.2s;
    background: #fff;
    box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
`

const StyledInput = styled.input`
    // height: 0;
    // width: 0;
    // visibility: hidden;
    left: ${props => props.checked && 'calc(100% - 2px)'};
    transform: ${props => props.checked && 'translateX(-100%)'};
`

const StyledSwitchButton = styled.span`
    content: '';
    top: 2px;
    left: 2px;
    width: 45px;
    height: 45px;
    border-radius: 45px;
    transition: 0.2s;
    background: #fff;
    box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
`
const StyledSwitchContainer = styled.div`
    display: flex;
`

const Switch = ({ isOn, handleToggle, idx}) => {
    return (
        <StyledSwitchContainer>
        <div>Delete</div>
        <StyledInput
        type="checkbox"
        checked={isOn}
        onChange={() => handleToggle(idx)}
        />
        </StyledSwitchContainer>
    )
}

export default Switch;