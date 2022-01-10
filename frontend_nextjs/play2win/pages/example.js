import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";

// MAIN HTML GENERATING FUNCTION
export default function example({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Šopaj care
        </h1>

        <p className={styles.description} >
          Get easy money with pay 2 win.

        </p>
      <div className="flex justify-around w-full ">
        {data.map(item => (
          <Link href={item.name.replace(/\s+/g, '-').toLowerCase()}>
          <div key={data.id} className=" h-full hover:brightness-95 cursor-pointer ">
            <div class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm flex flex-col">
              <a href="#">
                <img class="rounded-t-lg" src={item.picture} alt=""/>
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


      </main>


    </div>
  )
}

//DATA FETCHING FROM WEBSERVER (copy when need data from apy)
export async function getStaticProps(context) {
  const res = await fetch(`http://localhost:3000/games`)
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