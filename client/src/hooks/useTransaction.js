import { useQuery } from 'react-query'
import { useHistory } from 'react-router-dom'
import { postRequestToServer } from '../api/api'
import useReactForm from './useReactForm'

const useTransaction = () => {
 const history = useHistory()
 const { register, errors, handleSubmit } = useReactForm()

 const makeTransaction = async detail => {
  const response = await postRequestToServer('/transaction/pay', detail)
  if (response) {
   const {
    data: {
     response: { data:{authorization_url} },
    },
   } = response
   console.log(authorization_url)
   window.open(authorization_url)
  }
 }

 return { makeTransaction, register, errors, handleSubmit }
}

export default useTransaction
