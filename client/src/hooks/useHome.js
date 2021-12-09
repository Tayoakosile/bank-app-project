import React, { useEffect, useState } from 'react'

const useHome = () => {
 const [showNextPage, setShowNextPage] = useState(false)

 useEffect(() => {
  const showNextPageAfterSomeSec = setTimeout(() => {
   setShowNextPage(true)
  }, 6000)

  return () => {
   clearTimeout(showNextPageAfterSomeSec)
  }
 }, [setTimeout, clearTimeout])

 return { showNextPage }
}

export default useHome
