import React from 'react';
import ReactDOM from 'react-dom';
import {CssBaseline} from "@material-ui/core";
import PersonContext from "./components/contexts/PersonContext";

export default function App() {
    return (
        <div>
            <CssBaseline>
                <PersonContext>

                </PersonContext>
            </CssBaseline>
        </div>
    )
}


ReactDOM.render(<App/>, document.getElementById('root'));