import React from 'react'
import '../styles/About.css'

const About = () => {
    return (
        <div className='about-panel'>
            <div className='about-panel-header'>
                <h2>About</h2>
            </div>
            <div className='about-panel-content'>
                <h4 className='app-description-header'>Product Backlog</h4>
                <h4 className='about-header'>A social application where users can post their own artwork, browse all artwork, and interact with other users' posts. Inspiration is drawn from other social applications such as Instagram and Pinterest.</h4>
            </div>
            <div className="about-product-backlog">
                <h4 className='product-backlog'>Product Backlog</h4>
                <p className='strike'>Implement file upload system - COMPLETED 10/1/23</p>
                <p>Implement likes and comments functionality in the backend</p>
                <p className='strike'>Check if a username/email already exists in the database - COMPLETED 10/1/23</p>
                <p>Fix bug where application redirects to login page upon refresh</p>
                <p>Allow users to add a profile picture and edit their profile</p>
                <p>Allow users to edit their posts</p>
            </div>
            <div className="dev-log">
                
            </div>
        </div>
    )
}

export default About
