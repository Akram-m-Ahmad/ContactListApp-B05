import React from "react";

class Contact extends React.Component {
  state = {
    editMode: false
  };

  toggleMode() {
    this.setState({ editMode: !this.state.editMode });
  }

  onSubmit = (evt)=>{
      evt.preventDefault();
      const form = evt.target;
      const name = form.contact_name_input.value;
      const email = form.contact_email_input.value;
      const id = this.props.contact.id;
      this.props.updateContact(id, {name, email});
      this.toggleMode();
  }

  renderEditMode() {
    return (
        <> <div className="card profile">
            <form onSubmit={this.onSubmit} onReset={()=>this.toggleMode()}>
    <div className="card-header profileName">
    <p>Name:
    <input
        type="text"
        placeholder="name"
        name="contact_name_input"
        defaultValue={this.props.contact.name}
      />
</p>
    </div>
    <div className="card-body profileBody">
      <div className="profilePic">
        <img
          className="avatar"
          src="https://avatars1.githubusercontent.com/u/8537504?s=400&amp;v=4"
          alt="Username"
        />
      </div>
      <div className="profileInfo">
        <p>Email: 
        <input
        type="text"
        placeholder="email"
        name="contact_email_input"
        defaultValue={this.props.contact.email}
      />

        </p>
      </div>
      <input className="action-button" type="submit" value="ok" />
        <input className="action-button" type="reset" value="cancel"/>

    </div>
    </form>
  </div></>
    );
  }

  renderViewMode() {
    return (<> <div className="card profile">
    <div className="card-header profileName">{this.props.contact.name}</div>
    <div className="card-body profileBody">
      <div className="profilePic">
        <img
          className="avatar"
          src="https://avatars1.githubusercontent.com/u/8537504?s=400&amp;v=4"
          alt="Username"
        />
      </div>
      <div className="profileInfo">
        <p>Email: {this.props.contact.email}</p>
      </div>
      <button className="action-button" onClick={()=>this.props.deleteContact(this.props.contact.id)}>Delete</button>
      <button className="action-button" onClick={()=>this.toggleMode()}>Edit</button>
    </div>
  </div></>);
  }

  render() {

    if (this.state.editMode) return this.renderEditMode();
    else return this.renderViewMode();
  }
}
export default Contact;