import './globals.css';
export const metadata = {
  title: 'Alderwood Ponds | Coarse Fishery in Steyning, West Sussex',
  description:
    'Alderwood Ponds Coarse Fishery official information site with fish sizes, prices, rules, night fishing, shelters, camping, and angler information.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
