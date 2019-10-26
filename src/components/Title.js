import React from 'react';
import { connect } from 'react-redux';
import { updateTitle, turnTitleGreen } from '../actions';

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

  handleTitleGreen = e => {
    e.preventDefault();
    this.props.turnTitleGreen();
  }

  render() {
    return (
      <div>
        <h1
          style={{ color: this.props.titleColor }}
          onClick={this.handleTitleGreen}>
          {this.props.titleOnProps}
        </h1>

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
    titleOnProps: state.title,
    titleColor: state.titleColor
  }
}

export default connect(
  mapStateToProps,
  { updateTitle, turnTitleGreen }
)(Title);
