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

    componentDidMount() {
        if (!this.props.url) {
            this.setState({username: ''})
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
        this.setState({username: '', clickedUsername: true})
    }

    handlePasswordClick = () => {
        this.setState({ clickedPassword: true })
    }

    handleRepeatPasswordClick = () => {
        this.setState({ clickedRepeatPassword: true})
    }

    render() {

        const { email, username, password, confirmPassword, clickedPassword, clickedRepeatPassword, clickedEmail, clickedUsername } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    {clickedEmail ? 
                    <input
                    type='text'
                    value={email}
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
                    {clickedUsername ? <input
                    type="text"
                    value={username}
                    onChange={this.handleUsername}
                    onClick={this.handleClickUsername}
                    /> : <input
                    type="text"
                    value={'username'}
                    onChange={this.handleUsername}
                    onClick={this.handleClickUsername}
                    />}
                </div>
                <div>
                       {clickedPassword ?
                       <input
                        type="text"
                        value={password}
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
                        {clickedRepeatPassword ? <input
                        type="text"
                        value={confirmPassword}
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