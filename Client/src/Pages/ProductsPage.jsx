import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout/Layout';
import { InfinitySpin } from 'react-loader-spinner'
import { useCategory } from '../Hooks/useContext';
import { Checkbox, Radio } from 'antd';
import { Price } from '../Components/Price';
import MoreDetails from '../Components/Form/MoreDetails';
import AddToCart from '../Components/Form/AddToCart';
import toast from 'react-hot-toast';
import axios from 'axios';
import { host } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useProduct from '../Hooks/useProduct';
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { ThreeDots } from 'react-loader-spinner';
import { LuIndianRupee } from "react-icons/lu";
import '../i18n'; // Make sure to import this so i18n is initialized
import { useTranslation } from 'react-i18next';

function Home() {
  let navigate = useNavigate();
  const { t } = useTranslation();
  let [view, setView] = useState(false)
  let sort = ['all', 'l-h', 'h-l', 'a-z', 'z-a']
  let [value, setValue] = useState('');
  let { products } = useProduct();
  //custom hook
  let { categories } = useCategory();
  //select category filter
  let [selectedCategory, setSelectedCategory] = useState('');
  //select brand filter
  let [selectedBrand, setSelectedBrand] = useState('');
  //select price filter
  let [price, setPrice] = useState('');
  //select color
  let [selectColor, setSelectColor] = useState('');
  //store filtered data from backendCategory
  let [filteredData, setFilteredData] = useState([]);
  //total products
  let [productCount, setProductCount] = useState('');
  //set limit
  let [limitProduct, setLimitProduct] = useState([]);
  //pageCount
  let [pageCount, setPageCount] = useState(1);
  let [endCategory, setendCategory] = useState(5)
  let [endBrand, setendBrand] = useState(5)
  //category handling
  function changeCategoryHandler(e, id) {
    let all = [...selectedCategory];
    let checked = e.target.checked;
    if (checked) {
      all.push(id);
    }
    else {
      all = all.filter((item) => {
        return item !== id
      })
    }
    setSelectedCategory([...all])
  }

  //select price filter
  function priceChangeHandler(e) {
    setPrice(e.target.value)
  }

  //filter handler
  async function filterHandler() {
    try {
      let { data } = await axios.post(`${host}/api/v1/filterproducts`, { price, checked: selectedCategory, colorchecked: selectColor, brand: selectedBrand });
      setFilteredData(data.products);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast(error.message)
    }
  }

  async function totalproducts() {
    let { data } = await axios.get(`${host}/api/v1/totalproducts`);
    setProductCount(data.total)
  }

  //get more from be with limit
  async function productList() {
    let { data } = await axios.get(`${host}/api/v1/productlist/${pageCount}`);
    setLimitProduct([...limitProduct, ...data.products]);
  }

  //single page handler for more details
  function singlePageHandler(id) {
    navigate(`/singlePage/${id}`)
  }

  function findArg(arg) {
    let arr = products.map((item) => {
      return [item[arg]]
    })

    let uniqueArr = [...new Set(arr.flat())]
    return uniqueArr
  }

  let colors = findArg('color') //array contain color names
  let brands = findArg('brand') //array contain brand names

  function colorHandler(Color) {
    // Check if the selected color is already in the color state
    if (selectColor.includes(Color)) {
      // If the color is already selected, remove it from the state
      setSelectColor(selectColor.filter((c) => c !== Color));
    } else {
      // If the color is not selected, add it to the state
      setSelectColor([...selectColor, Color]);
    }
  }

  useEffect(() => {
    productList();
  }, [pageCount]);
  //total count from BE
  useEffect(() => {
    totalproducts()
  }, [])

  //call when we click filter buttons
  useEffect(() => {
    filterHandler()
  }, [price, selectedCategory, selectColor, selectedBrand])

  //clear filters
  function clearFilterHandler() {
    window.location.reload()
  }

  async function sortHandler() {
    let { data } = await axios.get(`${host}/api/v1/sorting/${value}`)
    setFilteredData(data.products);
  }

  useEffect(() => {
    if (value) sortHandler()
  }, [value])

  function changeBrandHandler(e) {
    let all = [...selectedBrand];
    let checked = e.target.checked;
    if (checked) {
      all.push(e.target.value);
    }
    else {
      all = all.filter((item) => {
        return item !== e.target.value
      })
    }
    setSelectedBrand([...all])
  }

  let [scrollposition, setScrolllPosition] = useState('');
  window.addEventListener('scroll', () => {
    let scroll = window.scrollY;
    setScrolllPosition(scroll)
  })

  useEffect(() => {
    let id = setTimeout(() => {
      if (scrollposition > 100) {
        setPageCount(pageCount + 1)
      }
    }, 500)
    return () => {
      clearTimeout(id)
    }
  }, [scrollposition])

  return (
    <Layout title='Best Offer - Annoy'>
      <div className="container-fluid">
        <div className="row m-4">
          <div className="col-md-2 mt-3">
            <div className="category-filter">
              <h5>{t('product.category')}</h5>
              <hr />
              <div className="mt-1">
                {categories.map((item, i) => {
                  return (
                    <div key={i}>
                      <Checkbox value={item._id} className="p-2" style={{ fontSize: "16px" }} onChange={(e) => {
                        changeCategoryHandler(e, item._id)
                      }}>{item.name}</Checkbox>
                    </div>
                  )
                }).slice(0, endCategory)}
                {endCategory === categories.length ?
                  <p className=' btn' style={{ color: 'var(--text-color)' }} onClick={() => { setendCategory(5) }}>{t('product.seeLess')}<IoMdArrowDropup /> </p>
                  :
                  <p className=' btn' style={{ color: 'var(--text-color)' }} onClick={() => { setendCategory(categories.length) }}>{t('product.seeMore')}<IoMdArrowDropdown /> </p>
                }
              </div>
            </div>
            <div className="colors mt-2">
              <h5>{t('product.colors')}</h5>
              <hr />
              <div className="mt-1 d-flex gap-1">
                {colors.map((color, i) => (
                  <div
                    key={i}
                    className="color-box"
                    style={{ backgroundColor: color, height: "25px", width: '30px', border: '1px solid', borderRadius: '100%' }}
                    onClick={() => colorHandler(color)}
                  >
                    {selectColor && selectColor.includes(color) && <TiTick />}
                  </div>
                ))}
              </div>
            </div>
            <div className="brand mt-2">
              <h5>{t('product.brand')}</h5>
              <hr />
              <div className="mt-1">
                {brands.map((brand, i) => {
                  return (
                    <div key={i}>
                      <Checkbox value={brand} className="p-2" style={{ fontSize: "16px" }} onChange={(e) => {
                        changeBrandHandler(e)
                      }}>{brand}</Checkbox>
                    </div>
                  )
                }).slice(0, endBrand)}
                {endBrand === brands.length ?
                  <p className=' btn' style={{ color: 'var(--text-color)' }} onClick={() => { setendBrand(5) }}>{t('product.seeLess')}<IoMdArrowDropup /> </p>
                  :
                  <p className=' btn' style={{ color: 'var(--text-color)' }} onClick={() => { setendBrand(brands.length) }}>{t('product.seeMore')}<IoMdArrowDropdown /> </p>
                }
              </div>
            </div>
            <div className=' price filter mt-2'>
              <h6>{t('product.filter')}</h6>
              <hr />
              <div className="mt-2">
                <Radio.Group name="radiogroup" onChange={priceChangeHandler}>
                  {
                    Price.map((item, i) => {
                      return <div key={i} className='p-2'>
                        <Radio value={item.array} style={{ color: 'var(--text-color)' }} >{item.name}</Radio>
                      </div>
                    })
                  }
                </Radio.Group>
              </div>
            </div>
            <button className=' btn btn-danger' onClick={clearFilterHandler}>{t('product.clear')}</button>
          </div>
          <div className="col-md-10">
            <h4 className="text-center mt-3">{t('product.allProducts')}</h4>
            <div className='d-flex justify-content-evenly'>
              <select onClick={(e) => { setValue(e.target.value) }} className='btn' style={{ backgroundColor: '#f5f5f0', borderRadius: '3px' }}>
                {
                  sort.map((val, i) => {
                    return <option value={val} key={i}>sort: {val === 'all' ? "Featured" : val}</option>
                  })
                }
              </select>
              <button className='btn btn-info' onClick={() => setView(!view)}>
                {t(view ? 'product.grid' : 'product.list')}
              </button>
            </div>
            <p className="text-end">
              {price || selectColor || selectedCategory.length > 0 || selectedBrand.length > 0 ? (
                <p>
                  {filteredData.length}/{productCount}{t('product.found')}
                </p>
              ) : (
                `${t('product.total')} : ${productCount}`
              )}
            </p>
            <div className="row">
              {limitProduct.length == 0 && <InfinitySpin
                visible={true}
                width="200"
                color="#4fa94d"
                ariaLabel="infinity-spin-loading"
              />}
              {!view && limitProduct.length > 0 && <>
                {
                  (selectedCategory.length > 0 || price || selectColor || value || selectedBrand ? filteredData : limitProduct)?.map((item, i) => {
                    let { name = 'unknown', price = 0, brand = 'unknown', images = 'unknown', _id } = item;
                    return <div className="col-md-3" key={i}>
                      <div className="card mb-2">
                        <div className="card-body d-flex align-items-center justify-content-evenly">
                          <img src={images[0]?.url} alt="x" className='img-fluid' style={{ height: "16rem", width: '16rem' }} />
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
              {view && limitProduct.length > 0 && <>
                {
                  (selectedCategory.length > 0 || price || selectColor || value || selectedBrand ? filteredData : limitProduct)?.map((item, i) => {
                    let { name = 'unknown', price = 0, brand = 'unknown', images = 'unknown', _id, description } = item;
                    return <div className="row d-flex align-items-center border m-1 p-1 justify-content-center mb-3" key={i}>
                      <div className="col-md-5 d-flex align-items-center justify-content-center">
                        <img src={images[0]?.url} alt="x" className='img-fluid' style={{ height: "16rem", width: '16rem' }} />
                      </div>
                      <div className="col-md-7 d-flex align-items-center flex-column">
                        <p>{name}</p>
                        <p><b>{brand}</b></p>
                        <p>{description}</p>
                        <p><LuIndianRupee /> {price}</p>
                        <div className="button">
                          <MoreDetails singlePageHandler={singlePageHandler} p_id={_id} />
                          <AddToCart product={item} />
                        </div>
                      </div>
                    </div>
                  })
                }
              </>}
              {
                productCount > limitProduct.length && (!selectedCategory.length > 0 && !price && !selectColor && !value && !selectedBrand) && <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              }
            </div>
            <div className="d-flex align-items-center justify-content-evenly">
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home