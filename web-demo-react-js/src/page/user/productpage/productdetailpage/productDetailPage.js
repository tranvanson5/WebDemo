import './productDetailPage.css';
import ImageSlide from "../../../../component/image/imageslide/imageSlide";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRequest } from "../../../../service/connectionRequest";
import { productDetail } from "../../../../store/slice/productSlice";
import { useEffect, useState } from "react";
import Dialog from "../../../../component/dialog/dialog";

function ProductDetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state?.products?.product);
    const [productAllDetails, setProductAllDetails] = useState([]);
    const [images, setImages] = useState([]);
    const [chooseProduct, setChooseProduct] = useState(null);

    useEffect(() => {
        getProductsDetailById();
        getProductsAllDetails();
    }, [dispatch]);

    const getProductsAllDetails = async () => {
        try {
            const response = await getRequest(`http://localhost:8080/public/product/getById/getAllProductDetails?id=${id}`, '');
            if (response.length > 0) {
                setProductAllDetails(response);
                setChooseProduct(response[0]);
            }
            console.log("Product details:", response);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };


    const getProductsDetailById = async () => {
        try {
            const response = await getRequest(`http://localhost:8080/public/product/getById?id=${id}`, '');
            dispatch(productDetail(response));
            const images = [];
            if (product?.image) {
                images.push(product?.image);
            }
            if (product?.images) {
                handleProductDetailImages(product).forEach(image => images.push(image));
            }
            setImages(images);
        } catch (error) {
            console.error("Error fetching product detail:", error);
        }
    };

    const handlePrice = (value) => {
        const prices = value?.map(item => item?.price);
        if (prices && prices.length > 1) {
            const minPrice = Math.min(...prices); // Lowest price
            const maxPrice = Math.max(...prices); // Highest price
            return [minPrice, maxPrice];
        } else {
            return prices;
        }
    };
    const handleProductDetailImages = (product) => {
        console.log(product);
        const imageUrls = product?.images
            ?.filter(image => image?.url) // Filter out images without url
            ?.map(image => image?.url) // Map to get image URLs
            ?? []; // Use an empty array if imageUrls is null or undefined

        const imageUrlProduct = imageUrls.length > 0 ? imageUrls : ["https://cdn2.stylecraze.com/wp-content/uploads/2020/09/15-Best-Image-Skincare-Products-Of-2020.jpg"];
        return imageUrlProduct;
    }

    const formatNumberWithCommas = (number = 0) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="product-detail-container">
            <div className="product-detail-content1">
                <div className="product-detail-left-container">
                    <div className="avatar-image-container">
                        <ImageSlide images={images}></ImageSlide>
                    </div>
                </div>
                <div className="product-detail-right-container">
                    <p className="title-text">{product?.name || 'Title product'}</p>
                    <p className="choose-container">
                        <span>Choose: </span>
                        <button type="button" onClick={openModal}>Select</button>
                    </p>
                    <p className="text">
                        <span>Price: </span>
                        {product?.productDetails ?
                            (handlePrice(product?.productDetails)?.length === 2 ?
                                `${formatNumberWithCommas(handlePrice(product?.productDetails)[0]) || 0} - ${formatNumberWithCommas(handlePrice(product?.productDetails)[1]) || 0}` :
                                `${formatNumberWithCommas(handlePrice(product?.productDetails)[0]) || 0}`
                            ) :
                            '0'
                        } {" VND"}
                    </p>
                    <p className="text">
                        <span>Categories: </span>
                        {
                            product?.categories?.map((category, index) => (
                                <label key={index} style={{ textDecoration: "underline" }}>
                                    {category.name}
                                    {index !== product.categories.length - 1 ? ", " : "."}
                                </label>
                            ))
                        }
                    </p>

                    <p className="text"><span>Create at: </span>{product?.createdAt}</p>
                    <p className="text short-description"
                        // style={{
                        //     display: "-webkit-box",
                        //     textOverflow: "ellipsis",
                        //     WebkitMaxInlineSize: "3",
                        //     WebkitBoxOrient: "vertical"
                        // }}
                    >
                        <span>Short description: </span>
                        {product?.shortDescription}
                    </p>
                    <p className="text">
                        <span>Status:</span>
                        <span
                            className="product-status-container"
                            style={{ backgroundColor: product?.status === 'AVAILABLE' ? 'green' : 'red' }}
                        >
                            {product?.status}
                        </span>
                    </p>
                </div>
            </div>
            <div className="product-detail-content2">
                <div className="description-title">Discription</div>
                <div className="description-content" dangerouslySetInnerHTML={{ __html: product?.description }} />
            </div>
            <Dialog
                isOpen={isModalOpen} onRequestClose={closeModal}
                title="Choose product" customStyles={{
                    content: { maxWidth: '500px', height: '500px' },
                    title: { textAlign: 'center' },

                }}>
                {
                    chooseProduct ? (
                        <div className="dialog-container">

                            <div className="dialog-container-content">
                                <div className="avatar-image-container" style={{ height: "200px", width: "100%", display: "flex", justifyContent: "center" }}>
                                    <div style={{ width: "auto" }}>
                                        <ImageSlide images={handleProductDetailImages(chooseProduct)} size={3}></ImageSlide>
                                    </div>
                                </div>
                                <p style={{ fontSize: "18px", textAlign: 'center', fontWeight: '600' }}>{chooseProduct?.name}</p>
                                <p style={{ textAlign: 'center', fontWeight: '600' }}><b>Price: </b>{chooseProduct?.price}</p>
                                <div className='product-detail-choose-container'>
                                    {
                                        productAllDetails?.map((detail, index) => (
                                            <button className='choose-button' key={index} onClick={() => setChooseProduct(detail)} style={{ background: chooseProduct?.id === detail?.id ? "#5e9b61" : "" }}> {detail.name} </button>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='button-action-container'>
                                <button className='button-buy-now' type="button">Buy Now</button>
                                <button className='button-add-to-cart' type="button">Add To Cart</button>
                            </div>

                            {/* <div className="dialog-container-close">
                        <button type="button" onClick={closeModal}>CLose</button>
                    </div> */}
                        </div>
                    ) : (
                        <p style={{ textAlign: 'center' }}>Product not found</p>
                    )
                }
            </Dialog>
        </div>
    );
}

export default ProductDetailPage;
