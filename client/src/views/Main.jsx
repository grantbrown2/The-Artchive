import React from 'react'
import BottomBar from '../components/BottomBar'
import NavBar from '../components/NavBar'
import WithAuth from '../components/WithAuth'

const Main = () => {
    return (
        <div>
            <NavBar />
            <BottomBar />
        </div>
    )
}

export default WithAuth(Main)