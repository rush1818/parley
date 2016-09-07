import React from 'react';
import EmojiPicker from 'react-emoji-picker';
import emojiMap from 'react-emoji-picker/lib/emojiMap';
import Smile from 'react-icons/lib/fa/smile-o';

// styles for the emoji picker wrapper
const emojiPickerStyles = {
  position: "absolute",
  top: "50%",
  left: "10%",
  backgroundColor: "#FDF6E3",
  width: "30%",
  padding: ".3em .6em",
  border: "1px solid #989898",
  zIndex: "500"
};

class MyEmojiInput extends React.Component{
  constructor(props){
    super();
    this.state = {emoji: null,
    showEmojiPicker: false};

    this.toggleEmojiPicker = this.toggleEmojiPicker.bind(this);
    this.validateEmoji = this.validateEmoji.bind(this);
    this.updateState = this.updateState.bind(this);
    this.setEmoji = this.setEmoji.bind(this);
    this.grabKeyPress = this.grabKeyPress.bind(this);
    this.emojiPicker = this.emojiPicker.bind(this);
  }
  componentDidMount() {
    const that = this;
    document.addEventListener('click', that.toggleEmojiPicker, false);
  }

  componentWillUnmount() {
    const that = this;
    document.removeEventListener('click', that.toggleEmojiPicker, false);
  }

  toggleEmojiPicker(e) {
    const that = this;
    if(this.refs.emoji.contains(e.target)) {
      this.setState({showEmojiPicker: true});
    } else {
      setTimeout(that.validateEmoji, 10);
      this.setState({showEmojiPicker: false});
    }
  }

  validateEmoji() {
    const matched = emojiMap.filter((emoji) => {
      return `:${emoji.name}:` === this.state.emoji;
    });

    if(matched.length === 0) {
      this.setState({emoji: null});
    }
  }

  updateState(e) {
    this.setState({emoji: e.target.value});
  }

  setEmoji(emoji) {
    this.setState({emoji: emoji});
  }

  // allows selecting first emoji by pressing "Enter" without submitting form
  grabKeyPress(e) {
    if(e.keyCode === 13) {
      e.preventDefault();
    }
  }

  emojiPicker() {
    if(this.state.showEmojiPicker) {
      return (
        <EmojiPicker className='emojiPicker-class'
          style={emojiPickerStyles} onSelect={this.setEmoji}
          query={this.state.emoji}
        />
      );
    }
  }


  render() {
    return (
      <p className="emoji-button" ref="emoji">
        <label htmlFor="emoji"><Smile /></label>
        {this.emojiPicker()}
      </p>
    );
  }
}

export default MyEmojiInput;




{/* <input name="emoji" id="emoji" value={this.state.emoji || ""} autoComplete="on"
type={this.state.showEmojiPicker ? "search" : "text"}
onChange={this.updateState} onKeyDown={this.grabKeyPress}/> */}
