import React from 'react';
import ReactDOM from 'react-dom';
// import { WithContext as ReactTags } from 'react-tag-input';
import ReactTags from 'react-tag-autocomplete';

class UserList extends React.Component{
  constructor(props){
    super(props);
    this.state = {tags:  [], suggestions: this.props.userList};

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
    tags.push(tag);
    this.setState({ tags: tags });
    this.props.saveUserList(tags);
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
