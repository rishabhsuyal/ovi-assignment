import React, { useEffect, useState } from 'react'

function SearchArea({ setSearch }) {

    const [historyData, setHistoryData] = useState([])
    
    useEffect(() => {
        if (!localStorage.getItem("history")) {
            localStorage.setItem("history", JSON.stringify([]))
        } else {
            let arr = JSON.parse(localStorage.getItem("history"))
            setHistoryData(arr);
        }
    }, [])


    function handleChange(e){
        e.preventDefault();
        setSearch(e.target.value)
        if(e.target.value!==""){
            setHistoryData(prev=>[e.target.value,...prev]);
            localStorage.setItem("history",JSON.stringify(historyData))
    }
    }
    
    function handleClick(his) {
        var input = document.getElementById("search");
        input.value = his
        setSearch(his);
    }

    function handleDelete(){
        setHistoryData([]);
        localStorage.setItem("history", JSON.stringify([]))
    }
    return (

       <div className='fixed left-1/2 right-1/2'>
         <div class="flex justify-center p-4">
            <div class="">
                <div class="w-96 max-w-lg">
                    <form onSubmit={e => { e.preventDefault(); }}>
                        <div class="flex justify-between rounded-md bg-white shadow shadow-black/20">
                            <input id="search" type="text" class="w-full flex-1 py-2 px-3 focus:outline-none" onChange={handleChange} placeholder="Start Typing..." />
                        </div>
                    </form>
                    <div class="mt-2 w-full  rounded-md bg-white">

                        {
                            historyData.slice(0, 4).map(his =>
                                <div class="flex justify-between cursor-pointer py-2 px-3 hover:bg-slate-100" onClick={() => handleClick(his)}>
                                    <p class="text-sm font-medium text-gray-600"  >{his}</p>
                                </div>)
                        }

                    </div>
                   {
                    historyData.length>0 &&
                     <div className='flex justify-end mt-3'>
                       <button onClick={handleDelete} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Clear</button>
                      </div>
                   }
                </div>
            </div>
        </div>
       </div>


    )
}

export default SearchArea