import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import { host, useAuth } from '../Context/AuthContext';
import useCart from '../Hooks/useCart';
import { Link, useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import toast from "react-hot-toast";
import emptycart from '../assets/cart.webp';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { LuIndianRupee } from 'react-icons/lu'
import { useTranslation } from 'react-i18next';

function Cart() {
  const { t } = useTranslation();
  let { auth } = useAuth();
  let { cart, setCart } = useCart();
  let [clientToken, setClientToken] = useState("");
  let [instance, setIntance] = useState();
  let navigate = useNavigate();

  //thi is function login handler
  function loginHandler() {
    navigate("/signin", { state: "/cart" });
  }

  //remove item from cart
  function removeHandler(id) {
    toast(`😓${t('toast.itemRemove')} `)
    let updated = cart.filter((item) => {
      return item._id !== id
    })
    setCart(updated)
  }

  //total payment
  function subTotal() {
    return cart.reduce((acc, item) => {
      return acc + item.price * item.count;
    }, 0)
  }

  //this is for update handler
  let updateAddressHandler = () => {
    navigate('/dashboard/user/profile', { state: "/cart" })
  }

  //tokem from braintree
  async function tokenHandler() {
    let { data } = await axios.get(`${host}/api/v1/braintree/token`);
    setClientToken(data.clientToken);
  }

  function incHandler(id) {
    let updated = cart.map((item) => {
      if (item._id == id && item.quantity > item.count) {
        return { ...item, count: item.count + 1 }
      }
      return item
    })
    setCart(updated)
  }
  function decHandler(id) {
    let updated = cart.map((item) => {
      if (item._id == id && item.count > 1) {
        return { ...item, count: item.count - 1 }
      }
      return item
    })
    setCart(updated)
  }

  let cartCount = cart.reduce((acc, item) => acc + item.count, 0)
  useEffect(() => {
    tokenHandler();
  }, []);

  //payment function 
  async function paymentHandler() {
    const { nonce } = await instance.requestPaymentMethod();
    let { data } = await axios.post(`${host}/api/v1/braintree/payment`, { cart, nonce }, { headers: { "Authorization": auth.token } });
    if (data.ok) {
      setCart([])
      toast(`${t('toast.orderSuccess')}`)
      navigate('/dashboard/user/order')
    }
  }

  return (
    <Layout title={'Shopping cart - Annoy'}>
      <div className="container">
        <div className="m-2 p-3">
          <h4 className="text-center">{t('cart.hello')} {auth?.user?.name ? auth?.user?.name : "Unknown"}</h4>
          <p className="m-2 text-center">
            {t('cart.you')} <strong>{cartCount}</strong> {t('cart.item')}
          </p>
        </div>
        {
          cart.length > 0 && <>
            <h4>{t('cart.cart')}</h4>
            <div className="row d-flex justify-content-start">
              <div className="col-md-7">
                <hr />
                <div className="row">
                  {cart.map((item, i) => {
                    return (<React.Fragment key={i}>
                      <div className="d-flex align-items-center p-3 mt-1 mb-1">
                        <div className="col-md-5 d-flex align-items-center  justify-content-center">
                          <img
                            src={item?.images[0]?.url}
                            alt={item?.images[0]?.url}
                            className="img-fluid"
                            style={{ height: '13rem', width: '15rem' }}
                          />
                        </div>
                        <div className="col-md-7 d-flex align-items-center flex-column justify-cotent-evenly">
                          <h6>{item?.name}</h6>
                          <p>{item?.description}</p>
                          <p>{t('cart.price')}: <LuIndianRupee />{item?.price}</p>
                          <p>{t('cart.qty')}: {item.count}</p>
                          <div>
                            <button className='btn' onClick={() => decHandler(item._id)}><FaMinus /></button>
                            <button className="btn btn-danger" onClick={() => { removeHandler(item._id) }}>{t('cart.remove')}</button>
                            <button className='btn' onClick={() => incHandler(item._id)}><FaPlus /></button>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </React.Fragment >
                    );
                  })}
                </div>

              </div>
              <div className="col-md-5">
                <h4 className="text-center ">{t('cart.summary')}</h4>
                <p className="text-center">{t('cart.tcp')}</p>
                <hr />
                <h5 className="text-center">{t('cart.total')}: <LuIndianRupee />{subTotal()}</h5>
                <div className="d-flex justify-content-center mt-3 mb-3">
                  {!auth?.token && (
                    <button className="btn btn-warning " onClick={loginHandler}>
                      {t('cart.login')}
                    </button>
                  )}
                </div>
                <div className="d-flex justify-content-center align-items-center flex-column mt-3 mb-3">
                  {auth?.token &&
                    (auth?.user.address ? (
                      <>
                        {t('cart.ca')}
                        <p>
                          <strong>{auth?.user?.address}</strong>
                        </p>
                        <button className="btn btn-warning" onClick={updateAddressHandler}>{t('cart.ua')}</button>
                      </>
                    ) : (
                      <button className="btn btn-warning" onClick={updateAddressHandler}>{t('cart.ua')}</button>
                    ))}
                </div>
                <div className="row">
                  <div className="col">
                    {auth.token && clientToken && (
                      <>
                        <DropIn
                          options={{
                            authorization: clientToken,
                            paypal: { flow: "vault" },
                          }}
                          onInstance={(instance) => {
                            setIntance(instance);
                          }}
                        />
                        <button
                          onClick={paymentHandler}
                          disabled={!instance || !auth.user.address}
                          className="btn btn-primary mb-2"
                        >
                          {t('cart.payment')}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        }
        {
          cart.length == 0 && <div className='d-flex flex-column justify-content-evenly align-items-center'>
            <img src={emptycart} alt="img NA" className='img-fluid' style={{ width: '20vw' }} />
            {!auth.token && <button className='btn btn-info text-white' onClick={() => {
              navigate('/signin')
            }}>{t('cart.signIn')}</button>}
            {(auth.token && cart.length == 0) && <div>
              <p>{t('cart.empty')} <Link to='/'>{t('cart.home')}</Link>, {t('cart.learn')}</p>
            </div>}
          </div>
        }
      </div>
    </Layout>
  )
}

export default Cart