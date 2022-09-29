import React from 'react';
import { AiFillLinkedin, AiOutlineGithub } from 'react-icons/ai';

const Footer = () => {
    return (
        <div className='footer-container'>
            <p>
                2022 Addi Coding All rights reserved
            </p>
            <p>
                <AiFillLinkedin/>
                <AiOutlineGithub/>
            </p>
        </div>
    )
}

export default Footer
