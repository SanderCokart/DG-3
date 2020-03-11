import React, {Component, createContext} from 'react';

export const PersonContext = createContext();

class PersonContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: [],
        };
    }

    //create


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