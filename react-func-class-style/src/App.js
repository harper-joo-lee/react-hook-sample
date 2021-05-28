import React, { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Hello World</h1>
      <FuncComp initNumber={2}></FuncComp>
      <ClassComp initNumber={2}></ClassComp>
    </div>
  );
}

// 함수방식 => return 즉 자기 자신이 render 
function FuncComp (props) {
  const numberState = useState();
  const number = numberState[0];
  console.log('numberState', numberState);
  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number : { number }</p>
    </div> 
  )
}
 
// 클래스로 컴포넌트 => render 메소드를 정의해서 return한값이 UI가 된다.
class ClassComp extends React.Component {
  state = {
    number: this.props.initNumber
  }
  render() {
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.state.number} </p>
        <input type="button" value="random" onClick={
          function(){
            this.setState({number: Math.random()})
          }.bind(this)
        }></input>
      </div>
    )
  }
}

export default App;
