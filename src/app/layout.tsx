import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
const heksilo=localFont({src:'../../public/fonts/heksilo.ttf',variable:'--font-display',display:'swap'});
const acumin=localFont({src:'../../public/fonts/acumin.ttf',variable:'--font-body',weight:'100 900',display:'swap'});
export const metadata: Metadata={title:'Marlin Eco Resort — Join the first wave',description:'A new coastal escape is taking shape in Himchori, Cox’s Bazar. Join the Marlin Eco Resort launch list and be among our first guests.',icons:{icon:'/brand/mark.png'}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body className={`${heksilo.variable} ${acumin.variable}`}>{children}</body></html>}
