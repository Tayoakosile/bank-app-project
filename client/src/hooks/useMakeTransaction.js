import { usePaystackPayment } from 'react-paystack'
import randomize from 'randomatic'
import useStore from '../zustand'

const useMakeTransaction = () => {
 const { user } = useStore(state => state)
 console.log(user)
 const config = {
  reference: randomize('0Aa0', 12),
  email,
 }
 return {user}
}

export default useMakeTransaction
