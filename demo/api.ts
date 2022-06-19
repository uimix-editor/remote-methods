export interface SandboxAPI {
  sandboxGreet(name: string): string;
  sandboxGreetAsync(name: string): Promise<string>;
}

export interface MainAPI {
  mainGreet(name: string): string;
  mainGreetAsync(name: string): Promise<string>;
}
