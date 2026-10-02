import { stegaClean } from "@sanity/client/stega";

export interface ClientLogoItem {
  _key?: string;
  name: string;
  logoUrl?: string;
  logo?: any;
  src?: string;
  style?: string;
}

export interface ClientLogosProps {
  heading?: string;
  logos?: ClientLogoItem[];
}

const defaultLogos: ClientLogoItem[] = [
  { name: "Ridgewell Landscape & Design", src: "/clients/ridgewell.png", style: "ridgewell" },
  { name: "Casey Insurance Group", src: "/clients/casey-transparent.png", style: "casey" },
  { name: "Beckon Homes", src: "/clients/beckon-transparent.png", style: "beckon" },
  { name: "Swisher Capital", src: "/clients/swisher.png", style: "swisher" },
];

export function ClientLogos({ heading, logos }: ClientLogosProps = {}) {
  const items = Array.isArray(logos) && logos.length > 0 ? logos : defaultLogos;

  return (
    <section className="client-band" aria-label="Clients we have worked with">
      <div className="container">
        <p>{heading || "GOOD BUSINESSES. REAL WORK TO SHOW FOR IT."}</p>
        <div className="client-logos refreshed-logos">
          {items.map((c, idx) => {
            const imgSrc =
              (c.logoUrl ? stegaClean(c.logoUrl) : "") ||
              c.src ||
              defaultLogos[idx % defaultLogos.length]?.src ||
              "/clients/ridgewell.png";
            const styleClass = c.style || defaultLogos[idx % defaultLogos.length]?.style || "";

            return (
              <div key={c._key || c.name || idx}>
                <div className={"client-logo-art " + styleClass}>
                  <img src={imgSrc} alt={c.name} loading="lazy" />
                </div>
                <span>{c.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

