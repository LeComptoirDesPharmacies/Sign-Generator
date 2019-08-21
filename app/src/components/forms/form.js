import React from 'react'

function Form(props) {
    return (
        <form onSubmit={props.submit}>
            {props.children}
        </form>
    );
}

export default Form;