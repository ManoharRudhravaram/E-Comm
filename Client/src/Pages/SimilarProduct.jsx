import React from 'react';
import MoreDetails from '../Components/Form/MoreDetails';
import AddToCart from '../Components/Form/AddToCart';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function SimilarProduct({ products }) {
    const { t } = useTranslation();
    let navigate = useNavigate();

    // single page handler for more details
    function singlePageHandler(id) {
        navigate(`/singlePage/${id}`);
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-start">
                {products.length === 0 && <h4>{t("similarProduct.noProducts")}</h4>}
                {products.length > 0 && products.map((item, i) => {
                    let { name, brand } = item;
                    return (
                        <div className="col-md-3" key={i}>
                            <div className="card" style={{ width: '18rem' }}>
                                <div className="card-body d-flex align-items-center justify-content-center">
                                    <div>
                                        <img src={item?.images[0]?.url} alt={item?.images[0]?.url} className='img-fluid' style={{ height: '10rem', width: '13rem' }} />
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <p>{name}</p>
                                    <p><b>{brand}</b></p>
                                    <MoreDetails p_id={item._id} singlePageHandler={singlePageHandler} />
                                    <AddToCart product={item} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SimilarProduct;
