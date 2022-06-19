interface SandboxAPI {
  greet(name: string): string;
  greetAsync(name: string): Promise<string>;
}

interface MainAPI {
  greet(name: string): string;
  greetAsync(name: string): Promise<string>;
}
