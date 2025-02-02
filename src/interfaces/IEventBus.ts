export interface IEventBus {
    emit<T>(eventName: string, payload: T): void;
    on<T>(eventName: string, handler: (payload: T) => void): void;
    off<T>(eventName: string, handler: (payload: T) => void): void;
}
