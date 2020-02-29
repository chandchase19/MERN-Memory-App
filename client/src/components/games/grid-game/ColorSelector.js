import React, { Fragment } from 'react'
import { selectColor } from '../../../actions/gridGame';
import { connect } from 'react-redux'

export const ColorSelector = ({gridGame, selectColor}) => {

    const hideSelectorStyle = (gridGame.currentComponent === 'intro' || gridGame.displayingPattern) && 'selector-disabled'

    let redSelector = 'red'
    let greenSelector = 'green'
    let blueSelector = 'blue'
    
    if (!gridGame.displayingPattern) {
        redSelector += gridGame.colorPicker === 'red' ? ' color-clicked' : ''
        greenSelector += gridGame.colorPicker === 'green' ? ' color-clicked' : ''
        blueSelector += gridGame.colorPicker === 'blue' ? ' color-clicked' : ''
    }

    return (
        <div id='color-selector-wrapper'>
            <div id='color-selector-flex' className={hideSelectorStyle}>
                <button onClick={e => selectColor('red')} className={redSelector}></button>
                <button onClick={e => selectColor('green')} className={greenSelector}></button>
                <button onClick={e => selectColor('blue')} className={blueSelector}></button>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    gridGame: state.gridGame
})

export default connect(mapStateToProps, { selectColor })(ColorSelector)