import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';

const getChildren = async (pageID) => {
  const res = await invoke('getChildren', {pageID: pageID})
  return res
}

const getChildrenOfAllPages = async (pages) => {
  var pageIDs = []
  pages.map(p => pageIDs.push(p.id))
  // console.log(pageIDs)
  const children = await invoke('getChildrenOfAllPages', {pageIDs: pageIDs})

}

const deletePage = async (pageID) => {
  invoke('deletePage', { pageID: pageID })
  window.location.reload()
}

function App() {
  const [pages, setPages] = useState([])
  const [spaces, setSpaces] = useState([])
  const [children, setChildren] = useState([])
  const [currentUser, setCurrentUser] = useState([])
  const [newPage, setNewPage] = useState({
    pageTitle: '',
    spaceKey: ''
  })

  useEffect(() => {
    invoke('getPages', {example: 'getting titles'}).then(setPages)
    invoke('getSpaces', {example: 'getting spaces'}).then(setSpaces)
    invoke('getCurrentUser', { example: 'getting current user'}).then(setCurrentUser)
  }, [])

  const createPage = (e) => {
    e.preventDefault()
    invoke('createPage', { newPage })
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <h1>Welcome UserID {currentUser.accountId}</h1>
        {/* <img src={currentUser.} alt='profile'/> */}
      </div>
      <p>{currentUser.email}</p>
      <h3>Total Number of Pages and Spaces: {pages.length} & {spaces.length}</h3>
      <hr></hr>
      <div style={{ display: 'flex' }}>
        <button
          onClick={() => getChildrenOfAllPages(pages)}
        >
          Get Children of All Pages
        </button>
      </div>
      <hr></hr>
      <h3>Spaces Created</h3>
      <br/>
      <div style={{ display: 'flex' }}>
        {
          spaces.map(s => (
              <div style={{ marginRight: '35px' }}>
                <h4>{s.name}</h4>
                <p>{s.id}</p>
              </div>
            )
          )
        }
      </div>
      <hr></hr>
      <form onSubmit={createPage}>
        <h3 style={{ marginBottom: '5px' }}>Form to create a new page</h3>
        <input 
          style={{ padding: '8px 10px', width: '350px' }}
          placeholder='Title of the page'
          onChange={(e) => setNewPage({...newPage, pageTitle: e.target.value})}
        />
        <h5 style={{ marginBottom: '5px' }}>Select a space</h5>
        <select
          style={{ padding: '8px 10px', width: '150px', marginRight: '10px' }}
          value={newPage.spaceKey}
          onChange={(e) => setNewPage({
            ...newPage,
            spaceKey: e.target.value
          })}
        >
          {
            spaces.map(space => (
              <option value={space.key}>{space.name}</option>
            ))
          }
        </select>
        <button
          type='submit'
        >
          Create a Page
        </button>
      </form>
      <hr></hr>
      <h3>Pages Created</h3>
      <br/>
      <table>
        <thead>
          <tr>
            <th>
              Page Names
            </th>
            <th>
              Page IDs
            </th>
            <th>
              Get children
            </th>
            <th>
              Delete Page
            </th>
          </tr>
        </thead>
        <tbody>
          {
            pages.map(p => (
              <tr>
                <td>
                  <p>{p.title}</p>
                </td>
                <td>
                  <p>{p.id}</p>
                </td>
                <td>
                  <button
                    onClick={() => getChildren(p.id).then(setChildren)}
                  >
                    Get children
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => deletePage(p.id)}
                  >
                    Delete Page
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <hr></hr>
      {
        children.length > 0 ? children.map(c => (
          <div>
            <h3>Child Page Name: {c.title} & ID {c.id}</h3>
          </div> 
        )) : <h3>The page doesn't have a child</h3>
      }
    </div>
  );
}

export default App;
