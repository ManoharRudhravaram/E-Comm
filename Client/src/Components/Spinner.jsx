import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../i18n'; // Make sure to import this so i18n is initialized
import { useTranslation } from "react-i18next";

function Spinner({path}) {
  let [timer, setTimer] = useState(4);
  let navigate = useNavigate();
  let location=useLocation()
  const {t}=useTranslation();
  useEffect(() => {
    let id = setInterval(() => {
      setTimer(--timer);
    }, 1000);
    if (timer == 0) navigate(path?path:"/signin",{state:location.pathname});
    return () => {
      clearInterval(id);
    };
  }, [timer]);
  return (
    <div className="container" style={{height:"800px"}}>
      <div className="row">
        <div className="col d-flex justify-content-center align-items-center">
          <h6>{t('spinner.redirect')} {timer} {t('spinner.sec')}</h6>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">{t('spinner.loading')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Spinner;