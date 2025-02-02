import { ICommand } from "./ICommand";

export interface ISystemCommand extends ICommand {
    isSystem: true;
}
