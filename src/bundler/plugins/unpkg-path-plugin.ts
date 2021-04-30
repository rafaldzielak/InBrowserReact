import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin", //for debug
    //called automatically with single argument; we override what is being done
    setup(build: esbuild.PluginBuild) {
      // Handle root entry file of 'index.js'
      build.onResolve({ filter: /(^index\.js$)/ }, () => ({ path: "index.js", namespace: "a" }));
      // Handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args) => ({
        path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/").href,
        namespace: "a",
      }));
      // Handle main file of a module

      build.onResolve({ filter: /.*/ }, async (args: any) => ({
        path: `https://unpkg.com/${args.path}`,
        namespace: "a",
      }));
    },
  };
};
