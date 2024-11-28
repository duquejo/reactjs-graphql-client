import {LOGIN_USER} from "../login/graphql-queries.js";
import {useEffect, useState} from "react";
import {useMutation} from "@apollo/client";
import PropTypes from "prop-types";

export const LoginForm = ({ notifyError, setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [login, result ] = useMutation(LOGIN_USER, {
        onError: error => {
            notifyError(error.graphQLErrors[0].message);
        }
    });

    useEffect(() => {
        if( result.data ) {
            const { value: token } = result.data.loginUser;
            setToken(token);
            localStorage.setItem("phonenumbers-user-token", token);
        }
    }, [result.data]);

    const handleSubmit = e => {
        e.preventDefault();
        login({ variables: { username, password }});
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="usr">
                    Username <input id="usr"
                                    type="text"
                                    value={username}
                                    onChange={({target}) => setUsername(target.value)}/>
                </label>
                <label htmlFor="pwd">
                    Password <input id="pwd"
                                    type="password"
                                    value={password}
                                    onChange={({target}) => setPassword(target.value)}/>
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    notifyError: PropTypes.func.isRequired,
    setToken : PropTypes.func.isRequired,
}