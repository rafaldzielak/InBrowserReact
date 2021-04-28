import * as esbuild from "esbuild-wasm";

import axios from "axios";
import localForage from "localforage";
const fileCache = localForage.createInstance({ name: "filecache" });

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      // onLoad is the process of finding the file - we override it here
      build.onLoad({ filter: /(^index\.js$)/ }, () => ({ loader: "jsx", contents: inputCode }));
      // This will happen for everything except index.js, if there's no cachedResult it will got to next onload

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
        if (cachedResult) return cachedResult;
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        const escapedString = data.replace(/\n/g, "").replace(/"/g, '\\"').replace(/'/, "\\'");

        const contents = `
            const style = document.createElement('style');
            style.innerText = '${escapedString}';
            document.head.appendChild(style);
          `;
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, result);
        return result;
      });

      build.onLoad({ filter: /.*/ /*,namespace: 'a'*/ }, async (args: any) => {
        // check to see if we have already fetched this file and if it is in the cachem if it is - return it immediately

        const { data, request } = await axios.get(args.path);
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
