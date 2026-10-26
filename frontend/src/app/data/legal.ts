export interface LegalSection{id:string;heading:string;body:string[]}
export const termsSections:LegalSection[]=[
  {id:"terms-about",heading:"1. About these terms",body:['This website is run by Brandon Kimathi ("I", "me") in Kenya. By using it you agree to these terms.']},
  {id:"terms-use",heading:"2. Using this website",body:["You may browse and share links for lawful purposes. You must not misuse, break or overload this site."]},
  {id:"terms-enquiries",heading:"3. Messages and enquiries",body:["Sending a message does not create a contract. Paid work needs a separate written agreement."]},
  {id:"terms-ip",heading:"4. Ownership of content",body:["The text, design and images belong to me unless stated otherwise. Free tools use the licenses in their GitHub repositories."]},
  {id:"terms-third",heading:"5. Other websites",body:["Other businesses own their sites, brands and content. I am not responsible for what they publish."]},
  {id:"terms-tools",heading:"6. Free tools",body:["Free tools are provided as they are, without a promise that they will always be available."]},
  {id:"terms-liability",heading:"7. Limits of liability",body:["To the extent the law allows, I am not liable for loss from using this site or its free tools."]},
  {id:"terms-law",heading:"8. Governing law",body:["These terms are governed by the laws of Kenya."]},
  {id:"terms-images",heading:"9. Image credits",body:["Illustrative photos are from Unsplash. Current photos include work by Clay Banks, Luca Bravo, Duskfall Crew, Jonathan Roger and Cht Gsml."]},
];
export const privacySections:LegalSection[]=[
  {id:"privacy-who",heading:"1. Who I am",body:["I am Brandon Kimathi, the person responsible for this website."]},
  {id:"privacy-collect",heading:"2. What I collect",body:["The contact form prepares a message that you send through WhatsApp or email. This website does not store it."]},
  {id:"privacy-use",heading:"3. How I use it",body:["I use your message to reply and discuss your request. I do not sell your data."]},
  {id:"privacy-share",heading:"4. Who else sees it",body:["Messages pass through WhatsApp or your email provider. The site is hosted on Vercel."]},
  {id:"privacy-cookies",heading:"5. Cookies and analytics",body:["Analytics is off by default. Theme choices may be saved on your device."]},
  {id:"privacy-images",heading:"6. Images",body:["Some illustrative images load from Unsplash servers. Unsplash may receive technical details such as your IP address."]},
  {id:"privacy-rights",heading:"7. Your rights",body:["Under Kenya's Data Protection Act, 2019, you may ask to see, correct or delete your data."]},
];
