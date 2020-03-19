import React from 'react';
import ReactDOM from 'react-dom';
import {CssBaseline} from "@material-ui/core";
import PersonContext from './components/api/PersonContext';
import PersonTable from './components/react/PersonTable';

export default function App() {
    return (
        <div>
            <CssBaseline>
                <PersonContext>
                    <PersonTable/>
                </PersonContext>
            </CssBaseline>
        </div>
    )
}


ReactDOM.render(<App/>, document.getElementById('root'));