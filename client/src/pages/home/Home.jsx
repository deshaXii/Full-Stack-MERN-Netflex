import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import './home.scss'
import List from '../../components/list/List'
export default function Home() {
    return (
        <div className="homepage">
            <Navbar />
            <Featured type="movie" />
            <List />
            <List />
        </div>
    )
}
