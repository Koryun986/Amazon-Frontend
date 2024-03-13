"use client"
import {useRef} from "react";
import makeStore, {AppStore} from "../redux/store";
import {Provider} from "react-redux";
import {refreshUser} from "../redux/slices/user-slice";

export default function StoreProvider({
    children
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        storeRef.current = makeStore();
        storeRef.current.dispatch(refreshUser);
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}