import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import './_detailProduct.scss'
import ProductItem from '../utils/productItem/ProductItem'

function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() => {
        if (params.id) {
            products.forEach(product => {
                if (product._id === params.id) setDetailProduct(product)
            })
        }
    }, [params.id, products])

    if (detailProduct.length === 0) return <p>Loading...</p>
    const { images: { url }, title, product_id, price, description, content, sold, category } = detailProduct

    return (
        <>
            <div className="detail">
                <img src={url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{title}</h2>
                        <h6>#: {product_id}</h6>
                    </div>
                    <span>$ {price}</span>
                    <p>{description}</p>
                    <p>{content}</p>
                    <p>Sold: {sold}</p>
                    <Link className="cart" to="/cart" onClick={() => addCart(detailProduct)}>Buy Now</Link>
                </div>
            </div>
            <div>
                <h2>Related products</h2>
                <div className="products">
                    {products.map((product, i) => {
                        return product.category === category && <ProductItem key={i} product={product} />
                    })}
                </div>
            </div>
        </>
    )
}

export default DetailProduct
