import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ProductImage from './Sections/ProductImage'
import ProductInfo from './Sections/ProductInfo'
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

                <div style={{display: 'flex'}}>
                    <div style={{flex: '1'}}>
                        <ProductImage detail={Product} />
                    </div>
                    <div style={{flex: '1'}}>
                        <ProductInfo detail={Product} />
                    </div>
                </div>
            </div>
        </Grid>
    )
}

export default DetailProductPage
