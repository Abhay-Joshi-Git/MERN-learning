import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { stripe } from '../actions/auth';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        amount={500}
        token={token => this.props.stripe(token)}
        stripeKey={process.env.REACT_APP_STRIPE_PUB_KEY}
      />
    );
  }
}

export default connect(null, { stripe })(Payments);