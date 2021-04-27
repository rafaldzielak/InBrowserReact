import * as esbuild from "esbuild-wasm";
import axios from "axios";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin", //for debug
    //called automatically with single argument; we override what is being done
    setup(build: esbuild.PluginBuild) {
      // We attach event listeners to listen on onresolve and onload events
      // onresolve figures out what the actual path is for the file
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        // filter: checks every file
        console.log("onResolve", args);
        // namespace - sets the set of files
        if (args.path === "index.js") return { path: args.path, namespace: "a" };
        if (args.path.includes("./") || args.path.includes("../"))
          return {
            path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/").href,
            namespace: "a",
          };
        else return { path: `https://unpkg.com/${args.path}`, namespace: "a" };
      });

      build.onLoad({ filter: /.*/ /*,namespace: 'a'*/ }, async (args: any) => {
        console.log("onLoad", args);

        // onLoad is the process of finding the file - we override it here
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `
              import React from 'react'; 
              console.log(React);
            `,
          };
        } else {
          const { data, request } = await axios.get(args.path);
          console.log(data);
          return { loader: "jsx", contents: data, resolveDir: new URL("./", request.responseURL).pathname };
        }
      });
    },
  };
};
