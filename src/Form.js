import React, { Component } from 'react'


export default class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            comments: '',
            topic: 'React',
        }
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleCommentsChange = (event) => {
        this.setState({
            comments: event.target.value
        })
    }

    handleTopicChange = (event) => {
        this.setState({
            topic: event.target.value
        })
    }

    handleSubmit = (event) => {
        alert(`${this.state.username} ${this.state.comments} ${this.state.topic}`)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                Form Component
                <div>
                    <label> Username </label>
                    <input
                    type='text'
                    value={this.state.username}
                    onChange={this.handleUsernameChange}
                    />

                </div>
                <div>
                    <label>Comments</label>
                    <textarea
                    value={this.state.comments}
                    onChange={this.handleCommentsChange}
                    />
                </div>
                <div>
                    <label>Topic</label>
                    <select value={this.state.topic} onChange={this.handleTopicChange}>
                        <option value="React"> React </option>
                        <option value="Vue"> Vue </option>
                        <option value="Angular"> Angular </option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        )
    }
}