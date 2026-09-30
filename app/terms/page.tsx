import {LegalPage} from "@/components/legal-page";
import {pageMeta} from "@/lib/seo";
export const metadata=pageMeta("Website Terms","The terms for using this website and requesting information.","/terms");
export default function Page(){return <LegalPage kind="terms"/>}
