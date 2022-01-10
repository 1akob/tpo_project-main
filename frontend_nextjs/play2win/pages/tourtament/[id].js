import styles from '../../styles/Home.module.css'
export const getStaticPaths = async () => {
    
    //http://localhost:3000/loby?ime=${gameID}
    const res = await fetch('http://localhost:3000/tourtaments');
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
    const res  = await fetch('http://localhost:3000/tourtament?ime=' + id);
    const data = await res.json();
    

    return{
        props: {item: data}
    }

}
const Details = ({ item }) => {
    return (
        <div>
            <h1>
            {item.map(attr => (
            <div>
                <h1 className={styles.title} >
                    Turnir {attr.name}
                </h1>
            
            <div class="min-h-screen flex-1 bg-gray-200 p-4 flex justify-center items-center">
                <div class="bg-white w-full md:max-w-4xl rounded-lg shadow">
                    <div class="h-12 flex justify-between items-center border-b border-gray-200 m-4">
                        <div>
                            <div class="text-xl font-bold text-gray-700">Št. igralcev v turnirju: {attr.max_players} </div>
                            <div class="text-sm font-base text-gray-500">{attr.opis}</div>
                            
                        </div>
                        <div>
                            <div class="text-xl font-bold text-gray-700">Nagrada za prvo mesto: {attr.reward} </div>
                            <div class="text-sm font-base text-gray-500">{attr.opis}</div>
                            
                        </div>
                        
                    </div>
                        <div class="flex justify-between items-center h-16 p-4 my-6  rounded-lg border border-gray-100 shadow-md">
                            <div class="flex items-center">
                                <div class="ml-2">
                                    <div class="text-sm font-semibold text-gray-600">Začetni vložek: {attr.stake}</div>
                                </div>
                            </div>
                            
                        </div>
                </div>
            </div>
            </div>
               
            ))}
            
        
        
            </h1>
            <p>{ item.opis}</p>
            <p></p>
        </div>
    );




    
}
export default Details;
//DATA FETCHING FROM WEBSERVER (copy when need data from apy)