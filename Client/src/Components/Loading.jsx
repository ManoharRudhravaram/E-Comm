import { Modal } from 'antd';
import React, { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner';

function Loading() {
    return (
        <div className=' text-center'>
            {
                <RotatingLines
                    visible={true}
                    height="96"
                    width="96"
                    color="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            }

        </div>
    )
}

export default Loading