import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ChakraProvider } from '@chakra-ui/react'

const queryClient = new QueryClient({
 defaultOptions: {
  queries: {
   refetchOnWindowFocus: false,
   refetchOnMount: false,
   refetchOnReconnect: false,
   retry: 1,
   retryDelay: 1000,
  },
 },
})
ReactDOM.render(
 <React.StrictMode>
  <Router>
   <QueryClientProvider client={queryClient}>
    <ChakraProvider>
     <App />
    </ChakraProvider>
   </QueryClientProvider>
  </Router>
 </React.StrictMode>,
 document.getElementById('root')
)
