import mitt, { Emitter } from "mitt"

export const emitter: Emitter<any> = mitt<any>()