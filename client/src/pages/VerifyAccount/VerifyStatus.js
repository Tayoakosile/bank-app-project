import React from 'react'
import useVerifyAccount from '../../hooks/useVerifyAccount'

const VerifyStatus = () => {
 const { userStatus } = useVerifyAccount()
 console.log(userStatus)
 return <div>Verified status</div>
}

export default VerifyStatus
