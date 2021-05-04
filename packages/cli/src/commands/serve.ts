import path from "path";
import { Command } from "commander";
import { serve } from "local-api";
const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
  .command("serve [filename]") // filename is optional value
  .description("Open a file for editing")
  .option("-p, --port <number>", "Port to run server on", "4005") // <requiredValue>
  .action(async (fileName = "notebook.js", options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(fileName)); // cwd() - directory from which user ran the command
      const file = path.basename(fileName); //name of the file
      await serve(parseInt(options.port), file, dir, !isProduction);
      console.log(`Opened ${fileName}. Navigate to http://localhost:${options.port} to edit the file`);
    } catch (error) {
      if (error.code === "EADDRINUSE") console.log("Port in use. Try running on a different one");
      else console.log(error.message);
      process.exit(1);
    }
  });
