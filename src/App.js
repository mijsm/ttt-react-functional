// import { Component } from "react";
import { useState } from 'react';
import './App.css';
import Status from './components/Status';
import Square from './components/Square';

//global vars
const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
  ];


//helper methods

//check if a player has won, if so, return that player and
//the line that won.
const calculateWinner = (squares) => {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && 
      squares[a] === squares[b] && 
      squares[a] === squares[c]) {
        //if a line wins, return winner and the winning line
          return {winner: squares[a], winningLine: lines[i]};
    }
  }
  //otherwise return null values
  return {winner: null, winningLine:[]};
}

function App() {
  //state - now uses the useState hook
  //useState returns an array. First element is state var. Second element is a setter function
  //Parameter to useState initializes the var
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState({winner: null, winningLine: []});


  const renderSquare = (i) => {
		const className = (squares[i] == null) ? "square" :
		  (winner.winner != null && 
		  winner.winner === squares[i]) &&
		  winner.winningLine.includes(i) ? 
			"square-winner" : "square-full";
        const enabled = (winner.winner == null && squares[i] == null) ? true : false;
        const eventHandler = (enabled)? handleClick : () => {};
        const value = (squares[i] != null) ? squares[i] : "";
        return (
          <Square
            className={className}
            eventHandler={eventHandler}
            value={value}
            index={i}
          />
        );
    }


  const handleClick = (event) => {
    //id is a string by default
    const i = parseInt(event.target.id);

    //make a new array using spread operator copying squares array from state
    let localSquares = [...squares];
    localSquares[i] = xIsNext ? 'X' : 'O';
    const theWinner = calculateWinner(localSquares);

    //update state
    setSquares(localSquares);
    setXIsNext(!xIsNext);
    setWinner(theWinner);
  }


  //body of render
  let status;
  if (winner.winner) {
    status = 'Winner: ' + winner.winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return ( 
    <div>
      <Status status={status} />
      <div className="board-row">
          {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div className="board-row">
          {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div className="board-row">
          {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>
    </div>
  );
 
  // constructor (props) {
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xIsNext: true,
  //     winner: null,
  //     winningLine: [],
  //   };
      
	//     this.handleClick = this.handleClick.bind(this);
  // }

  // handleClick(event) {
  //   const i = event.target.id;
  //   //console.log(i);

  //   //make a new array using spread operator copying squares array from state
  //   let squares = [...this.state.squares];
  //   squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   const theWinner = this.calculateWinner(squares);
  //   this.winner = theWinner.player;
  //   this.winningLine = theWinner.winningLine;
  //   this.xIsNext = !(this.xIsNext);

  //   this.setState( {
  //     squares: squares,
  //     xIsNext: !this.state.xIsNext,
  //     winner: theWinner.player,
  //     winningLine: theWinner.winningLine,
  //   } );
  // }

  

  // renderSquare(i) {
	// 	const className = (this.state.squares[i] == null) ? "square" :
	// 	  (this.state.winner != null && 
	// 	  this.state.winner === this.state.squares[i]) &&
	// 	  this.state.winningLine.includes(i) ? 
	// 		"square-winner" : "square-full";
  //       const enabled = (this.state.winner == null && this.state.squares[i] == null) ? true : false;
  //       const eventHandler = (enabled)? this.handleClick : () => {};
  //       const value = (this.state.squares[i] != null) ? this.state.squares[i] : "";
  //       return (
  //         <Square
  //           className={className}
  //           eventHandler={eventHandler}
  //           value={value}
  //           index={i}
  //         />
  //       );
  //   }
  
  // render() {
  //   let status;
  //   if (this.state.winner) {
  //     status = 'Winner: ' + this.state.winner;
  //   } else {
  //     status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  //   }
  
  //   return ( 
  //     <div>
  //       <Status status={status} />
  //       <div className="board-row">
  //           {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
  //       </div>
  //       <div className="board-row">
  //           {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
  //       </div>
  //       <div className="board-row">
  //           {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
  //       </div>
  //     </div>
  //   );
  // }
}

export default App;