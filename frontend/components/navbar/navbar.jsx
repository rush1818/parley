import React from 'react';
import Modal from 'react-modal';
import SessionFormContainer from '../session/session_form_container.jsx';
import { hashHistory } from 'react-router';

class NavBar extends React.Component {
  constructor(props){
// debugger
    super(props);
    this.state = {modalOpen: false};
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  closeModal(){
    this.setState({modalOpen: false});
  }

  openModal(){
    this.setState({modalOpen: true});
  }

  handleLogout(){
    this.setState({modalOpen: false});
    this.props.logout();
    const redirectInt = setInterval((()=>{
      if (!this.props.loggedIn) {
          hashHistory.push('/channels/general?1');
          clearInterval(redirectInt);
        }
      }), 50);
    }

  render() {
    let content;
    if (this.props.loggedIn){
      content = (
        <section className="landing-page-nav">
          <nav className="landing-page-navbar group">
            <h1><a href="#">parley</a></h1>
            <ul>
              <li>Welcome, {this.props.username}<button type="button" onClick={this.handleLogout}>&nbsp;&nbsp;&nbsp;Logout&nbsp;&nbsp;&nbsp;</button></li>
            </ul>
          </nav>
        </section>
      );
    } else {
      content = (
        <section className="landing-page-nav">
          <nav className="landing-page-navbar group">
            <h1><a href="#">parley</a></h1>
            <ul>
              <li><button type="button" onClick={this.openModal}>Login/Sign Up</button></li>
            </ul>
          </nav>
          <Modal
            isOpen={this.state.modalOpen}
            onRequestClose={this.closeModal}
            style={modalStyle}
            closeTimeoutMS={5}>
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
    backgroundColor: 'rgba(32,36,38, 0.60)' , //Same as style.css in hex color is #202426
    backgroundColor: 'rgba(73,73,73,.6)'
  },
  content: {
    position: 'fixed',
    top: '100px',
    left: '150px',
    right: '150px',
    bottom: '100px',
    // border: '1px solid #ccc',
    padding: '20px',
    background: 'rgba(255,255,255,.9)',
    width: '400px',
    height: '300px',
    margin: '0 auto',
    // borderRadius: '10%'

  }
};

export default NavBar;
