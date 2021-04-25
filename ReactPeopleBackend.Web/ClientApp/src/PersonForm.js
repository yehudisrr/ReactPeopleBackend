import React from 'react';

export default function AddPersonForm({ firstName, lastName, age, onFirstNameChange,
    onLastNameChange, onAgeChange, onAddClick, onUpdateClick, onCancelClick, isEditing }) {
    return (
        <div className="row jumbotron">
            <div className="col-md-3">
                <input value={firstName} onChange={onFirstNameChange} name='firstName' type="text" className="form-control" placeholder="First Name" />
            </div>
            <div className="col-md-3">
                <input value={lastName} onChange={onLastNameChange} name='lastName' type="text" className="form-control" placeholder="Last Name" />
            </div>
            <div className="col-md-3">
                <input value={age} onChange={onAgeChange} name='age' type="text" className="form-control" placeholder="Age" />
            </div>
            <div className="col-md-3">
                {isEditing ?
                    <div>
                        <button className="btn btn-outline-primary" onClick={onUpdateClick}>Update</button>
                        <span>&nbsp;&nbsp;</span>
                        <button className="btn btn-outline-danger" onClick={onCancelClick}>Cancel</button>
                    </div>
                    : <button className="btn btn-outline-success" onClick={onAddClick}>Add</button>
                }
            </div>
        </div>
    )
}