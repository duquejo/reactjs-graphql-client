import {PERSON_ALL_DETAILS_FRAGMENT} from "./graphql-queries.js";
import {gql} from "@apollo/client";

export const PERSON_ADDED = gql`
subscription  {
    personAdded {
        id
        name
        phone
        address {
            street
            city
        }
    }
}
`;