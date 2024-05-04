export const BasePage = (body: JSX.Element): JSX.Element => {
  return (
    <html lang="en">
      <head>
        <title>AlkisKalkis - En økonomisk rus</title>
        <style>[x-cloak] {`{ display: none !important;}`}</style>
        <link type="text/css" rel="stylesheet" href="../public/output.css"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <script src="https://unpkg.com/htmx.org@1.9.12" defer></script>
        <script src="https://unpkg.com/alpinejs" defer></script>
      </head>
      <body>{body}</body>
    </html>
  );
};
