import React from 'react';
import Modal from 'react-modal';
import SessionFormContainer from '../session/session_form_container.jsx';

class NavBar extends React.Component {
  constructor(props){
// debugger
    super(props);
    this.state = {modalOpen: false};
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  closeModal(){
    this.setState({modalOpen: false});
  }

  openModal(){
    this.setState({modalOpen: true});
  }

  render() {
    let content;
    if (this.props.loggedIn){
      content = (
        <section className="landing-page-nav">
          <nav className="landing-page-navbar group">
            <h1>SlaCar</h1>
          </nav>
        </section>
      );
    } else {
      content = (
        <section className="landing-page-nav">
          <nav className="landing-page-navbar group">
            <h1>SlaCar</h1>
            <ul>
              <li><button type="button" onClick={this.openModal}>Login/Signup</button></li>
            </ul>
          </nav>
          <Modal
            isOpen={this.state.modalOpen}
            onRequestClose={this.closeModal}
            style={modalStyle}>
            <SessionFormContainer />
          </Modal>
        </section>
      );
    }
    return(
      <section>
        {content}
      </section>
    );
  }
}

const modalStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(32,36,38, 0.90)'  //Same as style.css in hex color is #202426
  },
  content: {
    position: 'fixed',
    top: '100px',
    left: '150px',
    right: '150px',
    bottom: '100px',
    // border: '1px solid #ccc',
    padding: '20px',
    background: 'black',
    width: '450px',
    height: '300px',
    margin: '0 auto',
    borderRadius: '10%'

  }
};

export default NavBar;
