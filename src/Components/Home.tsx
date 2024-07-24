import GainLost from "./GainLose";
import Search from "./Search";

function Home(){
    return(
        <>
        <div className="min-h-screen bg-gray-100 m-0">
        <Search/>
        <GainLost/>
        </div>
        </>
    );
}

export default Home;