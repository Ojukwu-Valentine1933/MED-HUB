import React from 'react'
import Welcome from '../Component/DashboardComponents/Welcome'
import CommonTips from '../Component/DashboardComponents/CommonTips'
const DashPage = () => {

    return (
        <div className='container'>
            <Welcome />
            <CommonTips />
        </div>
    )
}

export default DashPage