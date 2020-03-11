import React, {Component, createContext} from 'react';
import axios from 'axios';

export const PersonContext = createContext();

class PersonContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: [],
        };
    }

    /**
     * Create a new person.
     * @param {object} event - contains all events upon function
     * @param {object} person - contains data of the created person
     * @param {string} person.fName - persons' first name
     * @param {string} person.lName - persons' last name
     * @param {int} person.age - persons' age
     */
    createPerson(event, person) {
        //prevent form from refreshing the page
        event.preventDefault();

        //post data to route and send the person
        axios.post('/api/person/create', person)
            .then(response => {
                //copy people array
                let people = [...this.state.people];

                //push new person received from server to array
                data.push(response.data.person);

                //overwrite array
                this.setState({
                    people: people,
                })
            })

            //catch any errors
            .catch(error => {

                //log error
                console.error(error);
            });
    }

    //read


    //update


    //delete


    //render
    render() {
        return (
            <PersonContext.Provider value={{
                ...this.state,

            }}>
                {this.props.children}
            </PersonContext.Provider>
        )
    }

}

export default PersonContext;