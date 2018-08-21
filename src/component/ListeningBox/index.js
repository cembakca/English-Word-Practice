import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'


import constant from '../../constants/wordList';

import './style.css';
import MainBox from '../MainBox';


class ListeningBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      word:'',
      answer: '',
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

  nexWord = () => {
    this.setState({
      word:'',
      answer: ''
    });
    this.getNewWord();
  }

  againNewWord = () => {
    this.props.resetScore();
    this.getNewWord();
  }

  getNewWord = () => {
    const index=Math.floor(Math.random() * constant.wordList.length);
    console.log(index);
    this.setState({
      word: constant.wordList[index],
    });
    this.playAudio();
  }

  playAudio = () => {
    const audio_url= 'https://ssl.gstatic.com/dictionary/static/sounds/20160317/'+this.state.word+'--_gb_1.mp3'

    const playSound= new Audio(audio_url);
    playSound.play();
    playSound.controls = true;
  }

   finishedStatus = () => (
    <div>
      <h1>Tebrikler Bitti</h1>
      <button onClick={this.againNewWord} className="button">
        Yeniden Oyna
      </button>
    </div>
  );

  onChangeText = (e) => {
    const inputValue = e.target.value;
    if(inputValue.length === this.state.word.length) {
      if(inputValue === this.state.word) {
        this.props.increaseScore();
        this.setState({ 
          answer: `Tebrikler ${this.state.word}, doğru.`,
        });
        setTimeout(() => {
          this.nexWord();  
        }, 2000);
        e.target.value = '';
      } else {
        this.props.decreaseScore();
        this.setState({ 
          answer: `Doğru cevap ${this.state.word} olacaktı.`,
        });
        setTimeout(() => {
          this.nexWord();  
        }, 2000);
        e.target.value = '';
      }
    }
  }

  render() {
    return(
      <MainBox mainClassName="mainListening">
        {!this.props.finished ?
            <React.Fragment>
              <FontAwesomeIcon
                onClick={this.playAudio}
                icon={faPlay}
                className="soundIcon"
              />
              <input
                onChange={e => this.onChangeText(e)}
                className="input text"
                type="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
              {this.state.answer !== '' && <div className="answer">{this.state.answer}</div> }
              <div className="buttons">
                <button onClick={this.pass} className="button">
                  Pass
                </button>
                <div className="pass"><strong>{this.state.pass} </strong> Hakkın Kaldı</div>
              </div>
            </React.Fragment>: this.finishedStatus()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ListeningBox);