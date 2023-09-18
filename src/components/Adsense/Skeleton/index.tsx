import * as Styles from "./styles";

export function AdsenseSkeleton() {
  const LINK = "https://forms.gle/AdqTrhhRCPeQrKbo8";
  const IMAGE = "https://placehold.co/120x600?text=Anuncie+Aqui";

  function handleClick() {
    window.gtag("event", "click_adsense_contact", {});
  }

  return (
    <Styles.Banner href={LINK} target="_blank" onClick={() => handleClick()}>
      <Styles.BannerImage src={IMAGE} />
    </Styles.Banner>
  );
}
