import React from 'react'
import {Menu} from 'antd'
import styled from 'styled-components'

function LeftMenu(props) {
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="subscription">
                <a href="/subscription"> 내 택시 메이트 </a>
            </Menu.Item>
        </Menu>
    )
}

export default LeftMenu
