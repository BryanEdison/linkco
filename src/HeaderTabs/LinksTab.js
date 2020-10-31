import React, { Component } from 'react'
import styled from 'styled-components'
import AuthService from "../services/auth.service";
import { IoMdAnalytics, IoIosImage, IoIosTrash } from 'react-icons/io';
import Link from '../Link';

const StyledLinkUrl = styled.div`
	font-size: 14px;
	color: #504e4e
`

const StyledIcon = styled.div`
	margin: 0px 8px;
	cursor: pointer;
	color: slategrey;
`

const StyledLinkContainer = styled.div`
  align-items: center;
  background-color: rgb(245, 245, 245);
  height: 100px;
  width: 580px;
  margin: 20px;
`

const StyledLinkParentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledButton = styled.button`
	background-color: #4cc3ea;
  margin: 20px;
  width: 580px;
	border-radius: 6px;
	color: white;
	font-weight: bold;
  padding: 8px;
	border: none;
	height: 50px;
`

const StyledEditInput = styled.div`
  display: contents;
`;

const StyledBoxContainer = styled.div`
  border-radius: 10px;
  width: 100%;
  padding: 14px;
  background-color: #f9f6f6;

  @media only screen and (min-width: 440px) {
    width: 580px;
  }
`

const StyledInputContainer = styled.div`
    display: flex;
    align-items: center; 
`

const StyledLeft = styled.div`
	display: flex;
`

const StyledLinkName = styled.div`
  font-weight: bold;
`

const StyledSpan = styled.span`
    border-width: 0px;
    display: block;
    padding: 1px 0px;
    height: inherit;
    border-bottom: 1px solid #d7dce1;
    outline: none;
		line-height: inherit;
		background-color: white;
    font-size: inherit;
    letter-spacing: inherit;
`

const StyledInput = styled.input`
    margin: 5px 0;
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
const StyledLinkFooter = styled.div`
  display: flex;
	margin: 15px 0 0 0;
	justify-content: space-between;
`

const StyledTitlePrompt = styled.div`
	font-size: 14px;
`

const StyledExpandBox = styled.div`
	background-color: rgb(245 245 245);
	text-align: center;
	padding: 10px;
`

const StyledLinkInfo = styled.div`
	padding: 15px;
`

const StyledDividerTitle = styled.div`
	background-color: white;
	text-align: center;
	font-weight: bold;
`

export default class LinksTab extends Component {
	constructor(props) {
		super(props);

		this.state = {
			editMode: false,
			newLink: '',
			newTitle: '',
			links: [],
			clickedIcon: ''
		}
	}

	componentDidMount() {
		if (this.props.id) {
			AuthService.getCurrentUser(this.props.id)
				.then(response =>
					this.setState({ links: response.user.links }))
		}
	}

	handleEdit = () => {
		//not the correct way to set state, should be derived from props.
		this.setState({ editMode: true })
	}

	handleTitleChange = (event) => {
		this.setState({ newTitle: event.target.value })
	}

	handleUrlChange = (event) => {
		this.setState({ newLink: event.target.value })
	}

	handleBlur = (handleLinkChange) => {
		if (this.state.newLink.length > 0 && this.state.newTitle.length > 0) {
			// const updatedLinks = this.state.links;
			const newLink = {
				name: this.state.newTitle,
				url: `https://${this.state.newLink}`,
				visitors: 0
			}

			AuthService.addLink(this.props.id, newLink)
				.then(response => {
					if (response.status === 200) {
						handleLinkChange()
						this.setState({
							links: response.data.user,
							newLink: '',
							newTitle: '',
							editMode: false
						})
					}
				})
		}
	}

	handleTabLinkChange = () => {
    AuthService.getCurrentUser(this.props.id)
      .then(response => {
        this.setState({ links: response?.user?.links})
      })
  }

	render() {
		const { handleLinkChange, id } = this.props;
		const { editMode, newLink, newTitle, links } = this.state;
		return (
			<StyledLinkParentContainer>
				<StyledButton onClick={this.handleEdit}>Add new link</StyledButton>
				{editMode && <StyledEditInput>
					<StyledBoxContainer>
						<StyledTitlePrompt>Add Title</StyledTitlePrompt>
						<form onSubmit={this.handleSubmit}>
							<StyledInputContainer>
								<StyledInput
									onBlur={() => this.handleBlur(handleLinkChange)}
									onChange={this.handleTitleChange}
									value={newTitle} />
							</StyledInputContainer>
							<StyledInputContainer>
								<StyledSpan>https://</StyledSpan>
								<StyledInput
									onBlur={() => this.handleBlur(handleLinkChange)}
									onChange={this.handleUrlChange}
									value={newLink} />
							</StyledInputContainer>
						</form>
					</StyledBoxContainer>
				</StyledEditInput>
				}
				{links?.map((link, idx) =>
					(
						<Link
							id={id}
							link={link}
							idx={idx}
							handleLinkChange={handleLinkChange}
							handleTabLinkChange={this.handleTabLinkChange}
						/>
					)
				)}
			</StyledLinkParentContainer>
		)
	}
}