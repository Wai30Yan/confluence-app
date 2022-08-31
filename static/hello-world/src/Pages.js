import React from 'react'
import { invoke } from '@forge/bridge';

const Pages = ({ pages }) => {
    console.log(pages)
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