import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import Pages from './Pages';

function App() {
  const [pages, setPages] = useState([])
  const [num, setNum] = useState(null)

  useEffect( async () => {

    const res = await invoke('getPages', { example: 'getting pages' })
    setPages(res)
    // res.map(i => {
    //   setPages((pages) => [...pages, i]
    // )})
    setNum(res.length)
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
