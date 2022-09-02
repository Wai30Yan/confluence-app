import React from 'react'

function Pages ({ pages, spaces }) {
    console.log(pages, spaces)
    // console.log(spaces)
    // console.log(space)
    return (
        <div>
            <h1>Page component</h1>
            {
                pages ?
                pages.map(page => {
                    <div>
                        {page.title} - {page.id}
                    </div>
                }) : 'Loading...'
            }

        </div>
    )
}

export default Pages