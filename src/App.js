import React from 'react'
import './App.css'

export default class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      number:10,
      ratio:50,
      dots:[]
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.drawDot = this.drawDot.bind(this);
    this.getRandomNumber= this.getRandomNumber.bind(this);
    this.newDot = this.newDot.bind(this);
    this.starting = this.starting.bind(this);
    this.move = this.move.bind(this);
    this.updatePos = this.updatePos.bind(this);

  }

  handleChange(event){
    this.setState({ [event.target.name]:event.target.value})        
  }

  getRandomNumber(min,max){
    return Math.floor( Math.random() * (max-min+1) + min );
  }

  newDot() {
    const dot = {
      x: this.getRandomNumber(10, 791),
      y: this.getRandomNumber(10, 791)

    }
    return dot;
  }  


  drawDot(dot, col = 'rgb(51, 153, 255)'){

    const canva = document.getElementById('canva');
    const ctx = canva.getContext('2d');

    const radius = 10
    const startAngle = 0
    const endAngle = 2*Math.PI

    ctx.beginPath();
    ctx.arc(dot.x,dot.y,radius,startAngle,endAngle);
    ctx.fillStyle = col;
    ctx.fill();

  }

  starting(){
    const number = this.state.number;
    const dots = [];
    for(let i=0;i<number;i++){
      let dot = this.newDot();
      this.drawDot(dot);
      dots.push(dot);
    }
    this.setState({dots:dots})
  }

  move(dot){
    
    const x = dot.x;
    const y = dot.y;
    const dx = [-10,0,10];
    const dy = [-10,0,10];

    if(x===10 || x===790 || y===10|| y===790){

      if(x===10){
        dot.x = x + dx[2];
      }else if(x===790){
        dot.x = x + dx[0];
      }
      if(y===10){
        dot.y = y + dy[1];
      }else if(y==790){
        dot.y = y + dy[0];
      }

    }else{
      dot.x += dx[this.getRandomNumber(0,2)] ;
      dot.y += dy[this.getRandomNumber(0, 2)];
    }

    return dot;
  }

  updatePos(){

    const canva = document.getElementById('canva');
    const ctx = canva.getContext('2d');
    // ctx.clearRect(0,0,800,800);

    const dots = this.state.dots;
    const moved = []
    for(let dot of dots){

      moved.push(this.move(dot));
    }

    for (let dot of moved) {

      this.drawDot(dot,'red');
    }

  }


  componentDidMount(){

    // setTimeout(()=>this.starting(),3000);

    // setTimeout(()=>this.updatePos(),5000);
  }


  render(){
    return (
      <div className='container'>





        <div className='canva'>
          <canvas id='canva' width='800' height='800'></canvas>
        </div>





        <div className='params'>

          <label>Number: <br />
            <input type='range' name='number' min='1' max='100' value={this.state.number} onChange={this.handleChange}/>
          </label>

          <label> Ratio: <br />
            <input type='range' name='ratio' min='1' max='100' value={this.state.ratio} onChange={this.handleChange}/>
          </label>

        </div>




        <div className='actions'>
          <button onClick={this.drawNewDot}>Start!</button>
          <button>Stop!</button>
        </div>



      </div>

    )}


}