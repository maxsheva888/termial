import { IParsedCommand } from "../interfaces/IParsedCommand";

export class CommandParser {
    parse(input: string): IParsedCommand {
      const parts = input.trim().split(' ');
      const isSystemCommand = !input.includes(' ') || parts[0] === 'system';

      if (isSystemCommand) {
        return {
          packageName: 'system',
          commandName: parts[0],
          args: parts.slice(1),
          raw: input
        };
      }

      return {
        packageName: parts[0],
        commandName: parts[1],
        args: parts.slice(2),
        raw: input
      };
    }
}
