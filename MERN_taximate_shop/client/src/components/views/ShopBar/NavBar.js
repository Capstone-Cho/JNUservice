import React, {useState} from 'react'
import styled from 'styled-components'
import {HomeOutlined, ShoppingCartOutlined, UploadOutlined, HistoryOutlined} from '@ant-design/icons'

const Div = styled.div`
    margin-left: 10px;
    position: relative;
    height: 300px;
    width: 60px;
    background: #2b343b;
    box-shadow: 10px 0 0 #4187f6;
    overflow-x: hidden;
    transition: width 0.5s;
    border-radius: 10px;
    &:hover {
        width: 150px;
    }
`

const Ul = styled.ul`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding-top: 20px;
    list-style: none;
    border-left: 5px solid #2b343b;
`

const LI = styled.li`
    position: relative;
    width: 100%;
    /* background: #4187f6; */
    font-size: 18px;
`

const A = styled.a`
    position: relative;
    display: block;
    width: 100%;
    display: flex;
    text-decoration: none;
    color: white;
    &:hover {
        color: white;
        background: #4187f6;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
    }
`

const Icon = styled.span`
    position: relative;
    display: block;
    min-width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    /* font-size: 20px; */
`

const Title = styled.span`
    position: relative;
    display: block;
    /* padding-left: 5px; */
    height: 60px;
    line-height: 60px;
    white-space: nowrap;
`

function NavBar() {
    const [visible, setVisible] = useState(false)

    const showDrawer = () => {
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false)
    }

    return (
        <div style={{margin: '20px 0 0 10px'}}>
            <Div>
                <Ul>
                    <LI>
                        <A href="/shop">
                            <Icon>
                                <HomeOutlined />
                            </Icon>
                            <Title>중고장터</Title>
                        </A>
                    </LI>
                    <LI>
                        <A href="/history">
                            <Icon>
                                <HistoryOutlined />
                            </Icon>

                            <Title>History</Title>
                        </A>
                    </LI>
                    <LI>
                        <A href="/product/upload">
                            <Icon>
                                <UploadOutlined />
                            </Icon>
                            <Title>Upload</Title>
                        </A>
                    </LI>
                    <LI>
                        <A href="/user/cart">
                            <Icon>
                                <ShoppingCartOutlined />
                            </Icon>

                            <Title>Cart</Title>
                        </A>
                    </LI>
                </Ul>
            </Div>
        </div>
    )
}

export default NavBar
