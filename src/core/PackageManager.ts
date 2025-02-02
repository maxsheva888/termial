import { IPackage } from "../interfaces/IPackage";

export class PackageManager {
    private readonly packages: Map<string, IPackage> = new Map();

    registerPackage(pkg: IPackage): void {
      if (this.packages.has(pkg.name)) {
        throw new Error(`Package ${pkg.name} is already registered`);
      }
      this.packages.set(pkg.name, pkg);
    }

    getPackage(name: string): IPackage | undefined {
      return this.packages.get(name);
    }

    getAllPackages(): IPackage[] {
      return Array.from(this.packages.values());
    }
}
