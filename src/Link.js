import React, { Component } from 'react'
import styled from 'styled-components'
import AuthService from "./services/auth.service";
import { IoMdAnalytics, IoIosImage, IoIosTrash } from 'react-icons/io';

const StyledLinkContainer = styled.div`
  align-items: center;
  background-color: rgb(245, 245, 245);
  height: 100px;
  width: 580px;
  margin: 20px;
`

const StyledLinkInfo = styled.div`
	padding: 15px;
`
const StyledLinkName = styled.div`
  font-weight: bold;
`

const StyledLinkUrl = styled.div`
	font-size: 14px;
	color: #504e4e
`
const StyledLinkFooter = styled.div`
  display: flex;
	margin: 15px 0 0 0;
	justify-content: space-between;
`
const StyledLeft = styled.div`
	display: flex;
`

const StyledIcon = styled.div`
	margin: 0px 8px;
	cursor: pointer;
	color: slategrey;
`

const StyledDividerTitle = styled.div`
	background-color: white;
	text-align: center;
	font-weight: bold;
`

const StyledExpandBox = styled.div`
	background-color: rgb(245 245 245);
	text-align: center;
	padding: 10px;
`

export default class Link extends Component {

	constructor(props) {
		super(props);

		this.state = {
			link: {},
			clickedIcon: ''
		}
	}

	componentDidMount() {
		this.setState({ link: this.props.link})
	}

	handleIconClick = (iconName) => {
		this.setState({ clickedIcon: iconName});
	}

	handleDelete = (link, handleLinkChange, handleTabLinkChange) => {
		AuthService.deleteLink(this.props.id, link)
			.then(response => {
				if (response.status === 200) {
					handleLinkChange()
					handleTabLinkChange()
					this.setState({
						links: response.data.user,
						newLink: '',
						newTitle: '',
						editMode: false
					})
				}
			})
	}

	render() {
		const { clickedIcon } = this.state;
		const { idx, link, handleLinkChange, handleTabLinkChange } = this.props;
		return (
			<StyledLinkContainer>
				<StyledLinkInfo>
					<div key={idx}>
						<StyledLinkName>{link.name}</StyledLinkName>
						<StyledLinkUrl>{link.url}</StyledLinkUrl>
					</div>
					<StyledLinkFooter>
						<StyledLeft>
							<StyledIcon onClick={() => { this.handleIconClick('Link Analytics') }}>
								<IoMdAnalytics size={25} />
							</StyledIcon>
							<StyledIcon onClick={() => { this.handleIconClick('Thumbnail Edit') }}>
								<IoIosImage size={25} />
							</StyledIcon>
						</StyledLeft>
						<StyledIcon onClick={() => { this.handleDelete(link.id, handleLinkChange, handleTabLinkChange) }}>
							<IoIosTrash size={25} />
						</StyledIcon>
					</StyledLinkFooter>
				</StyledLinkInfo>
				{clickedIcon &&
					<React.Fragment>
						<StyledDividerTitle>
							{clickedIcon}
						</StyledDividerTitle>
						<StyledExpandBox>
							{`This link has been clicked ${link.visitors} times`}
						</StyledExpandBox>
					</React.Fragment>}
			</StyledLinkContainer>
		)
	}
}