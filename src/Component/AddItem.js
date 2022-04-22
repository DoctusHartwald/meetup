
import React, {useState} from 'react';
import  Card  from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import  TextField  from '@material-ui/core/TextField';
import  CardActions  from '@material-ui/core/CardActions';
import  Button  from '@material-ui/core/Button';
import {DataStore} from '@aws-amplify/datastore';
import { API, Storage } from 'aws-amplify';

import "../App.css";

import {Item} from '../models';



const AddItem=({currentUser}) => {
    const[title, setItemTitle] = useState("");
    const[description,setItemDescription] = useState("");
    const[price, setItemPrice] = useState(0);
    const[file,setItemFile] = useState(undefined);

    return <Card className="Add-item">
        <CardContent>

        
        <Typography variant="h6">Ajouter une annonce</Typography>
        <TextField id={"title"} label={"title"} onChange={event => setItemTitle(event.target.value)} fullWidth></TextField>
        <TextField id={"price"} label={"price"} onChange={event => setItemPrice(parseFloat(event.target.value))} fullWidth></TextField>
        <input type="file" accept="image/*" onChange={(event) =>{
            setItemFile(event.target.files[0]);
        }}/>
        <TextField id={"description"} label={"description"} onChange={event => setItemDescription(event.target.value)} fullWidth></TextField>
        </CardContent>

        <CardActions>
            <Button color="primary" onClick={async () => {
                if(file){
                    await Storage.put(file.name,file);
                }
                await DataStore.save(new Item({
                    title,
                    description,
                    price,
                    userEmail:currentUser.attributes.email,
                    picture: file ? file.name : ""

                }))
            }}>Publier</Button>
        </CardActions>

    </Card>

}
export default AddItem;