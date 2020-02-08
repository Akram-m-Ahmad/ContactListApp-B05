import React, { Component } from 'react';
import Home from './Pages/Home/Home'
class App extends Component {
  constructor(props){
    super(props);
    this.state = { contacts : [] };
  }
 
  async componentDidMount(){
    const response =  await fetch('http://localhost:8080/contacts');
    const result = await response.json();
    console.log(result);
    this.setState({contacts:result, error:"none"});
  }
  render(){
    return(
      <div className='App'>
      Contact List:
      <ul>
      {
        this.state.contacts.map(contact=><li>{contact.name}</li>)
      }
     </ul>
      </div>
    )
  }
}

export default App;
