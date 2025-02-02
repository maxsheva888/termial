export interface IParsedCommand {
    packageName: string;
    commandName: string;
    args: string[];
    raw: string;
}
