import { NextResponse } from "next/server";
const allowedTrades = new Set(["Landscaping & hardscaping","Roofing","Remodeling","Concrete & paving","Moving","Other home services"]);
export async function POST(request: Request) {
 const origin = request.headers.get("origin");
 if (origin && origin !== new URL(request.url).origin) return NextResponse.json({error:"Invalid request"},{status:403});
 const bodyText = await request.text();
 if (bodyText.length > 6000) return NextResponse.json({error:"Request too large"},{status:413});
 let body: Record<string,unknown>;
 try{body=JSON.parse(bodyText)}catch{return NextResponse.json({error:"Invalid request"},{status:400})}
 if(body.website_url) return NextResponse.json({error:"Unable to submit"},{status:400});
 const values:Record<string,string>={};
 for(const key of ["firstName","lastName","email","phone","city","company","trade"]){
  const v=body[key]; if(typeof v!=="string"||!v.trim()||v.length>200) return NextResponse.json({error:"Please check your details"},{status:400});
  values[key]=v.trim();
 }
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)||values.phone.replace(/\D/g,"").length<7||!allowedTrades.has(values.trade)) return NextResponse.json({error:"Please check your details"},{status:400});
 const payload={firstName:values.firstName,lastName:values.lastName,email:values.email,phone:values.phone,subject:`Business inquiry: ${values.company}`,website:"",message:`I'd like to discuss bringing in more work.\n\nBusiness: ${values.company}\nTrade: ${values.trade}\nCity / service area: ${values.city}\n\nSubmitted through the Ikhtiyaar website.`};
 try{
  const response=await fetch("https://ikhtiyaarbackend.vercel.app/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload),signal:AbortSignal.timeout(15000)});
  if(!response.ok) return NextResponse.json({error:"Unable to send right now"},{status:502});
  return NextResponse.json({ok:true});
 }catch{return NextResponse.json({error:"Unable to send right now"},{status:502})}
}
