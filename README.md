# remote-methods

[![npm version](https://badge.fury.io/js/remote-methods.svg)](https://badge.fury.io/js/remote-methods)

Call remote methods through message-based communication (for sandboxed iframes etc)

It allows you to handle postMessage-based communication in more intuitive ways than using `window.postMessage` directly.

## Features

- Abstracts postMessage-based communication to method calls
- Does not depend on initialization timing
  - `remote-methods` automatically detects the initialization of the opposite side and establishes communication (like the 3-way handshake)
- Simpler implementation than https://github.com/GoogleChromeLabs/comlink
- Supports any sort of message-based communication
  - iframes, web workers, Electron IPC, VS Code webviews, etc

## Usage

### Example (iframe)

#### Parent window

```ts
import { setup, windowEndpoint, Remote } from "remote-methods";

const targetIframe = document.querySelector("iframe")!;

const api: MainAPI = {
  mainGreet(name: string): string {
    return `mainGreet: Hello, ${name}`;
  },
  async mainGreetAsync(name: string): Promise<string> {
    return `mainGreetAsync: Hello, ${name}`;
  },
};

const sandboxAPI: Remote<SandboxAPI> = setup<SandboxAPI>(
  api,
  windowEndpoint(targetIframe.contentWindow!)
);

console.log(await sandboxAPI.sandboxGreet("Main"));
console.log(await sandboxAPI.sandboxGreetAsync("Main"));
```

#### Child window

```ts
import { setup, windowEndpoint, Remote } from "remote-methods";

const api: SandboxAPI = {
  sandboxGreet(name: string): string {
    return `sandboxGreet: Hello, ${name}`;
  },
  async sandboxGreetAsync(name: string): Promise<string> {
    return `sandboxGreetAsync: Hello, ${name}`;
  },
};

const mainAPI: Remote<MainAPI> = setup<MainAPI>(
  api,
  windowEndpoint(window.parent!)
);

console.log(await mainAPI.mainGreet("Sandbox"));
console.log(await mainAPI.mainGreetAsync("Sandbox"));
```

#### Common type definitions

```ts
export interface SandboxAPI {
  sandboxGreet(name: string): string;
  sandboxGreetAsync(name: string): Promise<string>;
}

export interface MainAPI {
  mainGreet(name: string): string;
  mainGreetAsync(name: string): Promise<string>;
}
```

### Implementing own endpoints

```ts
interface Endpoint {
  addEventListener(listener: (data: any) => void): () => void;
  postMessage(data: any): void;
}
```

```ts
import { Endpoint } from "remote-methods";

const myEndpoint: Endpoint = {
  addEventListener(listener: (data: any) => void): () => void {
    ...
    return disposeFunction
  },
  postMessage(data: any): void {
    ...
  }
};

const remoteAPI = setup<RemoteAPI>(api, myEndpoint);
```

## TODO

- [ ] Disconnecting
- [ ] Support callbacks
- [ ] Transferables
