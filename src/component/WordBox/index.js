import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'


import Loader from '../Loader';
import SpeechRecognition from '../SpeechRecognition';


import { API_URL } from '../../api';
import constant from '../../constants/wordList';

import './style.css';
import MainBox from '../MainBox';


class WordBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      value:'',
      word:'',
      data:'',
      meaning: [],
      score: 0,
      pass: 3
    }
  }

  componentDidMount() {
    const { score } = this.props;
    this.setState({ score });
    this.getNewWord();
  }

  pass = () => {
    this.setState({ pass: this.state.pass > 0 ? this.state.pass - 1: 0});
    if( this.state.pass > 0) {
      this.props.decreaseScore();
      this.getNewWord();
    }
  }

  againNewWord = () => {
    this.props.resetScore();
    this.getNewWord();
  }

  getNewWord = () => {
    const index=Math.floor(Math.random() * constant.wordList.length);
    const url= API_URL + constant.wordList[index];

    this.setState({ loading: true }, () => {
      axios.get(url).then(response=>{
        const el = document.createElement( 'html' );
        el.innerHTML = response.data;
        
        const elements_data=el.getElementsByClassName('lr_dct_ph XpoqFe')[0].innerText;
        const meaning=el.getElementsByClassName('PNlCoe XpoqFe')[0].innerText;
        const splitDot = meaning.split('.');
        const meaningAll = splitDot[0].split(';');

        
        this.setState({
          data: elements_data.slice(0, -1),
          meaning:meaningAll,
          value: index,
          word: constant.wordList[index],
          loading: false,
        });
      });
    });
  }
  playAudio = () => {
    var audio_url='https://ssl.gstatic.com/dictionary/static/sounds/20160317/'+this.state.word+'--_gb_1.mp3'

    var playSound=new Audio(audio_url);
    playSound.play();
    playSound.controls = true;
    this.props.decreaseScore();
  }

   finishedStatus = () => (
    <div>
      <h1>Tebrikler Bitti</h1>
      <button onClick={this.againNewWord} className="button">
        Yeniden Oyna
      </button>
    </div>
  );


  render() {
    return(
      <MainBox>
        {
          this.state.loading ? <Loader /> :
          <React.Fragment>
            {!this.props.finished ?
              <React.Fragment>
              <div className="pronunciation">
                {this.state.data}
                <FontAwesomeIcon
                  onClick={this.playAudio}
                  icon={faPlay}
                  className="soundIcon"
                />
              </div>
              <div className="word">
                {this.state.word}
              </div>
              <div className="meaning">{this.state.meaning[0]}</div>
              <div className="buttons">
                <button disabled={this.state.pass === 0} onClick={this.pass} className="button">
                  Pass
                </button>
                <div className="pass"><strong>{this.state.pass} </strong> Hakkın Kaldı</div>
              </div>
              <SpeechRecognition nextWord={this.getNewWord} transcript={this.state.word} />
              </React.Fragment>: this.finishedStatus()}
          </React.Fragment>
        }
        </MainBox>
    );
  }
}

function mapStateToProps(state) {
  return {
    score: state.score,
    questionCount: state.questionCount,
    finished: state.finished
  }
}

function mapDispatchToProps(dispatch) {
  return {
    increaseScore: () =>{dispatch({type: 'INCREASE_SCORE'})},
    decreaseScore: () =>{dispatch({type: 'DECREASE_SCORE'})},
    resetScore: () =>{dispatch({type: 'RESET_SCORE'})},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WordBox);