import React, { useState , useEffect} from 'react';
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


const funcStyle = 'color:blue';
let funId = 0;
// 함수방식 => return 즉 자기 자신이 render 
// 훅과 라이프사이클을 사용할 수있다. 
function FuncComp (props) {
  // useState훅으로 함수에 state를 제공 
  // state를 만들고 싶다면 userState의 초기값을 return 
  const numberState = useState(props.initNumber);
  // retrun 하는 첫번째 값 : state의 상태값
  const number = numberState[0];
  console.log('numberState', numberState);
  // retrun 하는 첫번째 값 : state의 상태를 바꿀수있는 함수
  const setNumber = numberState[1];


  // const dateState = useState((new Date()).toString());
  // const _date = dateState[0];
  // const setDate = dateState[1];
  const [_date, setDate] = useState((new Date()).toString());


  // componentDidMount 만 호출 
  useEffect(function(){
    console.log('%cfunc => useEffect (componentDidMount)' +  (++funId), funcStyle);
    document.title = number;

    return function() {
      console.log('%cfunc => useEffect return (componentDidMount' +  (++funId), funcStyle);
    }
  });

  // 첫번째인자 : 함수
  useEffect(function(){
    console.log('%cfunc => useEffect number (componentDidMount & componentDidUpdate)' +  (++funId), funcStyle);
    // document.title = number + ' : ' + _date;
    document.title = number;


    // clean up : return 값인 함수를 품고있는 함수가 다시 실행될때 실행된다 
    // Specify how to clean up after this effect
    return function() {
      console.log('%cfunc => useEffect  number return (componentDidMount & componentDidUpdate)' +  (++funId), funcStyle);
    }
  },
  // 배열안에있는 원소의 값인 상태만 바뀌었을때만 첫번째 인자인 콜백함수가 호출되도록 약속되어있다. 
  [number]);


  useEffect(function(){
    console.log('%cfunc => useEffect date (componentDidMount & componentDidUpdate)' +  (++funId), funcStyle);
    document.title = _date;
     return function() {
      console.log('%cfunc => useEffect _date return (componentDidMount & componentDidUpdate)' +  (++funId), funcStyle);
    }
  },
  // 배열안에있는 원소의 값인 상태만 바뀌었을때만 첫번째 인자인 콜백함수가 호출되도록 약속되어있다. 
  [_date]);

  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number : { number }</p>
      <p>Date : { _date }</p>
      <input type="button" value="random" onClick={
          function(){
            setNumber(Math.random());
          }
        }></input>
        <input type="button" value="date" onClick={
          function(){
            setDate((new Date()).toString());
          }
        }></input>
    </div> 
  )
}
const classStyle = 'color:red';
// 클래스로 컴포넌트 => render 메소드를 정의해서 return한값이 UI가 된다.
class ClassComp extends React.Component {
  state = {
    number: this.props.initNumber,
    date: (new Date()).toString()
  }
  componentWillMount() {
    console.log('%cclass => componentWillMount', classStyle);
  }
  componentDidMount() {
    console.log('%cclass => componentDidMount', classStyle);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('%cclass => shouldComponentUpdate', classStyle);
    return true;
  }
  render() {
    console.log('%cclass => render', classStyle);
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.state.number} </p>
        <p>date : {this.state.date} </p>
        <input type="button" value="random" onClick={
          function(){
            this.setState({number: Math.random()})
          }.bind(this)
        }></input>
         <input type="button" value="date" onClick={
          function(){
            this.setState({date: (new Date()).toString()})
          }.bind(this)
        }></input>
      </div>
    )
  }
}

export default App;
