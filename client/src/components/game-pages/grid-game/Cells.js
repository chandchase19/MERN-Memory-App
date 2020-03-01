import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { selectCell } from '../../../actions/gridGame';

const Cells = ({ gridGame, selectCell }) => {

    return (
        <div id='cells-wrapper'>
            <div className={"game-cells grid-size-" + gridGame.gridSize}>
                {gridGame.answearKey.map((answear, index) =>
                    <button className={gridGame.displayingPattern ? answear : gridGame.clickingCellsDisabled ? 'gray' : gridGame.selectedCells[index]} onClick={() => selectCell(index)}></button>
                    )}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    gridGame: state.gridGame
})

export default connect(mapStateToProps, { selectCell })(Cells)