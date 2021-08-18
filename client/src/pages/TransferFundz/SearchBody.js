import randomatic from 'randomatic'
import React from 'react'
import SearchResult from './SearchResult'

const SearchBody = ({ data, isLoading, isError, inputVal, isSuccess }) => {
 if (isLoading) {
  return <div>isLoading</div>
 }
 if (isError) {
  return <div>User not found</div>
 }

 if (isSuccess) {
  return (
   <div>
    {isSuccess &&
     data.data.message.map(user => (
      <React.Fragment key={randomatic('01', 12)}>
       <SearchResult user={user} isLoading={isLoading} inputVal={inputVal} />
      </React.Fragment>
     ))}
   </div>
  )
 }

 return <div>Hello</div>
}

export default SearchBody
