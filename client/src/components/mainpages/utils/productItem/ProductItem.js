import React from 'react'
import BtnRender from './BtnRender'
import './_productItem.scss'

function ProductItem({ product, isAdmin }) {
    const { images: { url }, title, price, description } = product

    return (
        <div className="product_card">
            {isAdmin && <input type="checkbox" checked={product.checked} />}
            <img src={url} alt="" />
            <div className="product_box">
                <h2 title={title}>{title}</h2>
                <span>${price}</span>
                <p>{description}</p>
            </div>
            <BtnRender product={product} />
        </div>
    )
}

export default ProductItem
