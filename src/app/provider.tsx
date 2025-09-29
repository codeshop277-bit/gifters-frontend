"use client";
// by default all components are treated as server side components in next js
// to explicity set component to client rendering, we use "use client"
//this allows us to use hooks and store
import { Provider } from "react-redux";
import { store } from "../../services/store";

export function Providers({children}: {children: React.ReactNode}){
    return <Provider store={store}>{children}</Provider>
}