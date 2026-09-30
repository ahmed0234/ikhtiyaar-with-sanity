import {LegalPage} from "@/components/legal-page";
import {pageMeta} from "@/lib/seo";
export const metadata=pageMeta("Cookie Policy","Your choices about optional third-party content.","/cookies");
export default function Page(){return <LegalPage kind="cookies"/>}
