import React from 'react'
import useVerifyTransaction from '../../hooks/useVerifyTransaction'

const VerifyTransaction = () => {
 const { location } = useVerifyTransaction()
 console.log(location)
 
 return <div>Verification loading</div>
}

export default VerifyTransaction
