import React from 'react';

class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {cursor: String.fromCharCode(9475), greeting: "", modalOpen: false};
  }

  componentDidMount(){
    let i = 0;
    const remainingGreeting = " that are oceans apart!";
    this.animateTyping = setInterval(() => {
      if (i > remainingGreeting.length - 4) {
        this.setState({cursor: ""});
        clearInterval(this.animateCursor);
      }
      if (i < remainingGreeting.length) {
        this.setState({greeting: `${this.state.greeting}${remainingGreeting[i]}`});

        i++;
      } else {
        clearInterval(this.animateTyping);
      }
    }, 99);

    let cursorDisplayed = true;
    this.animateCursor = setInterval(() => {
      if (cursorDisplayed) {
        this.setState({cursor: " "});
        cursorDisplayed = false;
      } else {
        this.setState({cursor: String.fromCharCode(9475)});
        cursorDisplayed = true;
      }
    }, 400);
  }

  render() {
    return(
      <section className="landing-page group">
        {this.props.children}
        <div className="splash-img-box group" >
        </div>
        <div className="intro-text-box">
        <h2 className="intro-text">
          A messaging app for teams{this.state.greeting}{this.state.cursor}
        </h2></div>
      </section>
    );
  }

  componentWillUnmount() {
    clearInterval(this.animateTyping);
    clearInterval(this.animateCursor);
  }
}


export default HomePage;
