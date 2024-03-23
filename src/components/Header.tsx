"use client"
import {Layout, Typography} from "antd";
import ProductsSearch from "./ProductsSearch";
import HeaderNav from "./HeaderNav";
import {getUser} from "../api/requests/auth-requests";
import {IUser} from "../types/IUser";
import {LocalStorageConstants} from "../constants/localstorage-constants";
import {setUser} from "../redux/slices/user-slice";
import {useEffect} from "react";
import {useAppDispatch} from "../hooks/store-hooks";

const { Header: HeaderAntd } = Layout;
const { Title } = Typography;

const Header = () => {
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
    return (
        <HeaderAntd style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
            <Title level={1} style={{color: "white"}}>Amazon</Title>
            <ProductsSearch />
            <div className={"text-white"}>
                <HeaderNav />
            </div>
        </HeaderAntd>
    );
};

export default Header;