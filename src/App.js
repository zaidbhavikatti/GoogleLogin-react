
import './App.css';
import { useEffect,useState} from 'react';
import  jwt_decode from 'jwt-decode';
export default function App() {

  const[user,setUser]=useState({});
  
  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token:"+response.credential);
    var userObject=jwt_decode(response.credential);
    console.log(userObject);
    document.getElementById("signInDiv").hidden=true; 
  }
  function handleSignOut(event){
    setUser({});
    document.getElementById("signInDiv").hidden=false;
  }
  useEffect(()=>{
      /*global google*/
     google.accounts.id.initialize({
      client_id:"",
      callback:handleCallbackResponse
  });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme:"outline",size:"large"}
    );

  },[]);
  // if we have no user:sign in button
  // if we have user:show log out button
  return (
    <div className="App">
     
     <div id="signInDiv"></div>
     <button onClick={(e)=>handleSignOut(e)}>sign out</button>
     {user &&
     <div>

      <h3>{user.name}</h3>
     </div>
     
     }
     
     
    </div>
  );
}