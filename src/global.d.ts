declare module "*.png" {
    const value: any;
    export = value;
}

declare module "*.svg" {
    const value: any;
    export = value;
}

declare module "*.jpg" {
    const value: any;
    export = value;
}

declare module '*.scss' {
    const content: {[className: string]: string};
    // noinspection JSUnusedGlobalSymbos
    export default content;
}
