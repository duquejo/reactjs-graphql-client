import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, split} from '@apollo/client';
import {setContext} from "@apollo/client/link/context";
import {getMainDefinition} from "@apollo/client/utilities";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {createClient} from "graphql-ws";

const getAuth = () => {
    const token = localStorage.getItem("phonenumbers-user-token");
    return token ? `Bearer ${token}` : null;
}

const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
});

const authLink = setContext((_, { headers}) => {
    // Get the authentication token from localstorage if it exists.
    const token = localStorage.getItem("phonenumbers-user-token");
    // Return the headers to the context so httpLink can read them.

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        }
    }
});

const wsLink = new GraphQLWsLink(
    createClient({
        url: 'ws://localhost:4000',
    })
);

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    authLink.concat(httpLink),
);

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: splitLink,
});

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)
