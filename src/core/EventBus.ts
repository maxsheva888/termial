import { IEventBus } from "../interfaces/IEventBus";

export class EventBus implements IEventBus {
    private readonly handlers: Map<string, Set<Function>> = new Map();

    emit<T>(eventName: string, payload: T): void {
      const handlers = this.handlers.get(eventName);
      if (handlers) {
        handlers.forEach(handler => handler(payload));
      }
    }

    on<T>(eventName: string, handler: (payload: T) => void): void {
      if (!this.handlers.has(eventName)) {
        this.handlers.set(eventName, new Set());
      }
      this.handlers.get(eventName)!.add(handler);
    }

    off<T>(eventName: string, handler: (payload: T) => void): void {
      const handlers = this.handlers.get(eventName);
      if (handlers) {
        handlers.delete(handler);
      }
    }
}
