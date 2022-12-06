import { createContext,useState } from "react";


export const UserUpdation = createContext('')

function Updation({children})
{

 const [feedUpdate ,setFeedUpdate] = useState(true)
    return(
        <UserUpdation.Provider value={{setFeedUpdate,feedUpdate}}>
          {children}
        </UserUpdation.Provider>
    )
}

export default Updation;