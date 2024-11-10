import React from 'react';
import Layout from '../Components/Layout/Layout';
import Privacy from '../assets/Privacy.avif';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Policy() {
  const { t } = useTranslation();
  return (
    <Layout title={t("policy.title")}>
      <div className="container mt-3">
        <div className="row d-flex align-items-center">
          <div className="col-md-6">
            <img
              src={Privacy}
              alt="privacy"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <div>
              <h2>{t("policy.heading")}</h2>
              <p>{t("policy.intro")}</p>
            </div>
          </div>
          <div className="col-md mt-2">
            <h4>{t("policy.infoWeCollect.heading")}</h4>
            <p>{t("policy.infoWeCollect.personalInfo")}</p>
            <p>{t("policy.infoWeCollect.paymentInfo")}</p>
            <p>{t("policy.infoWeCollect.browsingInfo")}</p>

            <h4>{t("policy.howWeUseInfo.heading")}</h4>
            <p>{t("policy.howWeUseInfo.orderProcessing")}</p>
            <p>{t("policy.howWeUseInfo.personalization")}</p>
            <p>{t("policy.howWeUseInfo.analytics")}</p>
            <p>{t("policy.howWeUseInfo.communication")}</p>

            <p>{t("policy.dataSharing")}</p>
            <p>{t("policy.yourRights")}</p>
            <p>{t("policy.securityMeasures")}</p>

            <h4>{t("policy.cookies.heading")}</h4>
            <p>{t("policy.cookies.content")}</p>

            <h4>{t("policy.changes.heading")}</h4>
            <p>{t("policy.changes.content")}</p>

            <h4>{t("policy.contact.heading")}</h4>
            <p>
              {t("policy.contact.content")} <Link>friendsStores@gmail.com</Link>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Policy;
