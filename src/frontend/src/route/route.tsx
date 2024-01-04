import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../page/home";
import AboutPage from '../page/about';
import Idols from '../page/idols';
import PrivacyPage from '../page/privacy';
import NotFound from '../page/404';
// import ContactPage from '../page/contact';

const RouteManager:React.FC=() => {
    return (
      <>
       <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/idols" element={<Idols />} />
          <Route path="/privacypolicy" element={<PrivacyPage />} />
          {/* <Route path="/contact" element={<ContactPage />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </>
    );
  }

export default RouteManager;