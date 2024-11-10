import React from 'react'
import Layout from '../Components/Layout/Layout'
import { useCategory } from '../Hooks/useContext'
import { Link, useNavigate } from 'react-router-dom'
import useProduct from '../Hooks/useProduct';
import MoreDetails from '../Components/Form/MoreDetails';
import AddToCart from '../Components/Form/AddToCart';
import { InfinitySpin } from 'react-loader-spinner';
import { LuIndianRupee } from "react-icons/lu";
import { useTranslation } from 'react-i18next';

function AllCategory() {
  const { t } = useTranslation();
  let navigate = useNavigate();
  let { categories } = useCategory();
  let { products, singleLoading, singleError } = useProduct();
  //single page handler for more details
  function singlePageHandler(id) {
    navigate(`/singlePage/${id}`)
  }
  return (
    <Layout title={'All Category - ecomm'}>
      <div className="container">
        <div className="row">
          <div className="col">
            <h3 className=' text-center mt-3'>{t('product.category')}</h3>
            <div className="row">
              {
                categories?.map((item, i) => {
                  return <div className="col" key={i}>
                    <Link style={{ textDecoration: 'none' }} to={`/all-category/${item.slug}`}>{item.name}
                    </Link>
                  </div>
                })
              }
            </div>
          </div>
        </div>
        <div className="row">
          {products.length == 0 && <InfinitySpin
            visible={true}
            width="200"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
          />}
          {products.length > 0 && <>
            {
              products?.map((item, i) => {
                let { name = 'unknown', price = 0, brand = 'unknown', images = 'unknown', _id } = item;
                return <div className="col-md-3 mt-3" key={i}>
                  <div className="card mb-2">
                    <div className="card-body">
                      <img src={images[0]?.url} alt="x" className='img-fluid' />
                    </div>
                    <div className="card-footer d-flex justify-content-evenly align-items-center flex-column">
                      <p>{name}</p>
                      <p><b>{brand}</b></p>
                      <p><LuIndianRupee /> {price}</p>
                      <div className="button">
                        <MoreDetails singlePageHandler={singlePageHandler} p_id={_id} />
                        <AddToCart product={item} />
                      </div>
                    </div>
                  </div>
                </div>
              })
            }
          </>}
        </div>
      </div>
    </Layout>
  )
}

export default AllCategory