import React from 'react'

function Circle() {
    return (
        <div>

            <div className="bg-blue-700 h-[500px] w-[500px] rounded-full relative flex justify-between">

                <div className="bg-blue-300 h-[100px] w-[100px] rounded-full top-0 left-0">1</div>
                <div className="bg-blue-300 h-[100px] w-[100px] rounded-full top-0 right-0">2</div>
                <div className="bg-blue-300 h-[100px] w-[100px] rounded-full bottom-0 left-0">3</div>
                <div className="bg-blue-300 h-[100px] w-[100px] rounded-full bottom-0 right-0">4</div>
                <div className="bg-blue-300 h-[100px] w-[100px] rounded-full top-0 left-[50%]">5</div>
                <div className="bg-blue-300 h-[100px] w-[100px] rounded-full ">6</div>


            </div>

        </div>
    )
}

export default Circle