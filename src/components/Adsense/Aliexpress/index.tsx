import { useContext, useEffect, useState } from "react";
import * as Styles from "./styles";
import { SearchContext } from "../../../contexts/searchContext";

type Ad = {
  link: string;
  imageUrl: string;
};

const ads: Ad[] = [
  {
    link: "https://s.click.aliexpress.com/e/_DkXoAkT?bz=120*600",
    imageUrl:
      "https://ae01.alicdn.com/kf/H062aa544483743cbab681f4bcba0dcfbf.jpg",
  },
  {
    link: "https://s.click.aliexpress.com/e/_DeOLQLD?bz=120*600",
    imageUrl:
      "https://ae01.alicdn.com/kf/S1f0142a868604ba3beb82473818aaf17s.png",
  },
  {
    link: "https://s.click.aliexpress.com/e/_DcA2xXV?bz=120*600",
    imageUrl:
      "https://ae01.alicdn.com/kf/Sdf013b23915c4cf0b39946954f2dfef8X.png",
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
    <Styles.Banner href={ad.link} target="parent">
      <Styles.BannerImage width="120" src={ad.imageUrl} />
    </Styles.Banner>
  );
}
