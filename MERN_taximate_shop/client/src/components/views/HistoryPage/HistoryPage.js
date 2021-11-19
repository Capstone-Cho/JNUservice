import React from 'react'
import ShopBar from '../ShopBar/NavBar'

import styled from 'styled-components'

const Grid = styled.div`
    height: 100%;
    display: grid;
    grid-template-areas: 'sidebar main';
    grid-template-columns: 150px 1fr;
`

function HistoryPage(props) {
    return (
        <Grid>
            <ShopBar />
            <div style={{width: '90%', margin: '3rem auto'}}>
                <div style={{textAlign: 'center'}}>
                    <h1>History</h1>
                </div>
                <br />

                <table>
                    <thead>
                        <tr>
                            <th>Payment Id</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Date of Purchase</th>
                        </tr>
                    </thead>

                    <tbody>
                        {props.user.userData &&
                            props.user.userData.history &&
                            props.user.userData.history.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.dateOfPurchase}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </Grid>
    )
}

export default HistoryPage
