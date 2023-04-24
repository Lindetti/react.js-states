import {useState, useEffect} from "react";
import "../Styles/App.scss";
import Card from "./Card";
import Modal from "./Modal/Modal";

const Home = () => {
const name = "Alex";
const age = "28";
const author = "Alexander";

const [counter, setCounter] = useState(0);
const [myName, setMyName] = useState(false);
const [textColor, setTextColor] = useState("");
const [showDiv, setHideDiv] = useState(false);
const [selectedButton, setSelectedButton] = useState("");
const [items, setItems] = useState([]);
const [itemInput, setItemInput] = useState("");
const [result, setResult] = useState("");
const [joke, setJoke] = useState({});
const [isModalActive, setIsModalActive] = useState(false);
const [flipped, setFlipped] = useState(false);
const [timer, setTimer] = useState(0);
const myMappedDivs = [1, 2, 3];
const myButtons = [1, 2, 3];

useEffect(() => {
fetch("https://api.chucknorris.io/jokes/random")
.then((response) => response.json())
.then((data) => {
 setJoke(data.value);
})

const timeId = setInterval(() => {
 setTimer((prev) => prev + 1);
}, 1000);
return () => clearInterval(timeId);
}, [])

const getNewJoke = () => {
        fetch("https://api.chucknorris.io/jokes/random")
        .then((response) => response.json())
        .then((data) => {
         setJoke(data.value);
        })
} 


const handleActiveBtn = (index) => {
setSelectedButton(index);
}
const handleOnChange = (event) => {
    setItemInput(event.target.value);
}

const addItem = (addNewItem) => {
 setItems([...items, addNewItem]);
}

const deleteItem = (index) => {
const updatedItems = [...items];
updatedItems.splice(index, 1);
setItems(updatedItems);
}


const handleSubmit = (event) => {
    event.preventDefault();
    addItem(itemInput);
    setItemInput("");
}

const handleCount = () => {
 if (counter > 0) {
setCounter(counter - 1)
 }
}

const handleNumbers = (value) => {
    setResult(result + value);
}

const handleOperators = (operator) => {
    setResult(result + operator)
}

const handleEqual = () => {
    const sum = eval(result);
    setResult(sum);
}

const resetCalculator = () => {
    setResult("");
}

const showModal = () => {
    setIsModalActive(true)
}

const closeModal = () => {
    setIsModalActive(false)
}

const handleFlip = () => {
    setFlipped(!flipped);
}


    return (
        <div className="home-wrapper">
        <h1>React.js</h1>
        <div className="time-wrapper">
         <p className="mounted-counter-p">Mounted counter: </p>
            <p>You have been here for {timer} seconds</p>
        </div>
        <div className="myFormDiv">
        <form onSubmit={handleSubmit}>
        <label>Insert Item</label>
        <input 
        type="text" 
        placeholder="todo.." 
        value={itemInput}
        onChange={handleOnChange}
        />
        <button disabled={!itemInput} type="submit" className="add">Add</button>
        </form>
        {items.length === 0 ? (
            <div className="noItems">
                 <p className="desc">To Do List:</p>
                <div className="noItemsText"> 
                <p>You have nothing in your todolist!</p>
                </div>
            </div>
        ) : 
        <div className="mapped-list">
        {items.map((item, index) => {
         return (
           <div key={index} className="item-divs">
            <p>{item}</p>
            <div className="itemButtons">
            <button className="complete">Compeleted</button>
            <button className="delete" onClick={() => deleteItem(index)}>Delete</button>
            </div>
           </div>
         )
        })}
        </div>
        }
        </div>
        <div className="buttons">
         <p className="desc">Buttons - menu:</p>
        {myButtons.map((index => {
        const isActive = index === selectedButton;
        const backgroundColor = isActive ? "orange" : "darkgrey";
         return (
            <button key={index} className="activeBtn" onClick={() => handleActiveBtn(index)} style={{backgroundColor: backgroundColor}}>
             {isActive ? "Active Button" : "Not Active"}
            </button>
         )
        }))}
        </div>
        <div className="calculator-wrapper">
        <p className="desc">Calculator:</p>
        <div className="calculator-content"> 
        <div className="result-div">
            <p>{result}</p>
         </div>
         <div className="calc-btns">
         <button onClick={resetCalculator} className="calc-btn grey-btn">C</button>
         <button onClick={() => handleOperators("%")} className="calc-btn grey-btn">%</button>
         <button onClick={() => handleOperators("%")} className="calc-btn grey-btn">%</button>
         <button onClick={() => handleOperators("/")} className="calc-btn orange-btn">/</button>
         <button onClick={() => handleNumbers("7")} className="calc-btn">7</button>
         <button onClick={() => handleNumbers("8")} className="calc-btn">8</button>
         <button onClick={() => handleNumbers("9")} className="calc-btn">9</button>
         <button onClick={() => handleOperators("*")} className="calc-btn orange-btn">X</button>
         <button onClick={() => handleNumbers("4")} className="calc-btn">4</button>
         <button onClick={() => handleNumbers("5")} className="calc-btn">5</button>
         <button onClick={() => handleNumbers("6")} className="calc-btn">6</button>
         <button onClick={() => handleOperators("-")} className="calc-btn orange-btn">-</button>
     
 
         <button onClick={() => handleNumbers("3")} className="calc-btn">3</button>
         <button onClick={() => handleNumbers("2")} className="calc-btn">2</button>
         <button onClick={() => handleNumbers("1")} className="calc-btn">1</button>
         <button onClick={() => handleOperators("+")} className="calc-btn orange-btn">+</button>
         <button onClick={() => handleNumbers("0")} className="calc-btn biggerBtn">0</button>
         <button onClick={() => handleNumbers(".")} className="calc-btn">,</button>
         <button onClick={handleEqual} className="calc-btn">=</button>
         </div>
        </div>
        </div>
        <div className="modal-wrapper">
        <p className="desc">Modal:</p>
        <div className="modal-button">
        {!isModalActive && (
        <button className="try-buttons" onClick={showModal}>Show modal</button>
      )}
       </div>
        <Modal showModal={isModalActive} closeModal={closeModal}/>
        </div>
        <div className="fetched-api-wrapper">
           <p className="desc"> Simple Fetched-Api:</p>
         <div className="fetched-api-div">
            <p>Chuck Norris Joke:</p>
            <p>{JSON.stringify(joke)} </p>
           <button className="try-buttons" onClick={getNewJoke}>New Joke</button> 
         </div>
        </div>
        <div className="card-wrapper">
       <div className="card-info">
        <p className="desc">Card flip:</p>
       </div>
        <div className={`card ${flipped ? "flipped" : ""}`} onClick={handleFlip}>
        <div className="card-front">Click me to flip</div>
      <div className="card-back">Hello, im the back</div>
        </div>
        </div>
        <div className="arrayDivs">
        <p className="desc">Mapped Array:</p>
        <div className="mapped-divs-wrapper"> 
        {myMappedDivs.map((index) => {
        return (
            <div key={index} className="myMappedDivs-div">
           <p>Mapped div: {index} </p>
            </div>
        )
        })}
        </div>
        </div>
        <div className="myDiv-hide-wrapper">
        <p className="desc">Hide / Show element:</p>
        <div className="myDiv">
        <p>{showDiv ? "Wow you are a magican!!" : ""}</p>
         <div className={`myHideDiv ${showDiv ? "display-none" : "display-block"}`}>
         <div className="disappeared-div">
         <p>Can you make me disappear?</p>
         </div>
         </div>
         <button className="hide-btn" onClick={() => setHideDiv(!showDiv)}>{!showDiv ? "Abrakadabra" : "Again"}</button>
        </div>
        </div>
      
        <div className="names">
        <p className="desc">Change text / color:</p>
        <div className="changeNameDiv">
        <p style={textColor ? {color: "orange"} : {color: "white"}}>{myName ? "No, my name is Alexander" : "My name is Dexter"}</p>
        <div className="nameButtons">
        <button className="try-buttons" onClick={() => setMyName(!myName)}>
        {myName ? "Alexander" : "MyName ?"}
        </button>
        <button className="try-buttons" onClick={() => setTextColor(!textColor)}>
        {textColor ? "Change to default" : "Change Text Color"}
            </button>
        </div>
        </div>
        </div>
        <div className="counter-wrapper"> 
        <p className="desc">Counter:</p>
            <div className="counter"> 
        <div className="counted">
        <p>Counted: {counter}</p>
        </div>
         <div className="counterBtns"> 
         <button className="try-buttons" onClick={() => setCounter(counter + 1)}>+</button>
         <button className="try-buttons" onClick={handleCount}>-</button>
         <button className="try-buttons" onClick={() => setCounter(0)}>Reset Counter</button>
         </div>
         </div>
         </div>
         <div className="props-div"> 
         <p className="desc">Props:</p>
         <div className="props-component">
         <Card name={name} age={age} author={author}/>
         </div>
         </div>
        </div>
    )
}

export default Home;