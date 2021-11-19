import React, {useState, useEffect} from 'react'
// import ImageGallery from 'react-image-gallery'

function ProductImage(props) {
    const [Images, setImages] = useState([])
    const [img, setImg] = useState('')

    useEffect(() => {
        if (props.detail.images && props.detail.images.length > 0) {
            let images = []

            props.detail.images.map(item => {
                images.push({
                    original: `http://localhost:5000/${item}`,
                    thumbnail: `http://localhost:5000/${item}`,
                })
                setImg(`http://localhost:5000/${item}`)
            })

            console.log(images[0])
            setImages(images)
        }
    }, [props.detail])

    return (
        <>
            {/* <ImageGallery items={Images} width="100%" /> */}
            <img src={img} alt="" width="95%" style={{borderRadius: '10px'}} />
        </>
    )
}

export default ProductImage
