import Head from 'next/head'
import Link from 'next/link'
import Cookies from 'universal-cookie'
import React, { useState, useEffect } from 'react';

const stylingBtn2 = "text-center col-span-2 border-2 border-blue-300 hover:bg-blue-300 bg-blue-400 text-white font-bold py-2 px-4 rounded-full ";
const stylingBtn4 = "text-center col-span-4 border-2 border-blue-300 hover:bg-blue-300 bg-blue-400 text-white font-bold py-2 px-4 rounded-full ";
const stylingData2 = "text-center col-span-2 border-2 border-blue-300 bg-blue-100 text-black font-bold py-2 px-4 rounded-full ";
const stylingData4 = "text-center col-span-4 border-2 border-blue-300 bg-blue-100 text-black font-bold py-2 px-4 rounded-full ";

export default function Profile() {
  const [withd, setWith] = React.useState(false);  
  const [showModal, setShowModal] = React.useState(false);
  const [showModal1, setShowModal1] = React.useState(false);

  const [users, setData] = useState({ hits: [] });  

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Username, setUsername] = useState('');
  const [Money, setMoney] = useState('');

  useEffect(async () => {
    const cookies = new Cookies();
    const id = cookies.get("userID");
    const fetchData = async () => {
    const res = await fetch(`http://localhost:3000/userid?id=${encodeURIComponent(id)}`, {
      method: "GET"  
    });
    const data1 = await res.json();
    setData(data1);
    };
    fetchData();
  },[{showModal,showModal1}]);
        

    function handleEmailFieldChange(event) {
        event.preventDefault();
        setEmail(event.target.value);        
    }
    function handlePasswordFieldChange(event) {
      event.preventDefault();
      setPassword(event.target.value);
    }
    function handleUsernameFieldChange(event) {
      event.preventDefault();
      setUsername(event.target.value);
    }
    function handleMoneyFieldChange(event) {
      event.preventDefault();
      setMoney(event.target.value);
    }
    function saveInfo(){
      if(Email!="")changeEmail(Email);
      if(Password!="")changePass(Password);
      if(Username!="")changeUser(Username);    
    }
    function saveMoney(){      
      let as = Money.replace(/\D/g,'');
      if(withd){
        if(as>users[0].money){
          as=users[0].money;          
          SubMoney(-as);
        }else{
          SubMoney(-as);
        }
        
      }else{
        2147483647
        if(as+users[0].money>=2147483647){
          as=users[0].money; 
          let sa =2147483647-as;
          AddMoney(sa);
        }else{
          AddMoney(as);
        }
        
      }
      setMoney('');
    }
  
  let data = users[0];
  
      
  
  if(data==null)return(<div></div>)
  return (
    <div class="flex flex-col justify-center items-center p-20 bg-white" >
        
        <div class=" p-5 ">
          <img class="object-fit h-52 w-52 bg-blue-500 p-1 rounded-full"
          src={data.picture}
          alt={"/image.jpg"}/>
        </div>
        
        <div class="grid grid-cols-4 gap-3">
            
            <div class={stylingData4}>Username: {data.username}</div>
            
            <div class={stylingData4}>Balance: {data.money} €</div>
            <button onClick={() => {setShowModal1(true);setWith(false)}} class={stylingBtn2}>+ Money</button>
            <button onClick={() => {setShowModal1(true);setWith(true)}} class={stylingBtn2}>- Money</button>
      
            <div class={stylingData4}>Email: {data.email}</div>
            <div class={stylingData2}>Name: {data.name}</div>
            <div class={stylingData2}>Surname: {data.surname}</div>
            <div class={stylingData2}>Phone: {data.phone}</div>
            <div class={stylingData2}>Tax number: {data.taxnumber}</div>
                        
            <button
              className={stylingBtn4} type="button" onClick={() => setShowModal(true)}>
              Change User Info
            </button>
        </div>
        

        <>      
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Change info
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">

                <div class="mb-4">
                <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
                    Username
                </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" 
                        id="username" type="text" placeholder="Username"
                        type="username"
                        value={Username}
                        onChange={(e) => handleUsernameFieldChange(e)}
                    />
                </div>
                <div class="mb-4">
                <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
                    Password
                </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" 
                        id="username" type="text" placeholder="************"
                        type="username"
                        value={Password}
                        onChange={(e) => handlePasswordFieldChange(e)}
                    />
                </div>
                <div class="mb-4">
                <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
                    Email
                </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" 
                        id="username" type="text" placeholder="Email"
                        type="username"
                        value={Email}
                        onChange={(e) => handleEmailFieldChange(e)}
                    />
                </div>
                  
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {setShowModal(false);saveInfo()}}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>

    <>      
      {showModal1 ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                {withd && 
                  <h3 className="text-3xl font-semibold">
                    Widhraw 
                  </h3>}
                  {!withd && 
                  <h3 className="text-3xl font-semibold">
                    Add
                  </h3>}
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">

                <div class="mb-4">
                <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
                    Amount to 
                </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" 
                        id="username" type="text" placeholder=""
                        type="digit"
                        value={Money}
                        onChange={(e) => handleMoneyFieldChange(e)}
                    />
                </div>               
                  
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal1(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {setShowModal1(false),saveMoney()}}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
        
    </div>
  )

}



async function AddMoney(money){
  const cookies = new Cookies();
    const id = cookies.get("userID");
    const res = await fetch(`http://localhost:3000/usrmoney?id=${encodeURIComponent(id)}&money=${encodeURIComponent(money)}`, {
      method: "POST"  
    });
}


async function SubMoney(money){
  const cookies = new Cookies();
    const id = cookies.get("userID");       
    const res = await fetch(`http://localhost:3000/usrmoney?id=${encodeURIComponent(id)}&money=${encodeURIComponent(money)}`, {
      method: "POST"  
    });
}

async function changeUser(usr){
  const cookies = new Cookies();
    const id = cookies.get("userID");       
    await fetch(`http://localhost:3000/usrusr?id=${encodeURIComponent(id)}&user=${encodeURIComponent(usr)}`, {
      method: "POST"  
    });
}
async function changePass(pass){
  const cookies = new Cookies();
    const id = cookies.get("userID");   
    await fetch(`http://localhost:3000/usrpass?id=${encodeURIComponent(id)}&pass=${encodeURIComponent(pass)}`, {
      method: "POST"  
    });
}
async function changeEmail(email){
  const cookies = new Cookies();
    const id = cookies.get("userID");   
    await fetch(`http://localhost:3000/usremail?id=${encodeURIComponent(id)}&email=${encodeURIComponent(email)}`, {
      method: "POST"  
    });
}

/**
 * 
 * 
 * 
 * 
 * for (let index = 0; index < data.length; index++) {
      if(data[index].id==id){          
          cookies.set('userData', data[index], { path: '/' });
      }
  }
   *  
      return await fetch("http://localhost:3000/users")
        .then(res => res.text())
        .then(
          result => {
            let final_data = JSON.parse(result);
            return final_data;
          },
          error => {}
        );
 */