import React,{useEffect} from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import {useDispatch, useSelector} from "react-redux";
import {addConnection,removeConnection} from "../utils/connectionSlice";

const Conections = () => {

    const dispatch=useDispatch();
    const connection=useSelector((store)=>store.connection);


    const fetchConnections = async () => {
        const res = await axios.get(BASE_URL+"/user/connection",{withCredentials:true});
        // console.log(res.data.data || "No connections found");
        dispatch(addConnection(res.data.data));
    }
    useEffect(() => {
        fetchConnections();
    }, []);

    if(!connection){
        return <div>No connections found!!!!</div>
    }


  return (
    <div className='p-10 '>
      <h1 className='text-2xl font-bold text-center'>Your Connections</h1>
      <div className='flex flex-wrap gap-4'>
        {connection && connection.map((connection) => {
          const {_id,firstName,lastName,age,gender,skills,photoUrl,about} = connection;
          return (
          <div key={_id} className='border-2 border-cyan-400 flex flex-row gap-2 rounded-lg p-2 '>
            <div className='flex justify-center items-center w-1/4'>

            <img src={photoUrl|| "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2526512481.jpg"} alt={firstName} className='w-20 h-20 rounded-full object-cover' />

              </div>
              <div>
            <h2 className='text-lg font-bold'>{firstName} {lastName}</h2>
            <div className='flex justify-start gap-2'>
            <p>{age}</p>
            <p>{gender}</p>
            </div>
            <p>{about}</p>


            <div className='flex flex-wrap gap-2'>{skills.map((skill) =>(
              <div key={skill} className='bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full'>
                {skill}
              </div>  
            ))}</div>
            </div>





          </div>
          )
        })}


      </div>
      
    </div>
  )

}

export default Conections