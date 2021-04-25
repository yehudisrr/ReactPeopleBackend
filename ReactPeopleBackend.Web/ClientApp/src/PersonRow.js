import React from 'react';

function PersonRow({ person, onEditClick, onDeleteClick, onCheckboxChange, selectedPeople}) {
    const { firstName, lastName, age } = person;
    return (
        <tr>
            <td><input checked={selectedPeople.includes(person)} onChange={onCheckboxChange} type="checkbox" className="form-check-input" /></td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <button
                    onClick={onEditClick} className='btn btn-outline-primary btn-sm'>Edit
                 </button>
                <span>&nbsp;&nbsp;</span>
                <button
                    onClick={onDeleteClick} className='btn btn-outline-danger btn-sm'>Delete
                 </button>
            </td>
        </tr>
    )
}

export default PersonRow;