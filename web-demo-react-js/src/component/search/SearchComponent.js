import React, {useState} from 'react'
import "./SearchComponent.css"
function SearchComponent({onchanges}) {
    const [formState, setFormState] = useState({
        search: '',
        nameSort: '',
        categoriesSort: '',
        dateSort: '',
        priceSort: ''
    })
    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }));

    }
    const handleSumit = () => {
        onchanges(formState);
    }
    return(
        <div className="search-containner">
            <div className="search">
                <input type="text" placeholder="Enter search text" className="input-search" name="search" onChange={handleOnchange}/>
                <button className="btn-search" onClick={handleSumit}>Search</button>
            </div>
            <div className="sort-container">
                <select name="nameSort" onChange={handleOnchange} >
                    <option >Name...</option>
                    <option value="ASC">ASC</option>
                    <option value="DESC">DESC</option>
                </select>
                <select name="categoriesSort" onChange={handleOnchange}>
                    <option>Categories...</option>
                    <option value="ASC">ASC</option>
                    <option value="DESC">DESC</option>
                </select>
                <select name="dateSort" onChange={handleOnchange}>
                    <option>Date...</option>
                    <option value="ASC">ASC</option>
                    <option value="DESC">DESC</option>
                </select>
                <select name="priceSort" onChange={handleOnchange}>
                    <option>Price...</option>
                    <option value="ASC">ASC</option>
                    <option value="DESC">DESC</option>
                </select>
            </div>
        </div>
    )
}

export default SearchComponent;