import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios';
import { host } from '../Context/AuthContext';
import AddToCart from '../Components/Form/AddToCart';
import MoreDetails from '../Components/Form/MoreDetails';
import { useTranslation } from 'react-i18next';

function CategoryPage() {
    const { t } = useTranslation();
    let { slug } = useParams();
    let navigate = useNavigate();
    let [products, setProducts] = useState([]);
    async function getProductsBySlug() {
        try {
            let { data } = await axios.get(`${host}/api/v1/product-category/${slug}`)
            if (data.success) {
                setProducts(data.products)
            }
        } catch (error) {
            console.log(error);
            toast(error.message, { style: { backgroundColor: "red", color: "white" }, icon: '⚡' })
        }
    }
    function singlePageHandler(id) {
        navigate(`/singlepage/${id}`)
    }
    useEffect(() => {
        getProductsBySlug()
    }, [slug])
    return (
        <Layout title={`${slug} - Annoy`}>
            <div className="container">
                <div className="row d-flex justify-content-evenly">
                    {products.length == 0 && <div className=' d-flex justify-content-center align-items-center'>
                        <h4>{t('category.nop')}</h4>
                    </div>}
                    {products.length > 0 &&
                        <h4 className=' text-center mt-3'>{t('category.pf')} :{products.length}</h4>
                    }
                    {products.length > 0 && products.map((item, i) => {
                        return <div className="col-md-3" key={i}>
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <img src={item?.images[0]?.url} alt={item?.images[0]?.url} className='img-fluid' />
                                    </div>
                                    <h6>{item?.name}</h6>
                                    <p>{item?.description}</p>
                                    <p>{item?.brand}</p>
                                    <MoreDetails p_id={item._id} singlePageHandler={singlePageHandler} />
                                    <AddToCart product={item} />
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </Layout>
    )
}

export default CategoryPage