import React from 'react'
import BottomBar from '../components/BottomBar'
import NavBar from '../components/NavBar'
import WithAuth from '../components/WithAuth'
import AllPosts from '../components/AllPosts'

const Main = () => {
    return (
        <div>
            <NavBar />
            <AllPosts />
            <BottomBar />
        </div>
    )
}

export default WithAuth(Main)