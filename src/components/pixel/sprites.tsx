import { PixelSprite } from "./PixelSprite";

const hair = "#241428";
const bow = "#FF2E9A";
const skin = "#F3C2A0";
const shirt = "#3CFF9E";
const pants = "#6C7BFF";
const shoe = "#3A0A3F";

/** Restyle the avatar by editing these rows. H hair, B bow, S skin, E eyes, M shirt, P pants, K shoes. */
export function PixelAvatar({ className, title }: { className?: string; title?: string }) {
  return (
    <PixelSprite
      className={className}
      title={title}
      palette={{ H: hair, B: bow, S: skin, E: hair, M: shirt, P: pants, K: shoe }}
      rows={[
        "......BB......",
        ".....BBBB.....",
        "....HHHHHH....",
        "...HHHHHHHH...",
        "...HHEHHHEH...",
        "...HHSSSSSH...",
        "....SSSSSS....",
        "...MMMMMMMM...",
        "...MMMMMMMM...",
        "....PPPPPP....",
        "....PP..PP....",
        "....KK..KK....",
      ]}
    />
  );
}

export function PixelCat({ className }: { className?: string }) {
  return (
    <PixelSprite
      className={className}
      palette={{ O: "#F7EEFF", E: "#241428", N: "#FFB3E6", T: "#FF2E9A" }}
      rows={[
        ".OO.....OO.",
        "OOOOO.OOOOO",
        "OOEOOOOEOOO",
        "OOOOOOOOOOO",
        ".OOONNNOOO.",
        "..OOOOOOO..",
        "..TT...TT..",
        "..OO...OO..",
      ]}
    />
  );
}

export function PixelCloud({ className }: { className?: string }) {
  return (
    <PixelSprite
      className={className}
      palette={{ C: "#F7EEFF" }}
      rows={["...CCCCCC...", "..CCCCCCCC..", ".CCCCCCCCCC.", "CCCCCCCCCCCC", ".CCCCCCCCCC."]}
    />
  );
}

export function PixelStar({ className, title }: { className?: string; title?: string }) {
  return (
    <PixelSprite
      className={className}
      title={title}
      palette={{ Y: "#FFE94D" }}
      rows={["..Y..", ".YYY.", "YYYYY", ".YYY.", "..Y.."]}
    />
  );
}

export function PixelTree({ className }: { className?: string }) {
  return (
    <PixelSprite
      className={className}
      palette={{ L: "#3CFF9E", D: "#8B2CFF", T: "#3A0A3F" }}
      rows={[
        "....LLLL....",
        "...LLLLLL...",
        "..LLLLLLLL..",
        "...DDDDDD...",
        "..DDDDDDDD..",
        ".....TT.....",
        ".....TT.....",
        "....TTTT....",
      ]}
    />
  );
}

export function PixelCoin({ className }: { className?: string }) {
  return (
    <PixelSprite
      className={className}
      palette={{ Y: "#FFE94D", K: "#3A0A3F" }}
      rows={[".YYYY.", "YYKKYY", "YYKKYY", "YYKKYY", ".YYYY."]}
    />
  );
}

export function PixelKey({ className }: { className?: string }) {
  return (
    <PixelSprite
      className={className}
      palette={{ Y: "#FFE94D" }}
      rows={[".YYYY.", "Y.YY.Y", ".YYYY.", "...YY.", "...YYY"]}
    />
  );
}

export function PixelDoor({ className }: { className?: string }) {
  return (
    <PixelSprite
      className={className}
      palette={{ W: "#F3C2A0", D: "#3A0A3F", K: "#FFE94D" }}
      rows={[
        "WWWWWWWW",
        "WDDDDDDW",
        "WDDDDDDW",
        "WDDDKDDW",
        "WDDDDDDW",
        "WDDDDDDW",
        "WWWWWWWW",
      ]}
    />
  );
}

export function PixelPlant({ className }: { className?: string }) {
  return (
    <PixelSprite
      className={className}
      palette={{ L: "#3CFF9E", P: "#FF2E9A", B: "#6C7BFF" }}
      rows={["..LL.LL..", ".LLLLLLL.", "..LLLLL..", "...LLL...", "..BBBBB..", "..BBBBB..", ".BBBBBBB."]}
    />
  );
}

export function PixelLamp({ className }: { className?: string }) {
  return (
    <PixelSprite
      className={className}
      palette={{ Y: "#FFE94D", P: "#241428", M: "#3CFF9E" }}
      rows={[
        "..YYYY..",
        ".YYYYYY.",
        "..YYYY..",
        "...PP...",
        "...PP...",
        "...PP...",
        "..PPPP..",
        "..MMMM..",
      ]}
    />
  );
}

export function PixelBat({ className }: { className?: string }) {
  return (
    <PixelSprite
      className={className}
      palette={{ P: "#8B2CFF", E: "#FFE94D" }}
      rows={["P.........P", "PP.......PP", "PPP.E.E.PPP", ".PPPPPPPPP."]}
    />
  );
}

export function PixelFlag({ className }: { className?: string }) {
  return (
    <PixelSprite
      className={className}
      palette={{ P: "#FF2E9A", M: "#3CFF9E", S: "#F7EEFF" }}
      rows={["S.......", "SPPPPP..", "SPMPPP..", "SPPPPP..", "S.......", "S.......", "SSSS...."]}
    />
  );
}

export function PixelHeart({ className }: { className?: string }) {
  return (
    <PixelSprite
      className={className}
      palette={{ R: "#FF2E9A" }}
      rows={[".R.R.", "RRRRR", "RRRRR", ".RRR.", "..R.."]}
    />
  );
}
