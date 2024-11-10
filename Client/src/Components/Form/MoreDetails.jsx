import { t } from 'i18next'
import React from 'react'
import '../../i18n'; // Make sure to import this so i18n is initialized
import { useTranslation } from 'react-i18next';

function MoreDetails({p_id,singlePageHandler}) {
  let {t}=useTranslation();

  return (
    <button className="btn btn-secondary ms-3" onClick={()=>{
      singlePageHandler(p_id)
    }}>{t('product.details')}</button>
  )
}

export default MoreDetails