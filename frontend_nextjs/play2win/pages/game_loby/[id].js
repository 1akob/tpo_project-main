import styles from '.\\..\\styles\\Home.module.css'
export const getStaticPaths = async (context) => {
    
    //http://localhost:3000/loby?ime=${gameID}
    const res = await fetch('http://localhost:3000/get-loby');
    const data = await res.json();
    console.log(data);
    const paths = data.map(item => {
        return {
            params: {id: item.id.toString()}
        }
    })
    return{ 
        paths,
        fallback: false
       
    }


}
export const getStaticProps = async (context) => {
    const id = context.params.id;

    const [lobyDetailsRes, lobyUsersRes]= await Promise.all([
        fetch('http://localhost:3000/loby?ime=' + id),
        fetch('http://localhost:3000/users-loby?id='+id)

    ]);
    const [items, userLoby] = await Promise.all([
        lobyDetailsRes.json(),
        lobyUsersRes.json()
    ]);

    /*
    const res  = await fetch('http://localhost:3000/loby?ime=' + id);   
    const result = await fetch('http://localhost:3000/usersLoby?id='+id);
    const data = await res.json();
    const data2 = await result.json();
*/
    return{
        props: { item: items, usr: userLoby }
    }

}
const Details = ({ item, usr }) => {
    return (






        <>
        
{item.map(attr => (
<div>
    <h1 className={styles.title} >
            Game Loby: {attr.game_name}
        </h1>

        <div class="min-h-screen flex-1 bg-gray-200 p-4 flex justify-center items-center">
            
                <div class="bg-white w-full md:max-w-4xl rounded-lg shadow">

                    <div class="h-12 flex justify-between items-center border-b border-gray-200 m-4">
                        <div>
                            <div class="text-xl font-bold text-gray-700">{attr.name} </div>
                            <div class="text-sm font-base text-gray-500">{attr.opis}</div>
                            
                        </div>
                        <div>
                            <div class="text-xl font-bold text-gray-700">Čas:  </div>
                            <div class="text-sm font-base text-gray-500">{attr.time}</div>
                            
                        </div>

                        <div>
                            <div class="flex items-center justify-center w-full  ">
                                <label
                                    htmlFor="toogleA"
                                    class="flex items-center cursor-pointer"
                                >
                                    <div class="flex items-center">
                                       
                                    <div>
                            <div class="text-xl font-bold text-gray-700">Nagrada: </div>
                            <div class="text-sm font-base text-gray-500">{attr.game_sum} €</div>
                            
                        </div>
                                       
                                    </div>
                                </label>
                            </div>
                        </div>

                        
                    </div>
                    
                    {usr.map(userData => (
                        <div>
                    <div class="px-6">


                        <div class="flex justify-between items-center h-16 p-4 my-6  rounded-lg border border-gray-100 shadow-md">
                            <div class="flex items-center">
                                <img class="rounded-full h-12 w-12" src={userData.picture} alt="" />
                                <div class="ml-2">
                                    <div class="text-sm font-semibold text-gray-600">{userData.username}</div>
                                    <div class="text-sm font-light text-gray-500">{userData.email}</div>
                                </div>
                            </div>
                            
                        </div>




                    </div>
                    </div>
                    ))}
                        


                    <div class="p-6 ">
                        <button class="p-4 bg-blue-700 hover:bg-green-500 w-full rounded-lg shadow text-xl font-medium uppercase text-white">Start the game</button>
                    </div>
                </div>
                 
            </div>
            </div>
           ))}
            </>
            












    );








    
}
export default Details;
//DATA FETCHING FROM WEBSERVER (copy when need data from apy)
//DATA FETCHING FROM WEBSERVER (copy when need data from apy)
