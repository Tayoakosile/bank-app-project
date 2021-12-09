import React from 'react'

const useIcons = () => {
 const Person = () => {
  return (
   <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
   >
    <path
     stroke-linecap="round"
     stroke-linejoin="round"
     stroke-width="1"
     d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
   </svg>
  )
 }
 const ErrorIcon = () => {
  return (
   <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
   >
    <path
     fill-rule="evenodd"
     d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
     clip-rule="evenodd"
    />
   </svg>
  )
 }
 return { Person, ErrorIcon }
}

export default useIcons
