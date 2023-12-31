import { useMutation } from '@apollo/client';
// import { ADD_USER } from "./utils/mutations"

import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {

  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ``,
    }
  }
});

// console.log(authLink);

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>

      <ApolloProvider client={client}>
        <Navbar />
        <Outlet />
      </ApolloProvider>

    </>
  );
}

export default App;
