import React, { Component } from "react";
import Home from "./Pages/Home/Home";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      error: "",
      name: "",
      email: ""
    };
  }

  getContact = async id => {
    // check if we already have the contact
    const previous_contact = this.state.contacts.find(
      contact => contact.id === id
    );
    if (previous_contact) {
      console.log(previous_contact);
      return; // do nothing, no need to reload a contact we already have
    }
    try {
      const response = await fetch(`http://localhost:8080/contact/${id}`);
      const result = await response.json();
      if (result.success) {
        // add the user to the current list of contacts
        const contact = result.result;
        const contacts = [...this.state.contacts, contact];
        this.setState({ contacts, error: "" });
      } else {
        this.setState({ error: result.message });
      }
    } catch (err) {
      this.setState({ error: err });
    }
  };

  deleteContact = async id => {
    try {
      const response = await fetch(
        `http://localhost:8080/contacts/delete/${id}`
      );
      const result = await response.json();
      if (result.success) {
        // remove the user from the current list of users
        const contacts = this.state.contacts.filter(
          contact => contact.id !== id
        );
        this.setState({ contacts, error: "" });
      } else {
        this.setState({ error: result.message });
      }
    } catch (err) {
      this.setState({ error: err });
    }
  };

  updateContact = async (id, props) => {
    try {
      if (!props && !props.name && !props.email) {
        throw new Error(
          `you need at least name or email properties to update a contact`
        );
      }
      let url = "";
      const { name, email } = props;

      if (name && email) {
        url = `http://localhost:8080/contacts/update/${id}?name=${name}&email=${email}`;
      }
      if (name) {
        url = `http://localhost:8080/contacts/update/${id}?name=${name}`;
      }
      if (email) {
        url = `http://localhost:8080/contacts/update/${id}?email=${email}`;
      }
      const response = await fetch(url);
      const result = await response.json();
      if (result.success) {
        // we update the user, to reproduce the database changes:
        const contacts = this.state.contacts.map(contact => {
          // if this is the contact we need to change, update it. This will apply to exactly
          // one contact
          if (contact.id === id) {
            const new_contact = {
              id: contact.id,
              name: props.name || contact.name,
              email: props.email || contact.email
            };
            return new_contact;
          }
          // otherwise, don't change the contact at all
          else {
            return contact;
          }
        });
        this.setState({ contacts, error: "" });
      } else {
        this.setState({ error: result.message });
      }
    } catch (err) {
      this.setState({ error: err });
    }
  };

  createContact = async props => {
    try {
      if (!props || !(props.name && props.email)) {
        throw new Error(
          `you need both name and email properties to create a contact`
        );
      }
      const { name, email } = props;
      const response = await fetch(
        `http://localhost:8080/contacts/create?name=${name}&email=${email}`
      );
      const result = await response.json();
      if (result.success) {
        // we reproduce the user that was created in the database, locally
        const id = result.result;
        const contact = { name, email, id };
        const contacts = [...this.state.contacts, contact];
        this.setState({ contacts, error: "" });
      } else {
        this.setState({ error: result.message });
      }
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  getContactList = async () => {
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
  };

  onSubmit = async (e)=>{
    e.preventDefault();
   const file= e.target.fileField.files[0];
   console.log(file);
   const body = new FormData();
   body.append('image', file);
   body.append('name', this.state.name);
   body.append('email', this.state.email);
   const response = await fetch("http://localhost:8080/testfile", {
     method:'POST', 
     body:body
   });
   const result = await response.json();
   console.log(result)
   // this.createContact({name:this.state.name, email:this.state.email});
  }


  async componentDidMount() {
    this.getContactList();
  }
  render() {
    return (
      <div className="App">
        {this.state.error ? <p>{this.state.error}</p> : false}
        Contact List:
        <ul>
          {this.state.contacts.map(contact => (
            <li>
              {contact.id}-{contact.name}
            </li>
          ))}
        </ul>
        <button onClick={() => this.getContactList()}>Reload</button>
        <button onClick={() => this.getContact(2)}>Get</button>
        <button onClick={() => this.deleteContact(5)}>Delete</button>
        <button onClick={() => this.updateContact(4, { name: "a" })}>
          Update
        </button>
        <form onSubmit={this.onSubmit}>
          <input placeholder="name" value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})}/>
          <input placeholder="email" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})}/>
          <input  type='file' name='fileField'/>
          <input type="submit" value="ok" />
        </form>
      </div>
    );
  }
}

export default App;
