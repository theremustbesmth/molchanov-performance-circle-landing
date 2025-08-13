export const metadata = {
  title: 'Molchanov Performance Circle',
  description: 'Private breathwork & performance circle by Alexey Molchanov',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
