import React,{useState,useEffect} from "react";
import UsersList from "../components/UsersList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import useHttpClient from "../../shared/components/hooks/http-hook";

const Users = () => {

  const [loadedUsers, setLoadedUsers] = useState();
  const { sendRequest , isLoading , error , clearError } = useHttpClient();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
      const responseData =  await sendRequest(process.env.REACT_APP_BACKEND_URL + '/users');
      // console.log(responseData.users);
        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    getAllUsers();
  }, [sendRequest]);
return (
    <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    {isLoading && (
      <div className="center">
        <LoadingSpinner />
      </div>
    )}
    {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
  </React.Fragment>
);
}

export default Users;