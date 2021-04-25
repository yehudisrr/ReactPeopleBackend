import React from 'react';
import axios from 'axios';
import PersonRow from './PersonRow';
import AddPersonForm from './PersonForm';


class PeopleTable extends React.Component {

    state = {
        people: [],
        selectedPeople: [],
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        isEditing: false
    }

    componentDidMount = () => {
        axios.get('/api/people/getall').then(({ data }) => {
            this.setState({
                people: data
            });
        });
    }

    onTextChange = e => {
        const personCopy = { ...this.state.person };
        personCopy[e.target.name] = e.target.value;
        this.setState({ person: personCopy });
    }

    onAddClick = () => {
        axios.post('/api/people/add', this.state.person).then(() => {
            axios.get('/api/people/getall').then(({ data }) => {
                this.setState({
                    people: data,
                    person: { firstName: '', lastName: '', age: '' }
                });
            });
        });

    }

    onEditClick = person => {
        this.setState({ isEditing: true, person });
    }

    onCancelClick = () => {
        this.setState({
            isEditing: false,
            person: { firstName: '', lastName: '', age: '' }
        });
    }

    onUpdateClick = () => {
        axios.post('/api/people/update', this.state.person).then(() => {
            axios.get('/api/people/getall').then(({ data }) => {
                this.setState({
                    isEditing: false,
                    people: data,
                    person: { firstName: '', lastName: '', age: '' }
                });
            });
        });

    }

    onDeleteClick = person => {
        axios.post('/api/people/delete', person).then(() => {
            axios.get('/api/people/getall').then(({ data }) => {
                this.setState({
                    people: data
                });
            });
        });
    }

    onDeleteAllClick = () => {
        console.log(this.state.selectedPeople);
        axios.post('/api/people/deleteall', this.state.selectedPeople).then(() => {
            axios.get('/api/people/getall').then(({ data }) => {
                this.setState({
                    people: data,
                    selectedPeople: []
                });
            });
        });
    }

    onSelectAllClick = () => {
        const peopleCopy = [...this.state.people];
        this.setState({
            selectedPeople: peopleCopy
        });
    }

    onUnselectAllClick = () => {
        this.setState({
            selectedPeople: [],
            allChecked: false
        });
    }

    onCheckboxChange = person => {
        const { selectedPeople } = this.state;

        if (selectedPeople.includes(person)) {
            this.setState({ selectedPeople: selectedPeople.filter(p => p.id !== person.id) });
        }
        else {
            this.setState({ selectedPeople: [...selectedPeople, person] });
        }
    }

    render() {
        const { people, person, isEditing, allChecked, selectedPeople } = this.state;
        const { firstName, lastName, age } = person;
        return (
            <div className="container" style={{ marginTop: 60 }}>
                <AddPersonForm
                    isEditing={isEditing}
                    firstName={firstName}
                    lastName={lastName}
                    age={age}
                    onFirstNameChange={this.onTextChange}
                    onLastNameChange={this.onTextChange}
                    onAgeChange={this.onTextChange}
                    onAddClick={this.onAddClick}
                    onEditClick={this.onEditClick}
                    onUpdateClick={this.onUpdateClick}
                    onCancelClick={this.onCancelClick}
                />
                <div className="row mt-4">
                    <div className="col-md-12">
                        {<table className="table table-header table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>
                                        <button onClick={this.onSelectAllClick} className='btn btn-outline-success btn-sm'>Select All</button>
                                        <br></br>
                                        <br></br>
                                        <button onClick={this.onUnselectAllClick} className='btn btn-outline-primary btn-sm'>Unselect All</button>
                                        <br></br>
                                        <br></br>
                                        <button onClick={this.onDeleteAllClick} className='btn btn-outline-danger btn-sm'>Delete All Selected</button>
                                    </th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Age</th>
                                    <th>Edit/Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {people.map((p, i) => {
                                    const currentPerson = p;
                                    return <PersonRow
                                        person={p} key={p.id}
                                        onDeleteClick={() => this.onDeleteClick(currentPerson)}
                                        onEditClick={() => this.onEditClick(currentPerson)}
                                        onCheckboxChange={() => this.onCheckboxChange(currentPerson)}
                                        selectedPeople={selectedPeople}
                                    />
                                })}
                            </tbody>
                        </table>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default PeopleTable;