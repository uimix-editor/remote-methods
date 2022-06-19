import { setup, windowEndpoint } from "../src";
import { MainAPI, SandboxAPI } from "./api";

const api: SandboxAPI = {
  sandboxGreet(name: string): string {
    return `sandboxGreet: Hello, ${name}`;
  },
  async sandboxGreetAsync(name: string): Promise<string> {
    return `sandboxGreetAsync: Hello, ${name}`;
  },
};

const mainAPI = setup<MainAPI>(api, windowEndpoint(window.parent!));

console.log(await mainAPI.mainGreet("Sandbox"));
console.log(await mainAPI.mainGreetAsync("Sandbox"));
