import React, { Fragment, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignLeft, faAlignRight, faAlignCenter } from '@fortawesome/free-solid-svg-icons'


const Loading = () => {
    
    const [count, setCount] = useState(1)

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(count => count + 1)
        }, 275)   
    }, [])

    return (
        <div id='loading'>

            <p style={{fontSize: '1.5em'}}>{(() => {
                switch (count % 3) {
                    case 0: {
                        return <FontAwesomeIcon icon={faAlignLeft}/>
                    } 
                    case 1: {
                        return <FontAwesomeIcon icon={faAlignCenter}/>
                    }
                    case 2: {
                        return <FontAwesomeIcon icon={faAlignRight}/>
                    }
                }
            })()} Loading</p>

        </div>
    )
}

export default Loading