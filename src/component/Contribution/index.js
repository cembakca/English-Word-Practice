import React, { Component } from 'react';
import  { Link } from 'react-router-dom'

import MainBox from '../MainBox';

import './style.css';


export default function About() {
  return (
    <MainBox>
      <div>
        <div className="help">Destek Olmak İster Misin?</div>
        <div className="description">Daha fazla kelime olmasını sağlarsan beni çok mutlu edersin.</div>
        <div className="areYouReady">
          Bunu yapabilmek için repodaki <strong>constants/wordList</strong> içine gir ve yeni kelimeler ekleyebilirsin.
        </div>
        <a href="" className="repo">Repo</a>
      </div>
    </MainBox>
  );
}

