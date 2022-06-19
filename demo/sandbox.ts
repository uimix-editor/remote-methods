import { setup, windowEndpoint } from "../src";
import { MainAPI, SandboxAPI } from "./api";

const api: SandboxAPI = {
  sandboxGreet(name: string): string {
    return `Sandbox greet: Hello, ${name}`;
  },
  async sandboxGreetAsync(name: string): Promise<string> {
    return `Sandbox greetAsync: Hello, ${name}`;
  },
};

const mainAPI = setup<MainAPI>(api, windowEndpoint(window.parent!));

console.log(await mainAPI.mainGreet("World"));
console.log(await mainAPI.mainGreetAsync("World"));
