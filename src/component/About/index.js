import React, { Component } from 'react';
import  { Link } from 'react-router-dom'

import MainBox from '../MainBox';

import './style.css';


export default function About() {
  return (
    <MainBox>
      <div className="mainAbout">
        <div className="hello">Merhaba Arkadaşım!</div>
        <div className="wtf">Birlikte ingilizce kelimeleri daha iyi öğreneceğiz. Nasıl mı?</div>
        <div className="description">Oyun Basit! iki modülü de tamamladığında hem kelime dağarcığını geliştireceksin hem de telaffuzlarını daha iyi öğreneceksin.</div>
        <div className="areYouReady">Eğer bu deneyime hazırsan</div>
        <Link to="/words">
          <span className="begin">Başlayalım</span>
        </Link>
      </div>
    </MainBox>
  );
}

