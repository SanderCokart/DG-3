import React, {Component, createContext} from 'react';
import axios from 'axios';

export const PersonContext = createContext();

class PersonContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: [],
        };

        //upon construct get data from server
        this.readPerson();
    }

    /**
     * Create a new person.
     * @param {object} event - contains all events upon function
     * @param {object} person - contains data of the created person
     * @param {string} person.fName - persons' first name
     * @param {string} person.lName - persons' last name
     * @param {int} person.age - persons' age
     */
    createPerson(person) {
        //post data to route and send the person
        axios.post('/api/person/create', person)
            .then(response => {
                //copy people array
                let people = [...this.state.people];

                //push new person received from server to array
                people.push(response.data.person);

                //overwrite array
                this.setState({
                    people: people,
                });
            })

            //catch any errors
            .catch(error => {

                //log error
                console.error(error);
            });
    }

    /**
     * read
     */
    readPerson() {
        axios.get('/api/person/read')
            .then(response => {
                //set array people to people from server
                this.setState({
                    people: response.data,
                });
            })

            //catch any errors
            .catch(error => {

                //log error
                console.error(error);
            });
    }

    /**
     * update
     * @param {object} personToBeUpdated - contains data of the created person
     * @param {int} personToBeUpdated.id - contains persons' id
     * @param {string} personToBeUpdated.fName - persons' first name
     * @param {string} personToBeUpdated.lName - persons' last name
     * @param {int} personToBeUpdated.age - persons' age
     */
    updatePerson(personToBeUpdated) {
        axios.put('/api/person/update/' + personToBeUpdated.id, personToBeUpdated)
            .then(response => {

                //create copy of state
                let people = [...this.state.people];

                //extract person where id matches
                let person = people.find(person => {
                    return person.id === personToBeUpdated.id;
                });

                //overwrite person with new data
                person.fName = response.data.person.fName;
                person.lName = response.data.person.lName;
                person.age = response.data.person.age;

                //overwrite the state
                this.setState({
                    people: people,
                })

            })

            //catch any errors
            .catch(error => {

                //log error
                console.error(error);
            })
    }


    /**
     *
     * @param {object} personToDelete - contains data of the created person
     * @param {int} personToDelete.id - persons' id
     * @param {string} personToDelete.fName - persons' first name
     * @param {string} personToDelete.lName - persons' last name
     * @param {int} personToDelete.age - persons' age
     */
    deletePerson(personToDelete) {
        axios.delete('/api/person/delete/' + personToDelete.id)
            .then(response => {
                //create copy current state
                let people = [...this.state.people];

                //extract the user that matches the id
                let person = people.find(person => {
                    return person.id === personToDelete.id
                });

                //delete the person from people who's index matches that with the extracted person
                people.splice(people.indexOf(person), 1);

                //overwrite people with new array without the person that had to be deleted
                this.setState({
                    people: people,
                });
            }).catch(error => {
            console.error(error);
        })
    }


    //render
    render() {
        return (
            <PersonContext.Provider value={{
                ...this.state,
                createPerson: this.createPerson.bind(this),
                updatePerson: this.updatePerson.bind(this),
                deletePerson: this.deletePerson.bind(this),
            }}>
                {this.props.children}
            </PersonContext.Provider>
        )
    }

}

export default PersonContextProvider;