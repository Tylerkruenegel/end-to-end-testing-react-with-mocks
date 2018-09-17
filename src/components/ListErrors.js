import React from 'react';

class ListErrors extends React.Component {
  render() {
    const errors = this.props.errors;
    if (errors) {
      return (
        <ul test-id="error-messages" className="error-messages">
          {
            Object.keys(errors).map(key => (
              <li key={key}>
                {key}
                {' '}
                {errors[key]}
              </li>
            ))
          }
        </ul>
      );
    }
    return null;
  }
}

export default ListErrors;
