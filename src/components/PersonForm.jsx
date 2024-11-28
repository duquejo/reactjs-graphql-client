import {useMutation} from "@apollo/client";
import {useState} from "react";
import {CREATE_PERSON} from "../persons/graphql-mutations.js";
import {ALL_PERSONS} from "../persons/graphql-queries.js";
import PropTypes from "prop-types";

export const PersonForm = ({notifyError}) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');

    const [createPerson] = useMutation(CREATE_PERSON, {
        // Automatic re-fetch (could be unnecessary).
        // refetchQueries: [{query: ALL_PERSONS}],
        onError: (error) => {
            notifyError(error.graphQLErrors[0].message);
        },
        // Manually update store (Disable with subscriptions
        // update: (store, result) => {
        //     const dataInStore = store.readQuery({ query: ALL_PERSONS });
        //     store.writeQuery({
        //         query: ALL_PERSONS,
        //         data: {
        //             ...dataInStore,
        //             allPersons: [
        //                 ...dataInStore.allPersons,
        //                 result.data.addPerson
        //             ]
        //         }
        //     });
        // }
    });

    const handleSubmit = e => {
        e.preventDefault();

        createPerson({variables: {name, phone, street, city}});

        setName('');
        setPhone('');
        setCity('');
        setStreet('');
    }

    return (
        <div>
            <h2>Create new person</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <input placeholder="Name" type="text" value={name} onChange={event => setName(event.target.value)}/>
                <input placeholder="Phone" type="text" value={phone} onChange={event => setPhone(event.target.value)}/>
                <input placeholder="Street" type="text" value={street}
                       onChange={event => setStreet(event.target.value)}/>
                <input placeholder="City" type="text" value={city} onChange={event => setCity(event.target.value)}/>
                <button style={{ marginTop: '1rem' }}>Add person</button>
            </form>
        </div>
    );
};

PersonForm.propTypes = {
    notifyError: PropTypes.func.isRequired
}