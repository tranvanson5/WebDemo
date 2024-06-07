import React, {useEffect, useState} from 'react'
import './productPage.css'
import CardComponent from "../../../component/card/CardComponent";
import PaginationComponent from "../../../component/pagination/PaginationComponent";
import SearchComponent from "../../../component/search/SearchComponent";
import {getRequest} from "../../../service/connectionRequest";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../../../store/slice/productSlice";
function ProductPage() {
    const dispatch = useDispatch();
    const productsPage = useSelector(state => state?.products?.products);
    const [searchForm,setSearchForm] = useState({});
    const [currentPage,setCurrentPage] = useState(0);
    useEffect(() => {
        getProductMethod();
    }, [dispatch,searchForm,currentPage]);
    const getProductMethod = async () => {
      const response= await getRequest(`http://localhost:8080/public/product?search=${searchForm?.search||''}&&size=10&&page=${currentPage}`,null);
      dispatch(listProducts(response));
    }
    const handleOnPageChange = (e) =>{
        setCurrentPage(e);
    }
    const handleSearch = (e) => {
        setSearchForm({
            ...searchForm,
            ...e
        });
    }
    const handlePrice = (value) => {
        const prices = value?.map(item => item?.price);
        if (prices.length > 1) {
            const minPrice = Math.min(...prices); // Giá thấp nhất
            const maxPrice = Math.max(...prices); // Giá cao nhất
            return [minPrice,maxPrice];
        } else  {
            return prices;
        }
    }
    return (
        <div className="product-container">
            <div className="search-product-containner">
                <SearchComponent onchanges={handleSearch}></SearchComponent>
            </div>
            <div className="product-list-container">
                {
                    productsPage?.content?.map((product, index) => (
                        <div className="product" key={index}>
                            <CardComponent
                                product={{
                                    image: product?.image,
                                    title: product?.name,
                                    prices: handlePrice(product?.productDetails),
                                    description: product?.shortDescription
                                }}
                                link={`/product/detail/${product?.id}`}
                                key={index}
                            />
                        </div>
                    ))
                }

            </div>
            <div className="pagination-product-container">
                <PaginationComponent
                    onPageChange={handleOnPageChange}
                    total={productsPage?.totalPages||1}
                    current={productsPage?.numberOfElements||0}
                    element={productsPage?.size||0}
                ></PaginationComponent>
            </div>
        </div>
    )
}

export default ProductPage;
