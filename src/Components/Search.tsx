import { useState } from "react";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [name, setName] = useState<string>("");

    const navigate  = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        console.log(name);
        e.preventDefault();

        if(name!=""){
            navigate(`/${name}/nse/details`)
        }

    }

    return (
        <>
            <div className="w-full items-center justify-center flex px-4 py-2 sm:px-12 sm:py-4 flex-row">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.currentTarget.value);
                    }}
                    className="w-4/6 sm:w-3/6 py-2 sm:py-3 rounded-3xl px-3 text-center text-xl sm:text-2xl border-2 border-black text-black border border-transparent focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                    placeholder="Search"
                />
                <SearchRoundedIcon onClick={handleSearch} className="ml-2 sm:ml-4 cursor-pointer text-black hover:text-blue-500 transition duration-300 ease-in-out" />
            </div>
        </>
    );
}

export default Search;
