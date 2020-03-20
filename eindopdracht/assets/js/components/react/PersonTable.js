//components
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
//icons
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
//react
import React, {Fragment, useContext, useState} from 'react';
//context
import {PersonContext} from '../api/PersonContext';

function PersonTable() {
    //use context
    const personContext = useContext(PersonContext);

    //states
    //<editor-fold desc="boolean states">
    const [updateFieldId, setUpdateFieldId] = useState(null);
    //</editor-fold>
    //<editor-fold desc="add states">
    const [addFName, setAddFName] = useState('');
    const [addLName, setAddLName] = useState('');
    const [addAge, setAddAge] = useState(0);
    //</editor-fold>
    //<editor-fold desc="update states">
    const [updateFName, setUpdateFName] = useState(undefined);
    const [updateLName, setUpdateLName] = useState(undefined);
    const [updateAge, setUpdateAge] = useState(undefined);
    //</editor-fold>
    const [filter, setFilter] = useState('');

    //methods
    //prevent refresh and submit data to API
    const addPerson = (e) => {
        e.preventDefault();
        const person = {fName: addFName, lName: addLName, age: addAge};
        personContext.createPerson(person);

        //set to default values
        setAddFName('');
        setAddLName('');
        setAddAge(0);
    };

    //prevent refresh and submit data to API
    const deletePerson = (e, person) => {
        e.preventDefault();
        personContext.deletePerson(person);
    };

    //when you press the edit button it initializes the input fields
    const initUpdate = (person) => {
        setUpdateFieldId(person.id);
        setUpdateFName(person.fName);
        setUpdateLName(person.lName);
        setUpdateAge(person.age);
    };

    //prevent refresh and submit data to API
    const updatePerson = (e) => {
        e.preventDefault();
        const person = {id: updateFieldId, fName: updateFName, lName: updateLName, age: updateAge};
        personContext.updatePerson(person);

        setUpdateFieldId(null);
        setUpdateFName(null);
        setUpdateLName(null);
        setUpdateAge(null);
    };

    //filter
    const filteredContext = [...personContext.people].filter(person => {
        const regExp = new RegExp(filter, 'i');
        return person.id.toString().match(regExp) ||
            person.fName.match(regExp) ||
            person.lName.match(regExp) ||
            person.age.toString().match(regExp);
    });

    return (
        <Fragment>
            <Table>
                {/*table header START*/}
                <TableHead>
                    <TableRow>
                        <TableCell><Typography>First Name</Typography></TableCell>
                        <TableCell><Typography>Last Name</Typography></TableCell>
                        <TableCell><Typography>Age</Typography></TableCell>
                        <TableCell><Typography>Actions</Typography></TableCell>
                        <TableCell><Typography>Filter</Typography></TableCell>
                    </TableRow>
                </TableHead>
                {/*table header END*/}
                <TableBody>
                    {/*AddPerson START*/}
                    <TableRow>
                        <TableCell>
                            <form onSubmit={addPerson}>
                                <TextField fullWidth
                                           value={addFName}
                                           label="First Name"
                                           onChange={e => setAddFName(e.target.value)}/>
                            </form>
                        </TableCell>
                        <TableCell>
                            <form onSubmit={addPerson}>
                                <TextField fullWidth
                                           value={addLName}
                                           label="Last Name"
                                           onChange={e => setAddLName(e.target.value)}/>
                            </form>
                        </TableCell>
                        <TableCell>
                            <form onSubmit={addPerson}>
                                <TextField type="number"
                                           fullWidth
                                           value={addAge}
                                           label="Age"
                                           onChange={e => setAddAge(e.target.value)}/>
                            </form>
                        </TableCell>
                        <TableCell>
                            <Tooltip title={
                                <Typography>{'Add ' + addFName + ' ' + addLName + ' to the list'}</Typography>}>
                                <IconButton onClick={addPerson}>
                                    <AddIcon/>
                                </IconButton>
                            </Tooltip>
                        </TableCell>

                        {/*FILTER*/}
                        <TableCell>
                            <TextField type="text"
                                       label="Search for anything"
                                       value={filter}
                                       onChange={e => setFilter(e.target.value)}
                                       fullWidth/>
                        </TableCell>
                        {/*FILTER*/}

                    </TableRow>
                    {/*//AddPerson END*/}

                    {/*//data and update START*/}
                    {filteredContext.map(person => (
                        <TableRow key={person.id}>
                            {updateFieldId === person.id ?
                                // if updateFieldId IS set (show update input fields)
                             <Fragment>
                                 <TableCell>
                                     <form onSubmit={updatePerson}>
                                         <TextField fullWidth
                                                    value={updateFName}
                                                    onChange={(e) => setUpdateFName(e.target.value)}/>
                                     </form>
                                 </TableCell>
                                 <TableCell>
                                     <form onSubmit={updatePerson}>
                                         <TextField fullWidth
                                                    value={updateLName}
                                                    onChange={(e) => setUpdateLName(e.target.value)}/>
                                     </form>
                                 </TableCell>
                                 <TableCell>
                                     <form onSubmit={updatePerson}>
                                         <TextField fullWidth
                                                    value={updateAge}
                                                    onChange={(e) => setUpdateAge(e.target.value)}/>
                                     </form>
                                 </TableCell>
                                 <TableCell>
                                     <IconButton onClick={updatePerson}><DoneIcon/></IconButton>
                                     <IconButton onClick={() => setUpdateFieldId(null)}><CancelIcon/></IconButton>
                                 </TableCell>
                             </Fragment>
                                                         :
                                // if updateFieldId is NOT set (show data fields)
                             <Fragment>
                                 <TableCell><Typography>{person.fName}</Typography></TableCell>
                                 <TableCell><Typography>{person.lName}</Typography></TableCell>
                                 <TableCell><Typography>{person.age}</Typography></TableCell>
                                 <TableCell>
                                     <IconButton onClick={() => initUpdate(person)}><EditIcon/></IconButton>
                                     <IconButton onClick={e => {
                                         deletePerson(e, person);
                                     }}>
                                         <DeleteIcon/>
                                     </IconButton>
                                 </TableCell>
                             </Fragment>
                            }
                        </TableRow>
                    ))}
                    {/*//data and update END*/}
                </TableBody>
            </Table>
        </Fragment>
    );
}

export default PersonTable;
