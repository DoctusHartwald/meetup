import './App.css';

import '@aws-amplify/ui-react/styles.css';
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import { useEffect, useState } from 'react';
import ProfileToolbar from './Component/ProfileToolBar';
import { withAuthenticator } from '@aws-amplify/ui-react';
import {Auth} from 'aws-amplify';
import AddItem from './Component/AddItem';
import Items from './Component/Items';


Amplify.configure(awsExports);

const App = () => {
  const[currentUser,setCurrentUser] = useState(undefined);

  useEffect(()=> {
    async function getAuthUser(){
      setCurrentUser(await Auth.currentAuthenticatedUser())
    }
    getAuthUser()
  }, [] )

  return currentUser ? <div>
    <ProfileToolbar currentUser={currentUser} />
    <AddItem currentUser={currentUser}/>
    <Items/>
  </div> :null
}

export default withAuthenticator(App);