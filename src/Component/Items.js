
import React,{useEffect, useState} from 'react'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from '@material-ui/core/Typography'
import "../App.css"
import {DataStore, Predicates } from '@aws-amplify/datastore';
import {Item} from "../models";
import { AmplifyS3Image } from '@aws-amplify/ui-react/legacy';

async function listItems(setItems){
    const items = await DataStore.query(Item,Predicates.ALL);
    setItems(items);
}

function Items() {

    const[items, setItems] = useState([]);

    //hock react - receive a callback notif on item change
  
    useEffect( () => {
    
        listItems(setItems);
    
        const subscription = DataStore.observe(Item).subscribe(() => {
          listItems(setItems);
        });
    
        const handleConnectionChange = () => {
          const condition = navigator.onLine ? 'online' : 'offline';
          console.log(condition);
          if (condition === 'online') { listItems(setItems); }
        }
        
        window.addEventListener('online', handleConnectionChange);
        window.addEventListener('offline', handleConnectionChange);
           
        return () => subscription.unsubscribe();
      }, []);
    


    return <div>
        {items.length === 0 && 
        <Typography style={{textAlign: "center"}} variant="h6"> Il n'y a pas annonce </Typography> }
        {items.map(item => 
            <Card key={item.id} className="Item">
                <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography style={{float: "right"}}> Prix {item.price}$</Typography>
                <Typography>{item.description}</Typography>
                    {item.picture && <AmplifyS3Image path={item.picture} /> }
                <Typography style={{textAlign: "right"}}>Publié par {item.userEmail} le {item.createdAt}</Typography>

                </CardContent>
            </Card>)}
    </div>
}
export default Items;