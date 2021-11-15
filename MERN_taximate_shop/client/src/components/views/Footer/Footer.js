import React from 'react'
import {Icon} from 'antd'

function Footer() {
    return (
        <div
            style={{
                height: '5vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
            }}
        >
            <p>
                {' '}
                바지사장인조 <Icon type="smile" />
            </p>
        </div>
    )
}

export default Footer
