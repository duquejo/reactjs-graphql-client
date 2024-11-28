import PropTypes from "prop-types";

export const Notify = ({ errorMessage }) => {

    if( ! errorMessage ) return null;

    return (
        <div style={{ color: 'red', position: 'fixed', left:0, top: 0, width: '100%' }}>
            {errorMessage}
        </div>
    );
};

Notify.propTypes = {
    errorMessage: PropTypes.any,
}