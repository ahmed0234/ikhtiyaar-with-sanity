import {LegalPage} from "@/components/legal-page";
import {pageMeta} from "@/lib/seo";
export const metadata=pageMeta("Privacy Policy","How Ikhtiyaar LLC handles information collected through this website.","/privacy");
export default function Page(){return <LegalPage kind="privacy"/>}
