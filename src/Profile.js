import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';





const Profile = () => {
    const links = [{name: 'instagram', url: 'myspace.com'},{name: 'facebook', url: 'facebook.com'},{name: 'youtube', url: 'youtube.com'}]
    return (
        <div>
            <div>@ealulema</div>
            {links.map((link, idx) => 
                (<a target='_blank' rel="noopener noreferrer" href={link.url}>
                <div key={idx}>
                <div>{link.name}</div>
                </div>
                </a>
                )
            )}
        </div>
    )
}

export default Profile