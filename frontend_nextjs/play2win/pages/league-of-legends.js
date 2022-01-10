import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";

// MAIN HTML GENERATING FUNCTION
export default function counterStrikeGo({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
            League of Legends
        </h1>
        <div className="flex justify-around w-full ">
        <div class="container mx-auto p-6 grid grid-cols-3 gap-5">
        {data.map(item => (
          <Link href={`/game_loby/${item.id}`} id={item.id}>
          
          <div key={data.id} className="hover:brightness-95 cursor-pointer -mx-4 ">
            <div class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm flex flex-col">
              <a href="#">
                <img class="rounded-t-lg" src="https://www.nadlani.si/wp-content/uploads/2020/01/League-of-Legends.jpg" alt=""/>
              </a>
              <div class="p-5 h-full mt-auto">
                <a href="#">
                  <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2">{item.name}</h5>
                </a>
                <p class="font-normal text-gray-700 mb-3"> Trenutna stava: {item.game_sum}€ </p>
                <p class="font-normal text-gray-700 mb-3"> Število igralcev: {item.Igralcev} </p>
                <p class="font-normal text-gray-700 mb-3"> {item.opis} </p>

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
  const res = await fetch(`http://localhost:3000/get-lol-loby`)
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
