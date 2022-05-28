import React, { Component } from 'react';
import axios from 'axios';

export default class Calculator extends Component {

    constructor(props){
        super(props);
        this.state = {
            textLine: '',
            numberLine: '',
            responseServer: ''
          }
        this.operators = ['+', '-', '*', '/'];
        this.lastPress = '';
    }

    pressAction(val){
        
        switch(val){
            case '+':
            case '-':
            case '/':
            case '*':
                if(this.state.numberLine !== '' || this.state.textLine !== ''){
                    if(this.operators.indexOf(this.lastPress) === -1 &&
                       this.state.textLine.toString().indexOf('+') === -1 &&
                       this.state.textLine.toString().indexOf('-') === -1 &&
                       this.state.textLine.toString().indexOf('/') === -1 &&
                       this.state.textLine.toString().indexOf('*') === -1
                       ){
                        this.setState({textLine: this.state.textLine+this.state.numberLine+val, numberLine: ''});
                        this.setState({numberLine: ''});
                        let res = this.calcResult();
                        if(res !== null){
                            this.setState({textLine: res+val});
                        }
                    }
                   
                }
                break;
            case '=':
                let res = this.calcResult();
                this.setState({numberLine: '', textLine: res});
                this.sendData(res.toString());
                break;
            case 'DEL':
                if(this.state.numberLine.length > 1){
                    this.setState({numberLine: this.state.numberLine.substring(0, this.state.numberLine.length - 1)});
                }else{
                    this.setState({numberLine: ''});
                }
                break;
            case 'C':
                this.setState({textLine: '', numberLine: ''});
                break;
            default:
                    if(typeof parseInt(val, 10) === 'number'){
                        if(val === '0'){
                            if(this.state.numberLine !== ''){
                                this.setState({numberLine: this.state.numberLine + val});
                            }
                        }else{
                            this.setState({numberLine: this.state.numberLine + val});
                        }
                     }
                break;
        }
        this.lastPress = val;
    }

    calcResult(){

        let operator = '';
        let th = this;
        for(let op of this.operators){
            if(th.state.textLine.indexOf(op) !== -1){
                operator = op;
                break;
            }
        }
        switch(operator){
            case '+':
            case '-':
            case '/':
            case '*':
                let numbers = this.state.textLine.split(operator);
                let res = '';
                let x1 = parseInt(numbers[0], 10);
                let x2 = parseInt(this.state.numberLine, 10);
                if(numbers[0].indexOf('.') !== -1){
                    x1 = parseFloat(numbers[0], 10);
                }
                if(this.state.numberLine.indexOf('.') !== -1){
                    x2 = parseFloat(this.state.numberLine, 10);
                }
                if(operator === '+'){
                    res = x1 + x2;
                }else if(operator === '-'){
                    res = x1 - x2;
                }else if(operator === '/'){
                    res = x1 / x2;
                }else if(operator === '*'){
                    res = x1 * x2;
                }
                return res.toString();
            default:
                return null;
        }
    }

    sendData(value){
        // axios({
        //     method: 'GET',
        //     url: 'http://localhost:80/test/calculatrice-react/save.php?value='+value,
        //     responseType: 'json',
        //     data: {value: 'value'}
        //   })
        //   .then((response) => {
        //     this.setState({responseServer: response.data.message});
        //   })
        //   .catch( (error) => {
        //     console.log(error);
        //   });
    }

    render(){
        return(
        <div className="calculator">
            <div id="text-line">{this.state.textLine}</div>
            <div id="result-line">{this.state.numberLine}</div>
            <div className="buttons">
              <div className="block-button">
                <div className="button" onClick={() => {this.pressAction('')}}>...</div>
                <div className="button" onClick={() => {this.pressAction('C')}}>C</div>
                <div className="button" onClick={() => {this.pressAction('DEL')}}>DEL</div>
                <div className="button" onClick={() => {this.pressAction('/')}}>/</div>
              </div>
              <div className="block-button">
                <div className="button" onClick={() => {this.pressAction('7')}}>7</div>
                <div className="button" onClick={() => {this.pressAction('8')}}>8</div>
                <div className="button" onClick={() => {this.pressAction('9')}}>9</div>
                <div className="button" onClick={() => {this.pressAction('*')}}>x</div>
              </div>
              <div className="block-button">
                <div className="button" onClick={() => {this.pressAction('4')}}>4</div>
                <div className="button" onClick={() => {this.pressAction('5')}}>5</div>
                <div className="button" onClick={() => {this.pressAction('6')}}>6</div>
                <div className="button" onClick={() => {this.pressAction('-')}}>-</div>
              </div>
              <div className="block-button">
                <div className="button" onClick={() => {this.pressAction('1')}}>1</div>
                <div className="button" onClick={() => {this.pressAction('2')}}>2</div>
                <div className="button" onClick={() => {this.pressAction('3')}}>3</div>
                <div className="button" onClick={() => {this.pressAction('+')}}>+</div>
              </div>
              <div className="block-button">
                <div className="button" onClick={() => {this.pressAction('')}}>...</div>
                <div className="button" onClick={() => {this.pressAction('0')}}>0</div>
                <div className="button" onClick={() => {this.pressAction('.')}}>,</div>
                <div className="button" onClick={() => {this.pressAction('=')}}>=</div>
              </div>
            </div>
            <div>{this.state.responseServer}</div>
        </div>
        );
    }
}

