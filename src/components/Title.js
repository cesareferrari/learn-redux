import React from 'react';
import { connect } from 'react-redux';
import { updateTitle } from '../actions';

class Title extends React.Component {
  state = {
    newTitleText: ''
  }

  handleChanges = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleUpdateTitle = e => {
    e.preventDefault();
    this.props.updateTitle(this.state.newTitleText)
  }

  render() {
    return (
      <div>
        <h1>{this.props.titleOnProps}</h1>

        <input
          type="text"
          name="newTitleText"
          value={this.state.newTitleText}
          onChange={this.handleChanges}
        />

        <button onClick={this.handleUpdateTitle}>Update title</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log("on state in Title:", state)
  return {
    titleOnProps: state.title
  }
}

export default connect(
  mapStateToProps,
  { updateTitle }
)(Title);
