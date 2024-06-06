import React from 'react'

export default function Button({title , onClick , disabled}) {
  return (
    <button
    onClick={onClick}
    disabled={disabled}
    className="bg-primary disabled:scale-100  disabled:bg-gray-700 text-white p-2 rounded-lg w-full hover:bg-primary/90 transition-all"
  >
    {title}
  </button>
  )
}
