import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import './_products.scss'
import Loading from '../utils/loading/Loading'

function Products() {
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products

    return (
        <>
            <div className="products">
                {products.map((product, i) => {
                    return <ProductItem key={i} product={product} />
                })}
            </div>
            {products.length === 0 && <Loading />}
        </>
    )
}

export default Products
