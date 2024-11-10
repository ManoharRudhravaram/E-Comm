import React from 'react';
import Layout from '../Components/Layout/Layout';
import mall from '../assets/pexels-umut-kostik-11834128.jpg';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import '../i18n'; // Make sure to import this so i18n is initialized

function About() {
  const { t } = useTranslation(); // Initialize translation function

  return (
    <Layout title={"About - Annoy"}>
      <div className="container">
        <h2 className="text-center m-3">{t('about.title')}</h2>
        <div className="row d-flex">
          <div className="col-md-4 mb-3">
            <img
              src={mall}
              alt={t('about.imageAlt')}
              className="img-fluid"
            />
          </div>
          <div className="col-md-8">
            <div>
              <p>{t('about.introduction')}</p>
              <p>{t('about.welcomeMessage')}</p>
              <p>{t('about.ourStoryTitle')}</p>
              <p>{t('about.ourStory')}</p>
              <p>{t('about.missionTitle')}</p>
              <p>{t('about.mission')}</p>
              <p>{t('about.whyChooseUsTitle')}</p>
              <p>{t('about.whyChooseUs')}</p>
              <p>{t('about.getInTouchTitle')}</p>
              <p>{t('about.getInTouchMessage')}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default About;
