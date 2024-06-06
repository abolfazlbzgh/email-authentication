import React from 'react'

export default function Input({ label, type, value, onChange, placeholder, isClickOnSubmit, isShowMessageError, messageTextError }) {
    return (
        <div className='flex w-full flex-col'>

            <label htmlFor="input" className=" w-full block text-sm font-medium leading-3 text-gray-900">
                {label}
            </label>
            <div className="mt-2 flex flex-col">
                <input
                    id="input"
                    name="input"
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
            </div>
            {isClickOnSubmit && isShowMessageError && (
                <p className="text-red-500 text-xs italic mt-1">{messageTextError}</p>
            )}
        </div>
    )
}
