import React from 'react'
import useVerifyAccount from '../../hooks/useVerifyAccount'

const VerifyStatus = () => {
 const { _id } = useVerifyAccount()
 console.log(_id)
 return <div>Verified status</div>
}

export default VerifyStatus
