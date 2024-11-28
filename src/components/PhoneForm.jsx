import {useMutation} from "@apollo/client";
import {useEffect, useState} from "react";
import {EDIT_NUMBER} from "../persons/graphql-mutations.js";
import PropTypes from "prop-types";

export const PhoneForm = ({ notifyError }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    // IT DOES NOT NEED to prefetch it, because is cached! :)
    const [changeNumber, result ] = useMutation(EDIT_NUMBER, {
        onError: (error) => {
            notifyError(error.graphQLErrors[0].message);
        }
    });

    useEffect(() => {
        if( result.data && result.data.editNumber === null ) {
            console.error('Person not found');
            notifyError('Person not found');
        }
    }, [result.data]);

    const handleSubmit = e => {
        e.preventDefault();

        changeNumber({variables: {name, phone}});

        setName('');
        setPhone('');
    }

    return (
        <div>
            <h2>Edit phone number</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <input placeholder="Name" type="text" value={name} onChange={event => setName(event.target.value)}/>
                <input placeholder="Phone" type="text" value={phone} onChange={event => setPhone(event.target.value)}/>
                <button>Change phone</button>
            </form>
        </div>
    );
};

PhoneForm.propTypes = {
    notifyError: PropTypes.func.isRequired
}