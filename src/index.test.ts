import { describe, it, expect } from "vitest";
import { setup, Endpoint } from "./index";

describe(setup.name, () => {
  it("should call method on handler", async () => {
    const methodsA = {
      async methodA(value: number) {
        return `A: ${value}`;
      },
    };
    const methodsB = {
      methodB(value: number) {
        return `B: ${value}`;
      },
    };

    const endpointA: Endpoint = {
      addEventListener(handler: (data: any) => void): () => void {
        endpointB.postMessage = handler;
        return () => {};
      },
      postMessage(data: any) {},
    };

    const endpointB: Endpoint = {
      addEventListener(handler: (data: any) => void): () => void {
        endpointA.postMessage = handler;
        return () => {};
      },
      postMessage(data: any) {},
    };

    const a = setup<typeof methodsA>(methodsB, endpointB);

    let aReturn = "";
    void a.methodA(100).then((value) => (aReturn = value));

    await new Promise((resolve) => setTimeout(resolve, 10));

    const b = setup<typeof methodsB>(methodsA, endpointA);
    let bReturn = "";
    void b.methodB(100).then((value) => (bReturn = value));

    await new Promise((resolve) => setTimeout(resolve, 10));

    expect(aReturn).toBe("A: 100");
    expect(bReturn).toBe("B: 100");
  });
});
