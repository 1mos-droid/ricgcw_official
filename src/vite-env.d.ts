/// <reference types="vite/client" />

declare module '*&as=picture' {
  const src: {
    sources: Record<string, string>;
    img: {
      src: string;
      w: number;
      h: number;
    };
  };
  export default src;
}
