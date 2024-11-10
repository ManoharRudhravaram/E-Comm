import React from 'react'
import useSearch from '../../Hooks/useSearch';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import axios from 'axios';
import toast from 'react-hot-toast';
import { host } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';

export default function Search() {
    let { search, setSearch, setKey } = useSearch();
    let navigate = useNavigate();
    async function submitHandler() {
        try {
            const trimmedKeyword = search.keyword.trim();
            setKey(trimmedKeyword)
            if (!trimmedKeyword) {
                navigate('/')
                window.location.reload()
            }
            else {
                let { data } = await axios.get(`${host}/api/v1/searchproduct/${search.keyword}`)
                if (data.success) {
                    setSearch({ ...search, result: data.products, keyword: "" })
                    navigate('/searchpage')
                }
            }
        } catch (error) {
            console.log(error);
            toast(`⚡${error.message}`, { style: { color: "white", backgroundColor: "red" } })
        }
    }
    return (
        <form className="d-flex ms-5">
            <input className="form-control me-1" type="search"placeholder={`${t('search.placeholder')}`} aria-label="Search" onChange={(e) => {
                setSearch({ ...search, keyword: e.target.value })
            }} value={search.keyword} />
            <button className="btn btn-outline-light" type="button" onClick={submitHandler}><FaMagnifyingGlass /></button>
        </form>
    )
}
