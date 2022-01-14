import React from 'react';
import {Cell} from "./models/Cell";
import {observer} from "mobx-react-lite";
import {store} from "./store";

interface IProps {
    cell: Cell
    index: number
    isMouseDown: boolean
}

const defaultStyles = {
    display: "flex",
    width: 19,
    height: 19,
    borderBottom: '1px solid black',
    borderRight: '1px solid black',
}

const CellTile: React.FC<IProps> = ({cell, index, isMouseDown}) => {
    switch (cell) {
        case Cell.signal:
            return (
                <div onMouseDown={({button}) => {
                    if (button === 0)
                        store.changeColor(Cell.none, index)
                }} style={{...defaultStyles, backgroundColor: 'darkblue'}}/>)
        case Cell.wire:
            return (
                <div onMouseDown={({button}) => {
                    if (button === 0)
                        store.changeColor(Cell.none, index)
                }} onContextMenu={(e) => {
                    e.preventDefault()
                    if (e.type === 'contextmenu') {
                        store.changeColor(Cell.signal, index)
                    }
                }} style={{...defaultStyles, backgroundColor: 'yellow'}}/>
            )
        case Cell.tail:
            return (
                <div onMouseDown={({button}) => {
                    if (button === 0)
                        store.changeColor(Cell.none, index)
                }} style={{...defaultStyles, backgroundColor: 'red'}}/>
            )
        default:
            return (
                <div onMouseDown={({button}) => {
                    if (button === 0)
                        store.changeColor(Cell.wire, index)
                }} onMouseOver={() => {
                    if (isMouseDown) {
                        store.changeColor(Cell.wire, index)
                    }
                }} style={{...defaultStyles, backgroundColor: 'white'}}/>
            )
    }
}

export default observer(CellTile);