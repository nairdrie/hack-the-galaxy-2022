import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { defaultGridData } from './gridData.js'

let gridLayout = [];

function App() {

  const [ ready, setReady ] = useState(false);
  const [ gridData, setGridData ] = useState(defaultGridData);
  const [ selectedCell, setSelectedCell ] = useState(null);
  const [ selectedCellRow, setSelectedCellRow ] = useState(null);
  const [ selectedCellCol, setSelectedCellCol ] = useState(null);

  const downHandler = ({ key }) => {
    if(isNaN(key)) return;

    togglePossibleValue(key);
  }

  // const selectedCell = () => {
  //   for(let i = 0; i < HEIGHT; i++) {
  //     for(let j = 0; j < WIDTH; j++) {
  //       if(gridData[i][j]?.selected) return gridData[i][j];
  //     }
  //   }

  //   return null;
  // }

  const togglePossibleValue = (value) => {
    console.log("TEST");
    const possibleValues = selectedCell.possibleValues;
    const index = possibleValues.indexOf(value);

    if(index > -1) {
      selectedCell.possibleValues.splice(index, 1);
    }
    else {
      selectedCell.possibleValues.push(value);
    }

    setSelectedCell({
      ...selectedCell,
      possibleValues
    });

    setGridData((oldGridData) => {
      oldGridData[selectedCellRow][selectedCellCol].possibleValues = selectedCell.possibleValues;
      localStorage.setItem("gridData", JSON.stringify(oldGridData));
      return oldGridData;
    })
  }

  const WIDTH = 13;
  const HEIGHT = 13;

  useEffect(()=> {
    document.title = 'NUMBERS GAME'
    window.addEventListener("keydown", downHandler);

    const cachedGrid = localStorage.getItem("gridData");
    if(cachedGrid) {
      setGridData(JSON.parse(cachedGrid));
    }

    gridLayout = [];

    for(let i = 0; i < HEIGHT; i++) {
      const row = [];
      for(let j = 0; j < WIDTH; j++) {
        row.push(0);
      }
      gridLayout.push(row);
    }

    setReady(true);

    return () => {
      window.removeEventListener("keydown", downHandler);
    };

  }, []);

  const handleCellClick = (cell, i, j) => {
    if(cell.cellType != 'value') return;
    setSelectedCell(cell);
    setSelectedCellRow(i);
    setSelectedCellCol(j);
  }

  // const unselectAllCells = () => {
  //   for(let i = 0; i < HEIGHT; i++) {
  //     for(let j = 0; j < WIDTH; j++) {
  //       if(!gridData[i]?.[j]) continue;
  //       console.log("UNSELECTING");
  //       gridData[i][j].selected = false;
  //     }
  //   }
  // }

  return (
    <div className="App">
      <div className="left">
        <h1>NUMBERS GAME</h1>
        { ready && 
          <table>
            <tbody>
              { gridLayout.map((row, i)=> <tr>
                {
                  row.map((cell, j) => gridData[i]?.[j] ? 
                    <td className={(selectedCellRow == i && selectedCellCol == j ? 'selected ' : '') + gridData[i][j].cellType} onClick={()=>{handleCellClick(gridData[i][j], i, j)}}>
                      { gridData[i][j].cellType == 'label' ?
                        <div className="label">
                          <div className="down">
                            { gridData[i][j].downValue }
                          </div>
                          <div className="right">
                            { gridData[i][j].rightValue }
                          </div>
                        </div> :
                        <div className="value">
                          {gridData[i][j].possibleValues.length == 1 ? gridData[i][j].possibleValues[0] : ''}
                        </div>
                      }
                    </td> : 
                    <td></td>
                  )
                }
              </tr>) }
            </tbody>
          </table>
        }
      </div>
      <div className="right">
        { selectedCell ? <h2>Possible Values</h2> : <h2>Click a pink square</h2>}
        { selectedCell &&
          <div className="cell-details">
            <span className={selectedCell.possibleValues.includes(1) ? 'included':''} onClick={(e) => togglePossibleValue(1)}>1</span>
            <span className={selectedCell.possibleValues.includes(2) ? 'included':''} onClick={(e) => togglePossibleValue(2)}>2</span>
            <span className={selectedCell.possibleValues.includes(3) ? 'included':''} onClick={(e) => togglePossibleValue(3)}>3</span>
            <br/>
            <span className={selectedCell.possibleValues.includes(4) ? 'included':''} onClick={(e) => togglePossibleValue(4)}>4</span>
            <span className={selectedCell.possibleValues.includes(5) ? 'included':''} onClick={(e) => togglePossibleValue(5)}>5</span>
            <span className={selectedCell.possibleValues.includes(6) ? 'included':''} onClick={(e) => togglePossibleValue(6)}>6</span>
            <br/>
            <span className={selectedCell.possibleValues.includes(7) ? 'included':''} onClick={(e) => togglePossibleValue(7)}>7</span>
            <span className={selectedCell.possibleValues.includes(8) ? 'included':''} onClick={(e) => togglePossibleValue(8)}>8</span>
            <span className={selectedCell.possibleValues.includes(9) ? 'included':''} onClick={(e) => togglePossibleValue(9)}>9</span>
          </div>
        }
        { !selectedCell

        }
      </div>
    </div>
  )
}

export default App
