import React from 'react';
import ReactDOM from 'react-dom';
// import { WithContext as ReactTags } from 'react-tag-input';
import ReactTags from 'react-tag-autocomplete';

class UserList extends React.Component{
  constructor(props){
    super(props);
    let suggestions = [];
    this.props.userList.forEach((user)=>{
      if (user.name === "bot"){
        return;
      } else {
       suggestions.push(user);
      }
    });
    this.state = {tags:  [], suggestions: suggestions};

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
  }


  componentWillMount(){
    this.props.fetchUsers();
  }

  handleDelete (i) {
    let tags = this.state.tags;
    tags.splice(i, 1);
    // console.log(tags);
    this.setState({ tags: tags });
    this.props.saveUserList(tags);
  }

  handleAddition (tag) {
    let tags = this.state.tags;
    if (!tags.includes(tag)){
      tags.push(tag);
      this.setState({ tags: tags });
      this.props.saveUserList(tags);
    }
   }

  render() {
    let tags =  this.state.tags;
    let suggestions = this.state.suggestions;
      return (
          <div>
              <ReactTags tags={tags}
                  suggestions={suggestions}
                  handleDelete={this.handleDelete}
                  handleAddition={this.handleAddition}
                  placeholder="Enter Username"
                  minQueryLength={1}/>
          </div>
      );
  }
}

export default UserList;
