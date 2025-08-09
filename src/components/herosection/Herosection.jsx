import { FaDonate, FaHandsHelping, FaNewspaper } from 'react-icons/fa';

export const Card = () => {
  return (
    <div className='flex flex-wrap items-center justify-center gap-y-8 '>
      <div className='w-[33%] min-w-72 inline-flex gap-4 items-center justify-center'>
        <FaDonate size={80} color="green" />
        <p>
           <p className='text-2xl font-semibold'>Donate</p>
           <p className='opacity-50'>Your Litle bit donation can change the world</p>  
        </p>
         
      </div>
      <div className='w-[33%] min-w-72 inline-flex gap-4 items-center justify-center'>
        <FaHandsHelping size={80} color="blue"></FaHandsHelping>
        <p>
            <p className='text-2xl font-semibold'>join volunteer</p>
             <p className='opacity-50'>Join hands to make a difference in your community.</p>
        </p>
       
      </div>
      <div className='w-[33%] min-w-72 inline-flex gap-4 items-center justify-center'>
        <FaNewspaper size={80} color="red" />
        <p>
           <p className='text-2xl font-semibold'>Top news</p>
           <p className='opacity-50'>See our news to make a difference the world.</p>
        </p>
        
      </div>
    </div>
  )
}





const Herosection = () => {
  return (
    <>
    <div className="w-full h-full xl:h-[600px] relative px-5 py-30   bg-amber-500/8 dark:bg-gray-500">
       <div className="sm:w-[55%] w-[100%] h-full flex flex-col justify-between items-start gap-y-8">
        <h1 className="md:text-4xl xl:text-6xl text-xl text-black font-semibold">
           We are looking for volunteers<br></br>
           who will work for humanity
        </h1>
        <p className="opacity-50 xl:text-2xl">
          Join hands to make a difference in your community.
          Explore meaningful volunteer opportunities near you.
          Connect, contribute, and create lasting impact.
          Together, we build a better tomorrow—start today!
        </p>
         <div className="inline-flex w-full gap-8  items-center">
           <button className="px-3 py-2 bg-blue-600 cursor-pointer rounded-full text-white">
              Get Started Now
           </button>
           <a href="#" className="opacity-50">
             (+880)1770887721
             <span className="block">For any question or concern</span>
           </a>
         </div>

       </div>
       
       <div className="sm:block hidden absolute overflow-hidden top-0 bottom-10  right-3 bg-blue-700  w-[43%]   rounded-tl-[30%] rounded-br-[30%]">
          <div className=" relative w-full h-full bg-transparent overflow-hidden">
              <img className="absolute w-full bottom-0 right-1/2 translate-x-1/2" src="https://i.ibb.co/TNCGNLR/image-2025-06-10-155902710.png" alt="" />
             
          </div>

         
       </div>
      
    </div>
     <div className='px-5 py-10'>
       <Card></Card>
     </div>
    </>
  )
}

export default Herosection
