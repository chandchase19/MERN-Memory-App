import React, { Fragment, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignLeft, faAlignRight, faAlignCenter } from '@fortawesome/free-solid-svg-icons'


const Loading = () => {
    
    const [count, setCount] = useState(1)

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(count => count + 1)
        }, 400)   
    }, [])

    return (
        <div id='loading'>
            <p>
                {(() => {
                    switch (count % 3) {
                        case 0: {
                            return <p>Loading.</p>
                        } 
                        case 1: {
                            return <p>Loading..</p>
                        }
                        case 2: {
                            return <p>Loading...</p>
                        }
                    }
                })()}
            </p>
        </div>
    )
}

export default Loading