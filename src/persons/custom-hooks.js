import {useQuery} from "@apollo/client";
import {ALL_PERSONS} from "./graphql-queries.js";

export const usePersons = () => {
    // const { data, loading, error } = useQuery(ALL_PERSONS, { pollInterval: 2000 }); // Poll interval - Asks every X seconds
    return useQuery(ALL_PERSONS);
}