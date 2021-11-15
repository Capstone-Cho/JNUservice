/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Menu, Icon, Badge} from 'antd'
import axios from 'axios'
import {USER_SERVER} from '../../../Config'
import {withRouter} from 'react-router-dom'
import {useSelector} from 'react-redux'

function RightMenu(props) {
    const user = useSelector(state => state.user)

    if (user.userData && !user.userData.isAuth) {
        return <Menu mode={props.mode}></Menu>
    } else {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="history">
                    <a href="/history">History</a>
                </Menu.Item>

                <Menu.Item key="upload">
                    <a href="/product/upload">Upload</a>
                </Menu.Item>

                <Menu.Item key="cart" style={{paddingBottom: 3}}>
                    <Badge count={user.userData && user.userData.cart.length}>
                        <a href="/user/cart" className="head-example" style={{marginRight: -22, color: '#667777'}}>
                            <Icon type="shopping-cart" style={{fontSize: 30, marginBottom: 3}} />
                        </a>
                    </Badge>
                </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter(RightMenu)
