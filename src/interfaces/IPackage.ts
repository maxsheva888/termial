import { ICommand } from "./ICommand";

export interface IPackage {
    name: string;
    version: string;
    commands: Map<string, ICommand>;
    dependencies?: string[];
    description?: string;
}
