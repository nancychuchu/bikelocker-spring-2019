import React, { Component } from "react";
import { Text } from "react-native";

export default class AuthLoadingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Text>This is the AuthLoading container</Text>;
  }
}
