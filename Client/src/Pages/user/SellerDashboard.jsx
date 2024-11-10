import React from 'react'
import Layout from '../../Components/Layout/Layout'
import { useTranslation } from 'react-i18next';

function SellerDashboard() {
  const { t } = useTranslation();
  return (
    <Layout>
      <div>{t('dashboard.seller')}</div>
    </Layout>
  )
}

export default SellerDashboard