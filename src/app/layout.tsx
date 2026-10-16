import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
const heksilo=localFont({src:'../../public/fonts/heksilo.ttf',variable:'--font-display',display:'swap'});
const abel=localFont({src:'../../public/fonts/acumin.ttf',variable:'--font-body',weight:'400',display:'swap'});
export const metadata: Metadata={title:'Marlin Eco Resort | Stay in Himchori, Cox’s Bazar',description:'Explore Marlin Eco Resort on Himchori Marine Drive and enquire about a coastal cottage stay.',icons:{icon:'/brand/mark.png'}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body className={`${heksilo.variable} ${abel.variable}`}>{children}</body></html>}
