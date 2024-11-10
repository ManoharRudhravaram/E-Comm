import React from 'react';
import useSearch from '../Hooks/useSearch';
import Layout from '../Components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import MoreDeatils from '../Components/Form/MoreDetails';
import AddToCart from '../Components/Form/AddToCart';
import { useTranslation } from 'react-i18next';

function SearchPage() {
  const { t } = useTranslation();
  let { search, key } = useSearch();
  let navigate = useNavigate();

  function singlePageHandler(id) {
    navigate(`/singlepage/${id}`);
  }

  return (
    <Layout title={`${key ? key : "Seach Product"} - Annoy`}>
      <div className="container">
        <div className="row">
          <h1 className="text-center m-3">{t('searchPage.heading')}</h1>
          <div className='d-flex justify-content-center gap-1'>
            <p>{t('searchPage.found', { count: search?.result?.length })}</p>
            {key && <p>{t('searchPage.for')} {key}</p>}
          </div>
          {search.result.length === 0 && (
            <div>
              <h3>{t('searchPage.noData.heading')}</h3>
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate('/');
                }}
              >
                {t('searchPage.noData.button')}
              </button>
            </div>
          )}
          {search.result.length > 0 &&
            search.result?.map((item, i) => {
              return (
                <div className="col-md-3" key={i}>
                  <div className="card">
                    <div className="card-body">
                      <div>
                        <img
                          src={item?.images[0]?.url}
                          alt={item?.images[0]?.url}
                          className="img-fluid"
                        />
                      </div>
                      <h6>{item?.name}</h6>
                      <p>{item?.description}</p>
                      <p>{item?.brand}</p>
                      <MoreDeatils p_id={item._id} singlePageHandler={singlePageHandler} />
                      <AddToCart product={item} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
}

export default SearchPage;
