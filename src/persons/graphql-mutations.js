import {gql} from "@apollo/client";
import {PERSON_ALL_DETAILS_FRAGMENT} from "./graphql-queries.js";

export const CREATE_PERSON = gql`
    mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
        addPerson(
            name: $name
            phone: $phone
            street: $street
            city: $city
        ) {
            ...PersonDetails
        }
    }

    ${PERSON_ALL_DETAILS_FRAGMENT}
`;

// If I want an auto sync - You must return the ID and the mutated parameter
export const EDIT_NUMBER = gql`
    mutation editNumber($name: String!, $phone: String!) {
        editNumber(
            name: $name,
            phone: $phone) {
            name
            id
            phone
        }
    }
`;