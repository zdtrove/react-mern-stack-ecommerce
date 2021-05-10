import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'

function Categories() {
    const state = useContext(GlobalState)
    const [categories, setCategories] = state.categoriesAPI.categories
    const [category, setCategory] = useState('')

    return (
        <div className="categories">
            <form>
                <label htmlFor="category">Category</label>
                <input onChange={e => setCategory(e.target.value)} type="text" name="category" value={category} required />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default Categories
