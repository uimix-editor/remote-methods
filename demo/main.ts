import { setup, windowEndpoint } from "../src/index";
import { MainAPI, SandboxAPI } from "./api";

const targetIframe = document.querySelector("iframe")!;

const api: MainAPI = {
  mainGreet(name: string): string {
    return `mainGreet: Hello, ${name}`;
  },
  async mainGreetAsync(name: string): Promise<string> {
    return `mainGreetAsync: Hello, ${name}`;
  },
};

const sandboxAPI = setup<SandboxAPI>(
  api,
  windowEndpoint(targetIframe.contentWindow!)
);

console.log(await sandboxAPI.sandboxGreet("Main"));
console.log(await sandboxAPI.sandboxGreetAsync("Main"));
