/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Menu} from 'antd'
import {withRouter} from 'react-router-dom'
import {useSelector} from 'react-redux'
const Upload = require('../../../../assets/images/upload.png')

function RightMenu(props) {
    const user = useSelector(state => state.user)

    if (user.userData && !user.userData.isAuth) {
        return <Menu mode={props.mode}></Menu>
    } else {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="create">
                    <a href="/video/upload">
                        <img src={Upload} alt="Upload" />
                    </a>
                </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter(RightMenu)
