import React, { Component } from 'react'


export default class Form extends Component {
    constructor(props) {
        super(props)
        //possibly antipattern to copy state from props but can't think of better solution for usecase
        this.state = {
            username: this.props.url,
            email: '',
            password: '',
            confirmPassword: '',
            clickedEmail: false,
            clickedUsername: false,
            clickedPassword: false,
            clickedRepeatPassword: false,
        }
    }
    handleUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handlePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleConfirmPassword = (event) => {
        this.setState({
            confirmPassword: event.target.value
        })
    }

    handleSubmit = (event) => {
        alert(`${this.state.username} ${this.state.email} ${this.state.password}`)
        event.preventDefault()
    }
    
    handleClickEmail = () => {
        this.setState({clickedEmail: true})
    }

    handleClickUsername = () => {
        this.setState({username: ''})
    }

    handlePasswordClick = () => {
        this.setState({ clickedPassword: true })
    }

    handleRepeatPasswordClick = () => {
        this.setState({ clickedRepeatPassword: true})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    {this.state.clickedEmail ? 
                    <input
                    type='text'
                    value={this.state.email}
                    onChange={this.handleEmail}
                    /> : <input
                    onClick={this.handleClickEmail}
                    onBlur={this.handleBlurEmail}
                    type='text'
                    value={'Email'}
                    onChange={this.handleEmail}
                    /> }

                </div>
                <div>
                    <input
                    type="text"
                    value={this.state.username}
                    onChange={this.handleUsername}
                    onClick={this.handleClickUsername}
                    />
                </div>
                <div>
                       {this.state.clickedPassword ?
                       <input
                        type="text"
                        value={this.state.password}
                        onChange={this.handlePassword}
                       /> : 
                       <input
                       type="text"
                       value={"Password"}
                       onChange={this.handlePassword}
                       onClick={this.handlePasswordClick}
                      />}
                </div>
                <div>
                        {this.state.clickedRepeatPassword ? <input
                        type="text"
                        value={this.state.confirmPassword}
                        onChange={this.handleConfirmPassword}
                        /> : <input
                        type="text"
                        value={"Repeat Password"}
                        onClick={this.handleRepeatPasswordClick}
                        onChange={this.handleConfirmPassword}
                        /> }
                </div>
                <button type="submit">Submit</button>
            </form>
        )
    }
}