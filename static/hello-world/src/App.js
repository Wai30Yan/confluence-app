import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import Pages from './Pages';

function App() {
  const [pages, setPages] = useState([])
  const [spaces, setSpaces] = useState([])
  const [space, setSpace] = useState([])
  const [num, setNum] = useState(null)
  
  useEffect(() => {
    
    const getPages = async () => {
      const res = await invoke('getPages', { example: 'getting pages' })
      // const spaces = await invoke('getSpaces')
      // const space = await invoke('getSpace')
      setPages(res)
      // setSpaces(spaces)
      // setSpace(space)
      setNum(res.length)
      console.log('Inside async', pages)
    }
    getPages()
    console.log('Outside async', pages)
  }, [])

  return (
    <div>
      <h1>Title heading for this confluence forge application</h1>
      <h3>Total Number of Pages: {num}</h3>
      <Pages pages={pages} />
    </div>
  );
}

export default App;
