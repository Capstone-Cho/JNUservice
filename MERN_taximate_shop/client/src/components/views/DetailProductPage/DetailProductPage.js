import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ProductImage from './Sections/ProductImage'
import ProductInfo from './Sections/ProductInfo'
import {Row, Col} from 'antd'

import ShopBar from '../ShopBar/NavBar'

import styled from 'styled-components'

const Grid = styled.div`
    height: 100%;
    display: grid;
    grid-template-areas: 'sidebar main';
`

function DetailProductPage(props) {
    const productId = props.match.params.productId

    const [Product, setProduct] = useState({})

    useEffect(() => {
        axios
            .get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data[0])
                console.log(response.data[0])
            })
            .catch(err => alert(err))
    }, [])
    return (
        <Grid>
            <ShopBar />
            <div style={{width: '100%', padding: '3rem 4rem'}}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <h1>{Product.title}</h1>
                </div>

                <br />

                <Row gutter={[16, 16]}>
                    <Col lg={12}>
                        <ProductImage detail={Product} />
                    </Col>
                    <Col lg={12}>
                        <ProductInfo detail={Product} />
                    </Col>
                </Row>
            </div>
        </Grid>
    )
}

export default DetailProductPage
