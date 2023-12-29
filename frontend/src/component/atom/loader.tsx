import React, { useContext } from "react";
import LoadingContext from "../../contexts/LoadingContext";
import { PacmanLoader } from 'react-spinners';

const Loader:React.FC = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isLoading, setIsLoading } = useContext(LoadingContext);
    
    return (
        <div>
            {/* <div className="flex-grow-1 d-flex align-items-center justify-content-center"> */}
            <div className={`fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-75 ${!isLoading && "hidden"} flex justify-center items-center`}>
                <PacmanLoader color="#f1d43a" size={50} loading={isLoading} />
            </div>
        </div>

    )
}

export default Loader