import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import { useParams } from 'react-router-dom'
import useProduct from '../Hooks/useProduct';
import AddToCart from '../Components/Form/AddToCart';
import { InfinitySpin } from 'react-loader-spinner';
import { BiSolidOffer } from "react-icons/bi";
import returnIcon from '../assets/truck-return.svg'
import truck from '../assets/truck.svg';
import cup from '../assets/cup.svg';
import pay from '../assets/pay.svg';
import lock from '../assets/lock.svg';
import { host } from '../Context/AuthContext';
import axios from 'axios';
import SimilarProduct from './SimilarProduct';
import { RiStarSFill } from "react-icons/ri";
import { RiStarSLine } from "react-icons/ri";
import { LuIndianRupee } from "react-icons/lu";
import { useTranslation } from 'react-i18next';

function SinglePage() {
    const { t } = useTranslation();
    let [stars, setStars] = useState('');
    let [discount, setDiscount] = useState('')
    let arr = [{ icon: returnIcon, text: `${t('single.exchange')}` }, { icon: truck, text: `${t('single.delivery')}` }, { icon: cup, text: `${t('single.topBrand')}` }, { icon: pay, text:`${t('single.pod')}` }, { icon: lock, text: `${t('single.secure')}`}];
    let { id } = useParams();
    let [count, setCount] = useState(0);
    let { singleProduct, singleError, singleLoading, product } = useProduct();
    let [products, setProducts] = useState([])
    useEffect(() => {
        singleProduct(id)
    }, [id])

    async function similarProductHandler() {
        try {
            let { data } = await axios.get(`${host}/api/v1/similar-product/${product?._id}/${product?.category?._id}`)
            if (data.success) setProducts(data.products)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (Object.keys(product).length > 0) similarProductHandler()
    }, [singleLoading])

    function rating() {
        let rating = 3 + Math.floor(Math.random() * 2);
        setStars(rating)
    }

    function Discount() {
        let discount = Math.floor(Math.random() * 11) + 10;
        setDiscount(discount);
    }

    useEffect(() => {
        rating()
        Discount()
    }, [])
    return (
        <Layout title={`${product.name} - Annoy`}>
            <div className="container">
                <h4 className="text-center m-3">{t('single.productDetails')}</h4>
                {singleLoading && <InfinitySpin
                    visible={true}
                    width="200"
                    color="#4fa94d"
                    ariaLabel="infinity-spin-loading"
                />}
                {!singleLoading && !singleError && Object.keys(product).length > 0 && (
                    <>
                        <div className="row ">
                            <div className="col-md-6 ">
                                <div className="row d-flex justify-content-evenly align-items-center" style={{ position: 'sticky', top: '1px' }}>
                                    <div className="col-md-2 ">
                                        {product?.images?.map((item, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    onMouseOver={() => { setCount(i) }}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <img
                                                        style={{ height: "3rem", width: '3rem', borderRadius: '10px' }}
                                                        src={item.url}
                                                        alt={item.url}
                                                        className="img-fluid m-1 border"
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="col-md-10 mt-5">
                                        <img
                                            src={product?.images[count]?.url}
                                            alt={product?.images[count]?.url}
                                            className="img-fluid"
                                            style={{ height: "28rem", width: '28rem' }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mt-5">
                                <h4>{product?.name}</h4>
                                <h2>{t('product.brand')}:{product?.brand}</h2>
                                <div className='d-flex align-items-evenly'>
                                    <span>{stars}.0</span> {Array.from({ length: 5 }, (_, i) => stars > i ? <RiStarSFill key={i} style={{ color: 'gold', fontSize: "1.4rem" }} /> : < RiStarSLine style={{ color: 'gold', fontSize: "1.3rem" }} />)}
                                </div>
                                <p style={{ color: product.quantity > 0 ? 'var()--text-color' : 'red' }}>{product?.quantity ? "In Stock" : "Out of Stock"}</p>
                                <p>{t('single.shipping')} : <span style={{ color: 'red' }}>{product?.shipping == "yes" ? "Available" : "Not Available"}</span></p>
                                <p>{product?.description}</p>
                                <p>{t('single.color')} : {product?.color}</p>
                                <hr />
                                <span className=' btn btn-danger'>{t('single.deal')}</span> <br /> <br />
                                <h4> <span style={{ color: 'red' }}>-{discount}%</span> <LuIndianRupee/> {product?.price}</h4>
                                <p>{t('single.M.R.P.')} : <strike><LuIndianRupee/> {Math.floor(product?.price * (100 / (100 - discount)))}</strike></p>
                                <p>{t('single.taxes')}</p>
                                <hr />
                                <BiSolidOffer style={{ fontSize: '2rem' }} /> <span>{t('single.offers')}</span>
                                <div className="card" style={{ width: '11rem' }}>
                                    <div className="card-body">
                                        <h5>{t('single.bankOffer')}</h5>
                                        <h6>{t('single.upto')}<LuIndianRupee/>{product?.price - Math.trunc(product?.price * 90 / 100)} {t('single.discount')}</h6>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    {arr.map((item, i) => {
                                        return <div className="col-md d-flex flex-column" key={i}>
                                            <img src={item.icon} alt="x" style={{ height: '2rem' }} />
                                            <p style={{ fontSize: '13px', color: 'rgb(26, 173, 173)' }} className='text-center'>{item.text}</p>
                                        </div>
                                    })}
                                </div>
                                <hr />
                                <b>{t('single.about')}</b>
                                <p>{product?.description}</p>
                                <AddToCart product={product} />
                            </div>
                        </div>
                    </>
                )}
                <div className="row">
                    <h4 className="text-start m-5">{t('single.similar')}</h4>
                    <SimilarProduct products={products} />
                </div>
            </div>
        </Layout>
    )
}

export default SinglePage