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

            <h1> {attr.name} </h1> 
               <p>{attr.max_players}</p>

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