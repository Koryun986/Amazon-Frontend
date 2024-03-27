import {useAppDispatch, useAppSelector} from "./store-hooks";
import {getUser} from "../api/requests/auth-requests";
import {IUser} from "../types/IUser";
import {LocalStorageConstants} from "../constants/localstorage-constants";
import {setUser} from "../redux/slices/user-slice";
import {useEffect} from "react";

export function useUser() {
  const user = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();

  const getUserDispatch = async () => {
    try {
      const {data} = await getUser();
      const user: IUser = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      };
      localStorage.setItem(LocalStorageConstants.ACCESS_TOKEN, data.access_token);
      dispatch(setUser(user));
    } catch (e) {
      dispatch(setUser(null));
    }
  };

  useEffect(() => {
    getUserDispatch()
  }, []);

  return user;
}