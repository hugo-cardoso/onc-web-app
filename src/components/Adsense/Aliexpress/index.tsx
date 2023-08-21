import { useContext, useEffect, useState } from "react";
import * as Styles from "./styles";
import { SearchContext } from "../../../contexts/searchContext";

type Ad = {
  link: string;
  imageUrl: string;
};

const ads: Ad[] = [
  {
    link: "https://s.click.aliexpress.com/e/_DEepzBD?bz=120*600",
    imageUrl:
      "https://ae01.alicdn.com/kf/S634b3dcfcb104d99bbf86ee1b753bed5y.jpg",
  },
  {
    link: "https://s.click.aliexpress.com/e/_DDosDs3?bz=120*600",
    imageUrl:
      "https://ae01.alicdn.com/kf/S9d21d1f1b6b345209b041e5c349a2d52A.png",
  },
  {
    link: "https://s.click.aliexpress.com/e/_Dl87QkR?bz=120*600",
    imageUrl:
      "https://ae01.alicdn.com/kf/S81341a66271044179494cc988731c427d.jpg",
  },
];

export function AdsenseAliExpress() {
  const [ad, setAd] = useState<Ad | null>(null);
  const searchContext = useContext(SearchContext);

  useEffect(() => {
    setAd(ads[Math.floor(Math.random() * ads.length)]);
  }, [searchContext.icao, searchContext.activeProcedure]);

  if (!ad) return null;

  return (
    <Styles.Banner href={ad.link} target="_parent">
      <Styles.BannerImage width="120" height="600" src={ad.imageUrl} />
    </Styles.Banner>
  );
}
