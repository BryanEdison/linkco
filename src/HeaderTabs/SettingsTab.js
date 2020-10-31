import React from 'react'
import styled from 'styled-components'

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

const SettingsTab = (props) => {
    const user = props.user
return (
    <div>
      Adjust your settings here
    </div>
)
}

export default SettingsTab