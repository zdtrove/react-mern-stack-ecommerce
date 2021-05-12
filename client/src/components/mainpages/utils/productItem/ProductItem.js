import React from 'react'
import BtnRender from './BtnRender'
import './_productItem.scss'

function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {
    const { images: { url }, title, price, description } = product

    return (
        <div className="product_card">
            {isAdmin && <input onChange={() => handleCheck(product._id)} type="checkbox" checked={product.checked} />}
            <img src={url} alt="" />
            <div className="product_box">
                <h2 title={title}>{title}</h2>
                <span>${price}</span>
                <p>{description}</p>
            </div>
            <BtnRender deleteProduct={deleteProduct} product={product} />
        </div>
    )
}

export default ProductItem
