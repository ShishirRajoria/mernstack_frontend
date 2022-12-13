import {useState,useCallback,useEffect} from 'react';

let logoutTimer;

 useAuthen = () =>{
    const [token, setToken] = useState(false);
    const [tokenExpirationDate1,setTokenExpirationDate1] = useState();
    const [userId, setUserId] = useState();
  
    const login = useCallback((uid, token, expirationDate) => {
      setToken(token);
      setUserId(uid);
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate1(tokenExpirationDate);
  
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: uid,
          token: token,
          expiration: tokenExpirationDate.toISOString(), 
        })
      ); 
    }, []);
    const logout = useCallback(() => {
      setToken(null);
      setTokenExpirationDate1(null)
      setUserId(null);
      localStorage.removeItem("userData");
    }, []);
  
    useEffect(()=>{
      if(token && tokenExpirationDate1){
        const remainingTime = tokenExpirationDate1.getTime() - new Date().getTime();
      logoutTimer =  setTimeout(logout,remainingTime);
      }else{
        clearTimeout(logoutTimer);
      }
    },[token,logout,tokenExpirationDate1]);
    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem("userData"));
      if (
        storedData &&
        storedData.token &&
        new Date(storedData.expiration) > new Date()
      ) {
       
        login(
          storedData.userId,
          storedData.token,
          new Date(storedData.expiration)
        );
      }
    }, [login]); 

    return {login,logout,token,userId}

    
}

export default useAuthen;