import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";

// MAIN HTML GENERATING FUNCTION
export default function counterStrikeGo({ data }) {
  return (
    <div className={styles.container}>
     

      <main className={styles.main}>
        
        <div className="flex justify-around w-full ">
        <div class="container mx-auto p-6 grid grid-cols-3 gap-5">
        {data.map(item => (
          <Link href={`/game_loby/${item.id}`} id={item.id}>
          
          <div key={data.id} className=" h-full hover:brightness-95 cursor-pointer ">
            <div class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm flex flex-col">
              <a href="#">
                <img class="rounded-t-lg" src="https://cdn.akamai.steamstatic.com/steam/apps/730/capsule_616x353.jpg?t=1635269541" alt=""/>
              </a>
              <div class="p-5 h-full mt-auto">
                <a href="#">
                  <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2">{item.name}</h5>
                </a>
                <p class="font-normal text-gray-700 mb-3">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <a class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center" href="#">
                  Read more
                </a>
              </div>
            </div>
          </div>
          </Link>
        ))}
        </div>
  </div>


  <div class="p-6 ">
  <a href="/forma" ><button  class="p-4 bg-blue-700 hover:bg-blue-500 w-full rounded-lg shadow text-xl font-medium uppercase text-white">Dodaj novo sobo!
      </button></a>
  </div> 


      </main>


    </div>
  )
}

//DATA FETCHING FROM WEBSERVER (copy when need data from apy)
export async function getStaticProps(context) {


 // const gameID=1;
//http://localhost:3000/loby?ime=${gameID}
  const res = await fetch(`http://localhost:3000/get-cs-loby`)
  const data = await res.json()
  console.log(data)
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }, // will be passed to the page component as props
  }
}