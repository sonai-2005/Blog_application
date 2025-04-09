import React from 'react'

function Button({
    text,
    type='button',
    bgcolor='bg-blue-500',
    textColor='white',
    className ='',
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${bgcolor} ${textColor}  `} {...props}>{text}</button>
  )
}

export default Button