import reactLogo from '/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {Persons} from "./components/Persons.jsx";
import {PersonForm} from "./components/PersonForm.jsx";
import {usePersons} from "./persons/custom-hooks.js";
import {useState} from "react";
import {Notify} from "./components/Notify.jsx";
import {PhoneForm} from "./components/PhoneForm.jsx";
import {LoginForm} from "./components/LoginForm.jsx";
import {useApolloClient, useSubscription } from "@apollo/client";
import {PERSON_ADDED} from "./persons/graphql-subscriptions.js";
import {ALL_PERSONS} from "./persons/graphql-queries.js";


const useSubscriptions = () => {

    const client = useApolloClient();

    useSubscription(PERSON_ADDED, {
        onData: ({ data: subscriptionData }) => {
            const { personAdded } = subscriptionData.data;

            const dataInStore = client.readQuery({query: ALL_PERSONS });
            client.writeQuery({
                query: ALL_PERSONS,
                data: {
                    ...dataInStore,
                    allPersons: [
                        ...dataInStore.allPersons,
                        personAdded
                    ]
                }
            });
        },
    });

    return client;
}

function App() {
    const { data, loading, error } = usePersons();
    const [errorMessage, setErrorMessage] = useState();
    const [token, setToken] = useState(() => localStorage.getItem('phonenumbers-user-token'));

    const client = useSubscriptions();

    if( error ) return <span style="color: red;'">{ error }</span>;

    const notifyError = message => {
        setErrorMessage(message);
        setTimeout(() => setErrorMessage(null), 5000);
    }

    const logout = () => {
        setToken(null);
        localStorage.clear();
        client.resetStore();
    };

    return (
        <>
            <Notify errorMessage={errorMessage} />
            <div>
                <img src={viteLogo} className="logo" alt="Vite logo"/>
                <img src={reactLogo} className="logo react" alt="React logo"/>
            </div>
            {
                loading
                ? <p>Loading...</p>
                : <Persons persons={data?.allPersons} />
            }
            {
                token
                ? <button onClick={logout} style={{ marginTop: '1rem'}}>Logout</button>
                : <LoginForm notifyError={notifyError} setToken={setToken}/>
            }
            <PersonForm notifyError={notifyError}/>
            <PhoneForm notifyError={notifyError} />
        </>
    )
}

export default App
