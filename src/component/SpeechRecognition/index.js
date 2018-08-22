'use strict'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

class SpeechRecognition extends Component {
  constructor(props){
    super(props);
    this.state = {
      finalTranscript: '',
      interimTranscript: '',
      listening: false,
      transcript: '',
      answer: ''
    }
  }

  componentDidMount() {
    this.setState({ transcript: this.props.transcript });
  }

  toggleListen = () => {
    this.setState({
      listening: !this.state.listening,
      answer: '',
      finalTranscript: '',
      interimTranscript: ''
    }, () => this.handleListen());
  }

  handleListen = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition()

    recognition.continous = true
    recognition.interimResults = true
    recognition.lang = 'en-GB'

    if (this.state.listening) {
      recognition.start();
    } else {
      recognition.stop();
      recognition.onend = () => {
      }
    }

    recognition.onstart = () => {
    }

    recognition.onresult = event => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        let finalTranscript = '';
        let interimTranscript = '';
        if (event.results[i].isFinal) {
          this.setState({finalTranscript:  finalTranscript += transcript });
          if (this.state.interimTranscript == this.state.transcript) {
            this.props.increaseScore();
            recognition.stop();
            this.setState({
              answer: `Tebrikler ${this.state.transcript}, doğru.`,
              listening: false
            });
            setTimeout(() => {
              this.props.nextWord();
            }, 2000);
          } else if (this.state.finalTranscript !== this.state.transcript) {
            this.props.decreaseScore();
            recognition.stop();
            this.setState({
              answer: `Doğru cevap ${this.state.transcript} olacaktı.`,
              listening: false
            });
            setTimeout(() => {
              this.props.nextWord();
            }, 2000);
          }
        } else {
          this.setState({interimTranscript:  interimTranscript += transcript, listening: false });
          console.log(this.state.interimTranscript.length);
          if(this.state.interimTranscript.length > this.state.transcript.length + 5) {
            recognition.stop();
            this.setState({ answer: 'Kelimeden fazla konuştun.', listening: false });
            setTimeout(() => {
              this.props.nextWord();
            }, 2000);
          }
        }
      }

      // for stop 
      // const transcriptArr = this.state.finalTranscript.split(' ');
      // const stopCmd = transcriptArr.slice(-3, -1);
      // console.log('stopCmd', stopCmd)

      // if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening'){
      //   recognition.stop()
      //   recognition.onend = () => {
      //     console.log('Stopped listening per command')
      //     const finalText = transcriptArr.slice(0, -3).join(' ')
      //     this.setState({ finalText });
      //   }
      // }
    }

    recognition.onerror = event => {
      console.log("Error occurred in recognition: " + event.error)
      this.setState({ listening: false });
    }
  }

  render() {
    return (
      <div className="speechRoot">
        <FontAwesomeIcon
          onClick={this.toggleListen}
          icon={faMicrophone}
          className="soundIcon"
        />
        {this.state.listening && <div>Dinleme Açık</div>}
        {this.state.answer !== '' && <div>{this.state.answer}</div> }
      </div>
    );
  }
}

SpeechRecognition.propTypes = {
  transcript: PropTypes.string
};

SpeechRecognition.defaultProps = {
  transcript: 'hello baby'
};

function mapStateToProps(state) {
  return {
    score: state.score,
    questionCount: state.questionCount,
    finished: state.finished
  }
}

function matDispatchToProps(dispatch) {
  return {
    increaseScore: () =>{dispatch({type: 'INCREASE_SCORE'})},
    decreaseScore: () =>{dispatch({type: 'DECREASE_SCORE'})},
  }
}

export default connect(mapStateToProps,matDispatchToProps)(SpeechRecognition);