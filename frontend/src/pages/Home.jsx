import { useState } from "react";
import { useEffect } from "react";
import { getSuppliers } from "../services/SupplierApi";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SupplierList from "../components/SupplierList";

export default function Home()
{
   const [suppliers, setSuppliers] = useState([])

   useEffect(() => {
    async function loadSuppliers (){
        const data = await getSuppliers()
        setSuppliers(data)
    }
    loadSuppliers()
   }, [])

  return (
    <>
        <Header />
        <Hero />
        <SupplierList suppliers={suppliers} />
    </>
  )
}