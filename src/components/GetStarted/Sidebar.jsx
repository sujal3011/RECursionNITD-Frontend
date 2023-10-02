/* eslint-disable */
import { IconButton } from '@chakra-ui/button'
import React, { useEffect, useState } from 'react'
import useLoading from '../../hooks/useLoading';
import { getContents } from '../../api/getStarted';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import Collapsible from './Collapsible';
import useContent from '../../hooks/useContent';

const Sidebar = () => {

    const {contents, setContents, levelSelected, setLevelSelected, topicSelected, setTopicSelected} = useContent();
    const { loading, setLoading } = useLoading(true);

    useEffect(() => {
      async function fetch(){
        const result = await getContents();
        setContents(result);
        console.log(result);
      }
      setLoading(true);
      fetch();
      setLoading(false);
    }, []);



  return (
    <div className='w-3/12 max-w-[350px] m-0 h-full fixed pt-12 pb-24 overflow-scroll'>
        {
            contents?.map((item,idx)=>{
                return(
                    <div key={idx}>
                        <div className='font-head pl-6 rounded-r-xl cursor-pointer flex justify-between  pb-3 pt-3 font-semibold text-md text-secondaryText'
                        style={{
                            backgroundColor:(idx==levelSelected)? '#283541':'#23272F',
                            color:(idx==levelSelected)? '#149ECA':'#98A0B2',
                        }} 
                        onClick={(e)=>{setLevelSelected(idx)}}
                        >
                            <div className='mx-0'>
                                {item.Level_title}
                            </div>
                            {(idx==levelSelected)? <ChevronUpIcon className='ml-0 mr-3'/>:<ChevronDownIcon className='ml-0 mr-3'/>}
                        </div>
                        <Collapsible idx={idx} item={item}/>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Sidebar