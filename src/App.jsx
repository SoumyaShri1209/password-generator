import { useState , useCallback ,useEffect,  useRef} from 'react'


function App() {
  const [length,setLength] = useState(8);
  const [numberAllowed , setNumberAllowed] = useState(false);
  const [charAllowed , setCharAllowed] = useState(false);
  const [password , setPassword] = useState('');

  const generatePassword = useCallback(()=>{
    let pass="";
    let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str+="01234567890123456789479742";
    if(charAllowed) str+="!@#$%^&*()_+!@#$%^&*()_+!@#%&*%";

    for(let i=1 ; i<=length ; i++){
    const char = Math.floor( Math.random() * str.length +1)
    pass+= str.charAt(char);

    }

    setPassword(pass);
   

  },[length,numberAllowed,charAllowed])

  useEffect(()=>{
    generatePassword()

  },[length , numberAllowed , charAllowed])

   const copyPasswordToClipboard= ()=>{
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select()
   }
   const passwordRef = useRef(null)
  return (
    <><div className='flex justify-center items-center h-screen '>

     <div className='bg-gray-900 w-200 h-90 rounded-3xl ml-7 mr-7 shadow-2xl px-10 py-10'>

      <h1 style={{ fontFamily: 'Roboto, sans-serif' }} className='text-white text-center text-3xl'>Password Generator</h1>

      <div className='flex overflow-hidden mb-4 mt-8'>
        <input type="text" value={password} className='outline-none w-full py-1 px-3 bg-white rounded-3xl ml-5 mr-5 h-10' placeholder='password' readonly ref={passwordRef} />
        <button style={{ fontFamily: 'Roboto, sans-serif' }} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-3xl mr-5 cursor-pointer hover:bg-blue-600' onClick={copyPasswordToClipboard}>COPY</button>
      </div>

      <div className='flex gap-x-2 text-xl'>

        <div className='flex items-center gap-x-1 ml-5 mt-20 w-200'>
          <input type="range" min={6} max={100} value={length} onChange={(e)=> setLength(e.target.value)} className='cursor-pointer w-50' />
          <label htmlFor="length" className='text-orange-500 ml-4'>length: {length}</label>
        </div>

           <div className='flex justify-between mt-20 w-full  '>
                  <div className='flex items-center gap-x-1 w-full'>        
              <input type="checkbox" defaultChecked={numberAllowed} onChange={()=>{
                setNumberAllowed((prev)=>!prev);
              }} />
              <label className='text-orange-500' htmlFor="Number">Numbers</label>
       
</div> 
            <div className='flex items-center gap-x-1  w-full'>
              <input type="checkbox" defaultChecked={charAllowed} onChange={()=>{
                setCharAllowed((prev)=>!prev);
              }} />
              <label className='text-orange-500' htmlFor="Character">Characters</label>
       </div>
           </div>
   



      </div>

     </div>
     </div>
    </>
  )
}

export default App;
