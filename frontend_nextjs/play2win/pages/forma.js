
import Cookies from 'universal-cookie'
import React, { useState, useEffect, Component } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";
import AsyncSelect from 'react-select/async';
import dynamic from 'next/dynamic'
import axios from 'axios';




// MAIN HTML GENERATING FUNCTION
export default function example({ data,data1,data_id1 }) {
    const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [nagrada, setNagrada] = useState('')
  const [soba, setSoba] = useState('')
  const [opis, setOpis] = useState('')
  const [zacetek, setZacetek] = useState('')
  const [davek, setDavek] = useState('')
  const cookies = new Cookies();
  
  const game_id = data_id1;

  
 
  const isLogged = cookies.get('userLogged');

    const submit = e => {
        e.preventDefault()
        
        axios.get(`http://localhost:3000/submit-form?email=${email}&game_id=${game_id}&comment=${comment}&nagrada=${nagrada}&soba=${soba}zacetek=${zacetek}&opis=${opis}&davek=${davek}`);
        axios.get(`http://localhost:3000/user_game_loby_add?userID=${isLogged}&game_id=${game_id}`);

      }  
 
  return (
    
    <div className={styles.container}>
      
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 id="demo" className="text-7xl bg-white text-white p-5 pb-7 rounded-lg">
        Get easy money with pay 2 win.
        </h1>

    <div>
    <h1>IZPOLNITE PROSIM</h1>
    <div class="border-double border-4 border-indigo-600 px-6 py-6 rounded-lg">
    <form onSubmit={submit}>
      <label htmlFor="comment" pattern="[0-9]*" >Število Igralcev (MAX):</label><br />
      <textarea rows="1" cols="50" style={{border: '2px solid black'}}
        name="comment"
        value={comment}
        onChange={e => setComment(e.target.value)}
        /><br />
      <br />
      <label htmlFor="nagrada">Nagrada (EUR):</label><br />
      <textarea rows="1" cols="50" style={{border: '2px solid black'}}
        name="nagrada"
        value={nagrada}
        onChange={e => setNagrada(e.target.value)}
        /><br />
      <br />
      
      <label htmlFor="opis" >Opis:</label><br />
      <textarea rows="1" cols="50" style={{border: '2px solid black'}}
        name="opis"
        value={opis}
        onChange={e => setOpis(e.target.value)}
        /><br />
      <br />

      <label htmlFor="soba">Ime Sobe:</label><br />
      <textarea rows="1" cols="50" style={{border: '2px solid black'}}
        name="soba"
        value={soba}
        onChange={e => setSoba(e.target.value)}
        /><br />
      <br />

      <label htmlFor="zacetek">Začetek (UTC):</label> <br />
      <textarea rows="1" cols="50" style={{border: '2px solid black'}}
        name="zacetek"
        value={zacetek}
        onChange={e => setZacetek(e.target.value)}
        /><br />
      <br />

      <label htmlFor="davek">Plačilo na posameznega igralca (EUR):</label> <br />
      <textarea rows="1" cols="50" style={{border: '2px solid black'}}
        name="davek"
        value={davek}
        onChange={e => setDavek(e.target.value)}
        /><br />
      <br />
   
      
      <label htmlFor="email">Tip Igre - Counter Strike GO ali League Of Legends</label> <br />
      <div class="flex justify-center">
  <div class="mb-3 xl:w-96">
    <select name="email" value={email} onChange={e => setEmail(e.target.value)} class="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
        <option selected></option>
        <option value="Counter Strike GO">Counter Strike GO</option>
        <option value="League of Legends">League of Legends</option>
     
       
    </select>
  </div>
</div>
      <br />
      <br />
      <button type="submit" class="p-4 bg-blue-700 hover:bg-blue-500 w-50 rounded-lg shadow text-xl font-medium uppercase text-white"
  >  Submit!  </button><br />
    </form>
    
    </div>
    </div>    

      </main>

    </div>
  )      
} 





//DATA FETCHING FROM WEBSERVER (copy when need data from apy)
export async function getStaticProps(context) {
  const res = await fetch(`http://localhost:3000/games`)
  const data = await res.json()
  const res1 = await fetch(`http://localhost:3000/tourtaments`)
  const data1 = await res1.json()
  const res2 = await fetch(`http://localhost:3000/forma`)
   const data_id = await res2.json()

  
  console.log(data)
  
  if (!data) {
    return {
      notFound: true,
    }
  
  }
  console.log(data1)
  console.log(data_id[0].id)
  let x=parseInt(data_id[0].id)
  x=x+1;

  const data_id1=String(x);
  console.log(data_id1)
  return {
    props: { data,data1,data_id1 }, // will be passed to the page component as props
  }
}

