import { fromEvent, FunctionEvent } from "graphcool-lib";
import { GraphQLClient } from "graphql-request";
import * as bcrypt from "bcryptjs";
import * as validator from "validator";

interface User {
  id: string;
}

interface EventData {
  firstName: string;
  email: string;
  password: string;
}

const SALT_ROUNDS = 10;

export default async (event: FunctionEvent<EventData>) => {
  console.log(event);

  try {
    const graphcool = fromEvent(event);
    const api = graphcool.api("simple/v1");

    const { firstName, email, password } = event.data;

    if (!validator.isEmail(email)) {
      return { error: "Not a valid email" };
    }

    // check if user exists already
    const userExists: boolean = await getUser(api, email).then(
      r => r.User !== null
    );
    if (userExists) {
      return { error: "Email already in use" };
    }

    // create password hash
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);

    // create new user
    const userId = await createGraphcoolUser(api, firstName, email, hash);

    // generate node token for new User node
    const token = await graphcool.generateNodeToken(userId, "User");

    return { data: { id: userId, token } };
  } catch (e) {
    console.log(e);
    return { error: "An unexpected error occured during signup." };
  }
};

async function getUser(api: GraphQLClient, email: string): Promise<{ User }> {
  const query = `
    query getUser($email: String!) {
      User(email: $email) {
        id
      }
    }
  `;

  const variables = {
    email
  };

  return api.request<{ User }>(query, variables);
}

async function createGraphcoolUser(
  api: GraphQLClient,
  firstName: string,
  email: string,
  password: string
): Promise<string> {
  const mutation = `
    mutation createGraphcoolUser($firstName: String!, $email: String!, $password: String!) {
      createUser(
        firstName: $firstName
        email: $email,
        password: $password
      ) {
        id
      }
    }
  `;

  const variables = {
    firstName,
    email,
    password: password
  };

  return api
    .request<{ createUser: User }>(mutation, variables)
    .then(r => r.createUser.id);
}
