import React, { Component } from "react";
import Home from "./Pages/Home/Home";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { contacts: [], error: "" };
  }

 getContactList = async()=>{
    try {
      const response = await fetch("http://localhost:8080/contacts");
      const result = await response.json();
      console.log(result);
      if (result.success) {
        this.setState({ contacts: result.result, error: "" });
      } else {
        this.setState({ error: result.message });
      }
    } catch (err) {
      this.setState({ error: err });
    }
  }
  async componentDidMount() {
   this.getContactList();
  }
  render() {
    return (
      <div className="App">
        {this.state.error?<p>{this.state.error}</p>:false}
        Contact List:
        <ul>
          {this.state.contacts.map(contact => (
            <li>{contact.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
