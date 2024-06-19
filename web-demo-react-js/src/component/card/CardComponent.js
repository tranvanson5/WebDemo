import './CardComponent.css'
import {Link} from "react-router-dom";
function CardComponent({product, style, link = '#'}) {
    const cardStyle = {
        ...style,
    };
    const formatNumberWithCommas = (number = 0) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
        <div className="card-container" style={cardStyle}>
            <Link to={link}>
                <div style={{ display: "flex", position: "relative" }}>
                    <img
                        src={product?.image || "https://cdn2.stylecraze.com/wp-content/uploads/2020/09/15-Best-Image-Skincare-Products-Of-2020.jpg"}
                        alt=""
                    />
                    {
                        product?.status != "AVAILABLE" && (
                            <div className="status-container" style={{background: "Red"}}>{product?.status}</div>
                        )
                    }
                    {
                        product?.status == "AVAILABLE" && (
                            <div className="status-container" style={{background: "Green"}}>{product?.status}</div>
                        )
                    }
                </div>
                <div className="card-content">
                    <p className="card-title">{product?.title || "Product title"}</p>
                    <p className="card-price">
                        <span style={{fontWeight: "bold"}}>Price : </span>
                        <span>
                            {product?.prices?.length === 2 ? `${formatNumberWithCommas(product?.prices[0])||0}-${formatNumberWithCommas(product?.prices[1])||0}` : `${formatNumberWithCommas(product?.prices[0]) || 0}`} {" VND"}
                        </span>
                    </p>
                    <p className="card-text">{product?.description || "Discription text"}</p>
                </div>
            </Link>

        </div>
    )
}

export default CardComponent;