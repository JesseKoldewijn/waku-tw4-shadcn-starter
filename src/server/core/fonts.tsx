import { getContext } from "waku/server";

const Fonts = () => {
  const ctx = getContext();

  const browser = ctx?.browser as string;
  const ue = ctx?.ue as string;

  return (
    <>
      <link rel="preconnect" href="/" crossOrigin="anonymous" />
      <FontMapping ue={ue} browser={browser} />
    </>
  );
};

export default Fonts;

export const fonts = {
  geist: [
    {
      src: "/fonts/geist/Geist-Variable.woff2",
      type: "font/woff2",
      variable: true,
    },
    {
      src: "/fonts/geist/Geist-Variable.ttf",
      type: "font/woff2",
      variable: true,
    },
    {
      src: "/fonts/geist/Geist-Regular.woff2",
      type: "font/woff2",
      variable: false,
    },
    {
      src: "/fonts/geist/Geist-Regular.ttf",
      type: "font/woff2",
      variable: false,
    },
  ],
  inter: [
    {
      src: "/fonts/inter/Inter-Variable.woff2",
      type: "font/woff",
      variable: true,
    },
    {
      src: "/fonts/inter/Inter-Variable.ttf",
      type: "font/woff",
      variable: true,
    },
    {
      src: "/fonts/inter/Inter-Regular.woff2",
      type: "font/woff",
      variable: false,
    },
    {
      src: "/fonts/inter/Inter-Regular.ttf",
      type: "font/woff",
      variable: false,
    },
  ],
} as const;

const FontMapping = ({ browser, ue }: { browser: string; ue: string }) => {
  const fontsNames = Object.keys(fonts);

  const fonstMap = fontsNames.map((font) => {
    const data = fonts[font as keyof typeof fonts];

    return data.map((fontData, index) => {
      const fileType = fontData.type;

      const isIE = browser === "ie" || browser === "edge";
      const ieByRegex = /MSIE|Trident/.test(ue);

      const isOperaMini = browser === "op_mini";
      const isOperaMiniByRegex = /Opera Mini/.test(ue);

      const supportVariable =
        !isIE && !isOperaMini && !ieByRegex && !isOperaMiniByRegex;

      const supportsFileType =
        (fileType === "font/woff2" || fileType === "font/woff") &&
        supportVariable;

      const canPreload =
        supportsFileType && supportVariable && fontData.variable;

      return (
        <link
          key={index}
          rel={canPreload ? "font preload prefetch" : "font prefetch"}
          as="font"
          type={fontData.type}
          href={fontData.src}
          crossOrigin="anonymous"
        />
      );
    });
  });

  const fonstMapFiltered = fonstMap.map((font) => {
    return font.map((link, idx) => {
      const isPreloaded = link.props?.rel === "preload";

      const isFirstPreloadOfFontName = idx === 0 && isPreloaded;

      if (isFirstPreloadOfFontName) {
        return link;
      }

      return {
        ...link,
        props: {
          ...link.props,
          rel: "prefetch",
        },
      };
    });
  });

  return fonstMapFiltered;
};
