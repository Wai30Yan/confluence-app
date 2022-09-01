import React from 'react'

function Pages ({ pages }) {
    console.log(pages)
    // console.log(spaces)
    // console.log(space)
    return (
        <div>
            <h1>Page component</h1>
            {
                pages ?
                pages.map(page => {
                    <div>
                        <h3>Name: {page.title}</h3>
                        <p>ID: {page.id}</p>
                    </div>
                }) : 'Loading...'
            }

        </div>
    )
}

export default Pages