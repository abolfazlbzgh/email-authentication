import React from 'react'

export default function LoginFrame({ src, title, isShowBrand , isSmallImg = false, children }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto gap-10 justify-center items-center min-h-screen w-full p-4 justify-items-center  ">
            <div className={`w-full justify-center  items-center hidden md:block ${isSmallImg ? '':''}`} >
                <img src={src} alt="img" className={`mx-auto object-cover ${isSmallImg ? ' h-96':''}`} />
            </div>

            <div className="bg-white m-4 pl-6 pr-4 py-8 rounded-lg shadow-lg  w-full">
                <h2 className="text-2xl font-medium text-black">{title}</h2>
                {isShowBrand && <h2 className="text-4xl font-black mb-4 text-primary mt-0">My Brand</h2>}

                {children}

            </div>

        </div>
    )
}
