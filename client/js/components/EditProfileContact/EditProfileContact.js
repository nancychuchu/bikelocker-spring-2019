import React, { Component } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  View
} from "react-native";
import { Field, Form } from "react-final-form";
import gql from "graphql-tag";
import styles from "./styles";
import { Mutation } from "react-apollo";
import PropTypes from "prop-types";
import Loader from "../Loader";

class EditProfileContact extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      fileSelected: false,
      done: false,
      ageRange: []
    };
  }

  componentDidMount() {
    const ageRange = [];
    for (let i = 15; i <= 75; i++) {
      ageRange.push(i);
    }
    this.setState({ ageRange });
  }

  render() {
    const { user, navigation } = this.props;
    user.phone && (user.phone = user.phone.toString());

    return (
      <Mutation mutation={UPDATE_USER}>
        {(updateUser, { loading, data, error }) => {
          if (loading) return <Loader />;
          return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView contentContainerStyle={styles.container}>
                <Form
                  initialValues={user}
                  onSubmit={async values => {
                    try {
                      const variables = { ...values };
                      variables.age = variables.age
                        ? parseInt(variables.age)
                        : undefined;
                      variables.phone = variables.phone
                        ? parseInt(variables.phone)
                        : undefined;
                      await updateUser({ variables });
                      this.props.navigation.navigate("Profile");
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                  render={({ handleSubmit, pristine, invalid, values }) => (
                    <View style={styles.form}>
                      <Text style={styles.labelText}>Address 1</Text>
                      <Field
                        name="addressOne"
                        render={({ input, meta }) => (
                          <View style={styles.formField}>
                            <View style={styles.formInput}>
                              <TextInput
                                {...input}
                                keyboardType="default"
                                placeholder={"Enter your street address..."}
                                editable={true}
                                style={styles.textInput}
                              />
                            </View>
                            <View>
                              {meta.error && meta.touched && (
                                <Text style={styles.errorMsg}>
                                  {meta.error}
                                </Text>
                              )}
                            </View>
                          </View>
                        )}
                      />
                      <Text style={styles.labelText}>Address 2</Text>
                      <Field
                        name="addressTwo"
                        render={({ input, meta }) => (
                          <View style={styles.formField}>
                            <View style={styles.formInput}>
                              <TextInput
                                {...input}
                                value={input.value}
                                keyboardType="default"
                                placeholder={"Enter your address complement..."}
                                editable={true}
                                style={styles.textInput}
                              />
                            </View>
                            <View>
                              {meta.error && meta.touched && (
                                <Text style={styles.errorMsg}>
                                  {meta.error}
                                </Text>
                              )}
                            </View>
                          </View>
                        )}
                      />
                      <Text style={styles.labelText}>City</Text>
                      <Field
                        name="city"
                        render={({ input, meta }) => (
                          <View style={styles.formField}>
                            <View style={styles.formInput}>
                              <TextInput
                                {...input}
                                keyboardType="default"
                                placeholder={"30"}
                                editable={true}
                                style={styles.textInput}
                              />
                            </View>
                            <View>
                              {meta.error && meta.touched && (
                                <Text style={styles.errorMsg}>
                                  {meta.error}
                                </Text>
                              )}
                            </View>
                          </View>
                        )}
                      />
                      <View style={styles.twoFields}>
                        <View style={styles.provinceContainer}>
                          <Text style={styles.labelText}>Province</Text>
                          <Field
                            name="province"
                            render={({ input, meta }) => (
                              <View style={styles.formField}>
                                <View style={styles.formInput}>
                                  <TextInput
                                    {...input}
                                    value={input.value}
                                    keyboardType="default"
                                    placeholder={"BC"}
                                    editable={true}
                                    style={styles.textInput}
                                  />
                                </View>
                                <View>
                                  {meta.error && meta.touched && (
                                    <Text style={styles.errorMsg}>
                                      {meta.error}
                                    </Text>
                                  )}
                                </View>
                              </View>
                            )}
                          />
                        </View>
                        <View style={styles.countryContainer}>
                          <Text style={styles.labelText}>Country</Text>
                          <Field
                            name="country"
                            render={({ input, meta }) => (
                              <View style={styles.formField}>
                                <View style={styles.formInput}>
                                  <TextInput
                                    {...input}
                                    value={input.value}
                                    keyboardType="default"
                                    placeholder={"Canada"}
                                    editable={true}
                                    style={styles.textInput}
                                  />
                                </View>
                                <View>
                                  {meta.error && meta.touched && (
                                    <Text style={styles.errorMsg}>
                                      {meta.error}
                                    </Text>
                                  )}
                                </View>
                              </View>
                            )}
                          />
                        </View>
                      </View>
                      <Text style={styles.labelText}>Postal Code</Text>
                      <Field
                        name="postalCode"
                        render={({ input, meta }) => (
                          <View style={styles.formField}>
                            <View style={styles.formInput}>
                              <TextInput
                                {...input}
                                value={input.value}
                                keyboardType="default"
                                placeholder={"Enter your postal code..."}
                                editable={true}
                                style={styles.textInput}
                              />
                            </View>
                            <View>
                              {meta.error && meta.touched && (
                                <Text style={styles.errorMsg}>
                                  {meta.error}
                                </Text>
                              )}
                            </View>
                          </View>
                        )}
                      />
                      <Text style={styles.labelText}>Phone</Text>
                      <Field
                        name="phone"
                        render={({ input, meta }) => (
                          <View style={styles.formField}>
                            <View style={styles.formInput}>
                              <TextInput
                                {...input}
                                value={input.value}
                                keyboardType="numeric"
                                placeholder={"Enter your phone number..."}
                                editable={true}
                                style={styles.textInput}
                              />
                            </View>
                            <View>
                              {meta.error && meta.touched && (
                                <Text style={styles.errorMsg}>
                                  {meta.error}
                                </Text>
                              )}
                            </View>
                          </View>
                        )}
                      />
                      <Text style={styles.labelText}>Email *</Text>
                      <Field
                        name="email"
                        render={({ input, meta }) => (
                          <View style={styles.formField}>
                            <View style={styles.formInput}>
                              <TextInput
                                {...input}
                                value={input.value}
                                keyboardType="email-address"
                                placeholder={"Enter your email..."}
                                editable={true}
                                style={styles.textInput}
                              />
                            </View>
                            <View>
                              {meta.error && meta.touched && (
                                <Text style={styles.errorMsg}>
                                  {meta.error}
                                </Text>
                              )}
                            </View>
                          </View>
                        )}
                      />
                      <View style={styles.buttons}>
                        <TouchableOpacity
                          style={styles.backButton}
                          onPress={() => navigation.navigate("Profile")}
                        >
                          <Text style={styles.backButtonLabel}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.submitButton}
                          onPress={handleSubmit}
                        >
                          <Text style={styles.submitButtonLabel}>Submit</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
              </ScrollView>
            </TouchableWithoutFeedback>
          );
        }}
      </Mutation>
    );
  }
}

export default EditProfileContact;

EditProfileContact.propTypes = {
  user: PropTypes.object,
  navigation: PropTypes.object
};

const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $firstName: String
    $lastName: String
    $age: Int
    $bikeType: String
    $bikeBrand: String
    $bikeColor: String
    $addressOne: String
    $addressTwo: String
    $city: String
    $province: String
    $country: String
    $postalCode: String
    $phone: Int
    $email: String
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      age: $age
      bikeType: $bikeType
      bikeBrand: $bikeBrand
      bikeColor: $bikeColor
      addressOne: $addressOne
      addressTwo: $addressTwo
      city: $city
      province: $province
      country: $country
      postalCode: $postalCode
      phone: $phone
      email: $email
    ) {
      id
      firstName
      lastName
      age
      bikeType
      bikeBrand
      bikeColor
      addressOne
      addressTwo
      city
      province
      country
      postalCode
      phone
      email
    }
  }
`;
