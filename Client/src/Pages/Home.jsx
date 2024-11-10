import React from 'react'
import Layout from '../Components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
import useProduct from '../Hooks/useProduct'
import { LuIndianRupee } from "react-icons/lu";
import { useTranslation } from 'react-i18next';
import '../i18n'; // Make sure to import this so i18n is initialized

function Home() {
  let navigate = useNavigate()
  let { products } = useProduct()
  const { t } = useTranslation();
  function productNavigate() {
    navigate('/products')
  }

  function singlePageHandler(id) {
    navigate(`/singlePage/${id}`)
  }

  return (
    <Layout title={'Online shopping site in India - Annoy'}>
      <div className="container mt-3" >
        <div className="row">
          <div className="col-md  d-flex align-items-center justify-content-center flex-column" style={{ backgroundImage: "url('https://images.pexels.com/photos/1456291/pexels-photo-1456291.jpeg?auto=compress&cs=tinysrgb&w=600')", width: "90%", height: "50vh", backgroundRepeat: "no-repeat", backgroundPosition: "fixed", backgroundSize: "cover" }}>
            <div style={{ width: '60%' }}>
              <h4 style={{ fontFamily: "sans-serif", color: "white" }}> <b>{t('home.bannerText')}</b></h4> <br />
            </div>
            <button className=' btn btn-warning' onClick={productNavigate}>{t('home.btnText')}</button>
          </div>
        </div>
        <div className="row mt-2">
          {products?.map((item, i) => {
            return <div className="col-md-4" onClick={() => singlePageHandler(item._id)} style={{ cursor: 'pointer' }} key={i}>
              <div className="card">
                <div className="card-body d-flex align-items-center justify-content-evenly">
                  <img src={item.images[0].url} alt={item._id} className='img-fluid' style={{ height: "10rem" }} />
                  <div className="d-flex flex-column align-items-center">
                    <h6>{item.name}</h6>
                    <h6>{item.brand}</h6>
                    <h6> <LuIndianRupee />{item.price}</h6>
                  </div>
                </div>
              </div>
            </div>
          }).slice(0, 3)}
        </div>
      </div>
    </Layout >
  )
}

export default Home