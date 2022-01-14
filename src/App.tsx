import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite'
import {store} from "./store";
import './styles.css'
import CellTile from "./Cell";

const App = () => {
    useEffect(() => {
        store.refreshField()
    }, [])
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
    return (
        <div>
            <button style={{
                margin: 40
            }} onClick={() => {
                store.refreshField()
            }}>
                Refresh field
            </button>
            <div onContextMenu={(e) => {
                e.preventDefault()
            }} onMouseDown={({button}) => {
                if (button === 0)
                    setIsMouseDown(true)
            }} onMouseUp={({button}) => {
                if (button === 0)
                    setIsMouseDown(false)
            }} style={{
                display: "flex",
                width: 1400,
                flexWrap: 'wrap',
                borderTop: '1px solid black',
                borderLeft: '1px solid black'
            }}>
                {store.field.map((cell, index) => <CellTile cell={cell} index={index} isMouseDown={isMouseDown}/>)}
            </div>
        </div>
    )

};

export default observer(App);
