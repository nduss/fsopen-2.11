import React from 'react';

const Form = ({onSubmit, name, number, flash}) => {


    return (
        <form onSubmit={onSubmit}>
        <h2>{flash}</h2>
        <div>
        name: <input value={name.value} onChange={name.onChange} />
        </div>
        <div>
        number: <input value={number.value} onChange={number.onChange} />
        </div>
        <div>
        <button type="submit">add</button>
        </div>
        </form>
    )
}
export default Form