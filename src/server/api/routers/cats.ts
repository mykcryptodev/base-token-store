import fetch from "node-fetch";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const catsRouter = createTRPCRouter({
  getCatPic: publicProcedure
    .query(async () => {
      const textOptions = [
        "Henlo",
        "Meow",
        "do me a pet",
        "hai fren",
        "hai",
        "Oh noez!",
        "I can haz cheezburger?",
        "I can haz base token?",
        "wen salami?",
        "wen moon?",
        "wen lambo?",
        "wen catnip?",
      ] as const;
      const randomText = textOptions[Math.floor(Math.random() * textOptions.length)];
      const urlEncodedText = encodeURIComponent(randomText!);
      const params = new URLSearchParams({
        font: "Impact",
        fontSize: "72",
        fontColor: "#FFFFFF",
        fontBackground: "#000000",
        position: "center",
      }).toString();
    
      const catRes = await fetch(`https://cataas.com/cat/says/${urlEncodedText}?${params}`);
      const catArrayBuffer = await catRes.arrayBuffer();
      const catImage = Buffer.from(catArrayBuffer);
      return `data:${catRes.headers.get('content-type')};base64,${catImage.toString('base64')}`;
    }),
});