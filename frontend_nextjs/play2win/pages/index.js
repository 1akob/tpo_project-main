import React, { useEffect, useState } from "react";
import Cookies from 'universal-cookie'


export default function Login({ data })  {
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    

    function handleSignInEmailFieldChange(event) {
        event.preventDefault();
        setSignInEmail(event.target.value);
        
    }
    async function handleRegister(event){
        window.open('/register',"_self");
    }


    function handleSignInPasswordFieldChange(event) {
        event.preventDefault();
        setSignInPassword(event.target.value);
    }

    async function handleSignIn(event) {       
        const cookies = new Cookies();
        
        event.preventDefault();
        setErrorMessage('');       
        
        try {
        const res = await fetch(`http://localhost:3000/login?user=${encodeURIComponent(signInEmail)}&pass=${encodeURIComponent(signInPassword)}`);
        const data = await res.json();      
                        
        
          
        if(data.length==0)alert("Wrong username or password")
        else {
            window.open('/private_index',"_self");
            cookies.set('userID', data[0].id, { path: '/' });
            cookies.set('userLogged', 1, { path: '/' });
        }
        
        setErrorMessage('There was an error signing in');
        } catch (err) {
        // Remediation logic
        alert("Wrong username or password")
        setErrorMessage('There was an error signing in');
        }
    }
    

    return(
        <div>
            <div class="flex justify-center ">
            <div class=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div class="mb-4">
                <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
                    Username
                </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" 
                        id="username" type="text" placeholder="Username"
                        type="username"
                        value={signInEmail}
                        onChange={(e) => handleSignInEmailFieldChange(e)}
                    />
                </div>
                <div class="mb-6">
                    <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" 
                        id="password" type="password" placeholder="******************"
                        type="password"
                        value={signInPassword}
                        onChange={(e) => handleSignInPasswordFieldChange(e)}/>
                    <p class="text-red text-xs italic">Please choose a password.</p>
                    </div>
                <div class="flex items-center justify-between">
                
                
            </div>
                <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded" 
                    type="button"
                    onClick={handleSignIn}>
                        Sign In
                </button>
                <br></br>
                <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded" 
                    type="button"
                    onClick={handleRegister}>
                        Register
                </button>
            </div>
            </div>
        </div>
    
    );
}

