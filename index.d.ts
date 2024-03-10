declare function hasOwn<T extends {} = {}>(o: T, p: PropertyKey): p is object & keyof T;

export = hasOwn;