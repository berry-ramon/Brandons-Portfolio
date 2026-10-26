export const CONTACT={phoneDisplay:"0758 170 917",phoneTel:"+254758170917",waNumber:"254758170917",email:"info@brandonkimathi.top"} as const;
const strip=(s:string)=>s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,"").trim();
export interface ContactForm{name:string;email?:string;phone?:string;topic:string;message:string}
export function buildMessage(f:ContactForm){return [`Hello Brandon, my name is ${strip(f.name)}.`,`Topic: ${strip(f.topic)}`,"",strip(f.message),"",f.phone?`Phone: ${strip(f.phone)}`:"",f.email?`Email: ${strip(f.email)}`:""].filter((l,i,a)=>!(l===""&&a[i-1]==="")).join("\n").trim()}
export const whatsappUrl=(text:string)=>`https://wa.me/${CONTACT.waNumber}?text=${encodeURIComponent(text)}`;
export const mailtoUrl=(subject:string,body:string)=>`mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
