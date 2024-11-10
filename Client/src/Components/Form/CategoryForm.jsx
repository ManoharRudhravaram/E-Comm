import { t } from 'i18next'
import React from 'react'
import '../../i18n'; // Make sure to import this so i18n is initialized
import { useTranslation } from 'react-i18next';

function CategoryForm({ inputHandler, submitHandler, input, showModal }) {
  let {t}=useTranslation()

  return (
    <div className='m-2 d-flex'>
      <input type='text' placeholder='Enter new Category' className={showModal ? 'w-75 p-1 ' : 'p-1 '} value={input} onChange={inputHandler} />
      {
        !showModal && <button className='btn btn-primary ms-3' onClick={submitHandler}>{t('form.submit')}</button>
      }
    </div>
  )
}

export default CategoryForm