import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      formula: [],
      value: "",
      currentKey: "number",
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleInputSpecial = this.handleInputSpecial.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  clearState = () => {
    this.setState({
      display: "0",
      formula: [],
      value: "",
      currentKey: "number",
      avoidStartOperator: false,
    });
  };

  handleInput = (e) => {
    const key = e.target.innerText;

    this.setState((prevState) => {
      if (key >= "0" && key <= "9") {
        if (key !== "0" && this.state.value === "") {
          var display;
          if(prevState.display === "0"){
            display = ""
          }else{
            display = prevState.display
          }
          return {
            value: prevState.value + key,
            display: display + prevState.value + key,
            currentKey: "number",
            avoidStartOperator: true,
          };
        } else if (this.state.value !== "") {
          return {
            value: prevState.value + key,
            display: prevState.display + key,
            currentKey: "number",
            avoidStartOperator: true,
          };
        }
      } else if (this.state.avoidStartOperator) {
        if (this.state.currentKey === "number" || key==='-') {
          return {
            formula: [...prevState.formula, key],
            display: this.state.display + key,
            value: "",
            currentKey: "operator",
          };
        } 
        else if(prevState.display[prevState.display.length-1] === '-' && this.state.currentKey==='operator'){
          prevState.formula.pop();
          prevState.formula.pop();
          const diplayWithoutLastOne = prevState.display.slice(0, -2);
          return {
            formula: [...prevState.formula, key],
            display: diplayWithoutLastOne + key,
            value: "",
            currentKey: "operator",
          };
        }
        else {
          prevState.formula.pop();
          const diplayWithoutLastOne = prevState.display.slice(0, -1);
          return {
            formula: [...prevState.formula, key],
            display: diplayWithoutLastOne + key,
            value: "",
            currentKey: "operator",
          };
        }
      }
    });
  };

  handleInputSpecial = (e) => {
    const key = e.target.innerText;
    if (key === "AC") {
      this.clearState();
    } else if (key === "=") {
      console.log(this.state.display)
      var display = Math.round(1000000000000 * eval(this.state.display)) / 1000000000000;

      this.clearState();
      this.setState({
        display: display,
        value: display,
        avoidStartOperator: true
      });
    } else if (key === ".") {
      this.setState((prevState) => {
        if(prevState.value[prevState.value.length-1] === '.' || prevState.value.includes(key)){
          return
        }
        if (this.state.currentKey === "number") {
          return {
            value: prevState.value+'.',
            display: prevState.display+'.'
          };
        } else if (
          this.state.value === "" ||
          this.state.currentKey === "operator"
        ) {
          return {
            value: '0.',
            display: prevState.display+'0.',
            currentKey: 'number',
          };
        }
      });
    }

    console.table(this.state);
  };

  render() {
    console.log(this.state);
    return (
      <div id="calculator">
        <div id="display">
          {this.state.display}
        </div>
        <div id="keyboard">
          <div
            onClick={this.handleInputSpecial}
            className="button special"
            id="clear"
          >
            AC
          </div>
          <div
            onClick={this.handleInputSpecial}
            className="button special"
            id="del"
          >
            Del
          </div>
          <div
            onClick={this.handleInput}
            className="button operator"
            id="percent"
          >
            %
          </div>
          <div
            onClick={this.handleInput}
            className="button operator"
            id="divide"
          >
            /
          </div>
          <div onClick={this.handleInput} className="button number" id="seven">
            7
          </div>
          <div onClick={this.handleInput} className="button number" id="eight">
            8
          </div>
          <div onClick={this.handleInput} className="button number" id="nine">
            9
          </div>
          <div
            onClick={this.handleInput}
            className="button operator"
            id="multiply"
          >
            *
          </div>
          <div onClick={this.handleInput} className="button number" id="four">
            4
          </div>
          <div onClick={this.handleInput} className="button number" id="five">
            5
          </div>
          <div onClick={this.handleInput} className="button number" id="six">
            6
          </div>
          <div
            onClick={this.handleInput}
            className="button operator"
            id="subtract"
          >
            -
          </div>
          <div onClick={this.handleInput} className="button number" id="one">
            1
          </div>
          <div onClick={this.handleInput} className="button number" id="two">
            2
          </div>
          <div onClick={this.handleInput} className="button number" id="three">
            3
          </div>
          <div onClick={this.handleInput} className="button operator" id="add">
            +
          </div>
          <div onClick={this.handleInput} className="button number" id="zero">
            0
          </div>
          <div
            onClick={this.handleInputSpecial}
            className="button special"
            id="decimal"
          >
            .
          </div>
          <div
            onClick={this.handleInputSpecial}
            className="button special"
            id="equals"
          >
            =
          </div>
        </div>
      </div>
    );
  }
}

export default App;
