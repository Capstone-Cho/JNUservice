import React from 'react'
import {Menu} from 'antd'
import Taxi from '../../Home/taxi.png'
import Cart from '../../Home/shopping-cart.png'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

function LeftMenu(props) {
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="taxi">
                <a href="/taxi">
                    <img src={Taxi} width="40px" alt="" /> 택시메이트
                </a>
            </Menu.Item>
            <Menu.Item key="shop">
                <a href="/shop">
                    <img src={Cart} width="40px" alt="" style={{marginRight: '5px'}} />
                    중고장터
                </a>
            </Menu.Item>
        </Menu>
    )
}

export default LeftMenu
