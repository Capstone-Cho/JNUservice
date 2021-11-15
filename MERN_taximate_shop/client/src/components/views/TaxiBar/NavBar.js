import React, {useState} from 'react'
import LeftMenu from './Sections/LeftMenu'
import RightMenu from './Sections/RightMenu'
import {Drawer, Button, Icon} from 'antd'
import './Sections/Navbar.css'

function NavBar() {
    const [visible, setVisible] = useState(false)

    const showDrawer = () => {
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false)
    }

    return (
        <nav className="menu" style={{width: '100%', marginBottom: '30px'}}>
            <div className="menu__logo">
                <a href="/taxi">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Taxi_Icon.png"
                        alt="Logo"
                        style={{width: '30px', marginTop: '-5px'}}
                    />
                </a>
            </div>
            <div className="menu__container">
                <div className="menu_left">
                    <LeftMenu mode="horizontal" />
                </div>
                <div className="menu_rigth">
                    <RightMenu mode="horizontal" />
                </div>
                <Button className="menu__mobile-button" type="primary" onClick={showDrawer}>
                    <Icon type="align-right" />
                </Button>
                <Drawer title="Basic Drawer" placement="right" className="menu_drawer" closable={false} onClose={onClose} visible={visible}>
                    <LeftMenu mode="inline" />
                    <RightMenu mode="inline" />
                </Drawer>
            </div>
        </nav>
    )
}

export default NavBar
