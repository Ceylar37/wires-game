import {makeAutoObservable} from "mobx";
import {Cell} from "../models/Cell";

class Store {
    width = 70

    constructor() {
        makeAutoObservable(this)
    }

    field: Cell[] = []
    timer: any

    refreshField = () => {
        let cleanField: any[] = new Array(2100)
        this.field = cleanField.map(() => Cell.none)
        if (this.timer) {
            clearInterval(this.timer)
        }
        this.timer = setInterval(() => {
            this.tick()
        }, 100)
    }

    changeColor = (newType: Cell, index: number) => {
        this.field[index] = newType
    }

    private tick = () => {
        this.field = this.field.map((cell, index, field) => {
            switch (cell) {
                case Cell.none:
                    return Cell.none
                case Cell.tail:
                    return Cell.wire
                case Cell.signal:
                    return Cell.tail
                case Cell.wire:
                    return this.checkWireCell(cell, index)
            }
        })
    }

    private checkWireCell = (cell: Cell, index: number) => {
        let count = 0
        if (index === 0) {
            return this.checkCell([index + 1, index + this.width, index + this.width + 1])
        }
        if (index === this.width - 1) {
            return this.checkCell([index - 1, index + this.width - 1, index + this.width])
        }
        if (index === this.field.length - this.width) {
            return this.checkCell([index - this.width, index - this.width + 1, index + 1])
        }
        if (index === this.field.length - 1) {
            return this.checkCell([index - this.width - 1, index - this.width, index - 1])
        }
        if (index < this.width) {
            return this.checkCell([index - 1, index + 1, index + this.width - 1, index + this.width, index + this.width + 1])
        }
        if (index > this.field.length - this.width) {
            return this.checkCell([index - this.width - 1, index - this.width, index - this.width + 1, index - 1, index + 1])
        }
        if (index % this.width === 0) {
            return this.checkCell([index - this.width, index - this.width + 1, index + 1, index + this.width, index + this.width + 1])
        }
        if ((index + 1) % this.width === 0) {
            return this.checkCell([index - this.width, index - this.width - 1, index - 1, index + this.width - 1, index + this.width])
        }
        return this.checkCell([
            index - this.width - 1,
            index - this.width,
            index - this.width + 1,
            index - 1,
            index + 1,
            index + this.width - 1,
            index + this.width,
            index + this.width + 1,
        ])
    }

    private checkCell = (indexes: number[]) => {
        let count = 0;
        indexes.forEach(index => this.field[index] === Cell.signal && count++)
        if (count === 1 || count === 2) {
            return Cell.signal
        }
        return Cell.wire
    }
}


export const store = new Store()