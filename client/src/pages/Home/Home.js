import React from 'react'
import useHome from '../../hooks/useHome'
import Intro from './Intro'
import Next from './Next'

const Home = () => {
 const { showNextPage } = useHome()
 return <>{showNextPage ? <Next /> : <Intro />}</>
}

export default Home
