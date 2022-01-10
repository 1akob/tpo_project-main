import Head from 'next/head'
import Link from 'next/link'
import Cookies from 'universal-cookie'
import React, { useState, useEffect } from 'react';

const stylingBtn2 = "text-center col-span-2 border-2 border-blue-300 hover:bg-blue-300 bg-blue-400 text-white font-bold py-2 px-4 rounded-full ";
const stylingBtn4 = "text-center col-span-4 border-2 border-blue-300 hover:bg-blue-300 bg-blue-400 text-white font-bold py-2 px-4 rounded-full ";
const stylingData2 = "text-center col-span-2 border-2 border-blue-300 bg-blue-100 text-black font-bold py-2 px-4 rounded-full ";
const stylingData4 = "text-center col-span-4 border-2 border-blue-300 bg-blue-100 text-black font-bold py-2 px-4 rounded-full ";
export default function Profile() {
    


  const [users, setData] = useState({ hits: [] });  

  useEffect(async () => {
    const cookies = new Cookies();
    const id = cookies.get("userID");
    console.log(id);
    const fetchData = async () => {
    const res = await fetch(`http://localhost:3000/userid?id=${encodeURIComponent(id)}`, {
      method: "GET"  
    });
    const data1 = await res.json();
    setData(data1);
    };
    fetchData();
    console.log("dasd");
  },[]);
  

 function sayHello(){}


  
  
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
            
            <div class={stylingData4}>Username:{data.username}</div>
            
            <div class={stylingData4}>Balance :{data.money} €</div>
            <button onClick={AddMoney} class={stylingBtn2}>+ Money</button>
            <button onClick={SubMoney} class={stylingBtn2}>- Money</button>
      
            <div class={stylingData4}>Email: {data.email}</div>
            <div class={stylingData2}>Name: {data.name}</div>
            <div class={stylingData2}>Surname: {data.surname}</div>
            <div class={stylingData2}>Phone: {data.phone}</div>
            <div class={stylingData2}>Tax number: {data.taxnumber}</div>
            
            <button onClick={changeUser} class={stylingBtn4}>Change Username</button>
            <button onClick={changePass}class={stylingBtn4}>Change password</button>
            <button onClick={changeEmail}class={stylingBtn4}>Change Email</button>
        </div>
        

    </div>
  )

}


async function AddMoney(){
  const cookies = new Cookies();
    const id = cookies.get("userID");   
    const money = 1000;
    const res = await fetch(`http://localhost:3000/usrmoney?id=${encodeURIComponent(id)}&money=${encodeURIComponent(money)}`, {
      method: "POST"  
    });
}


async function SubMoney(){
  const cookies = new Cookies();
    const id = cookies.get("userID");   
    const money = -1000;
    const res = await fetch(`http://localhost:3000/usrmoney?id=${encodeURIComponent(id)}&money=${encodeURIComponent(money)}`, {
      method: "POST"  
    });
}

async function changeUser(){
  const cookies = new Cookies();
    const id = cookies.get("userID");   
    const money = "amathos";
    const res = await fetch(`http://localhost:3000/usrusr?id=${encodeURIComponent(id)}&user=${encodeURIComponent(money)}`, {
      method: "POST"  
    });
}
async function changePass(){
  const cookies = new Cookies();
    const id = cookies.get("userID");   
    const money = "neki";
    const res = await fetch(`http://localhost:3000/usrpass?id=${encodeURIComponent(id)}&pass=${encodeURIComponent(money)}`, {
      method: "POST"  
    });
}
async function changeEmail(){
  const cookies = new Cookies();
    const id = cookies.get("userID");   
    const money = "amathos@amathos.com";
    const res = await fetch(`http://localhost:3000/usremail?id=${encodeURIComponent(id)}&email=${encodeURIComponent(money)}`, {
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