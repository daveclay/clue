declare type Socket = {
    id: string
    on: (name: string, eventHandler: <E>(event: E) => void) => void
    emit: <E>(name: string, event: E) => void
}
