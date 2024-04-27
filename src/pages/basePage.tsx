export const BasePage = (body: JSX.Element): JSX.Element => {
  return (
    <html lang="en">
      <head>
        <title>Hello World</title>
        <link type="text/css" rel="stylesheet" href="../public/output.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://unpkg.com/htmx.org@1.9.12"></script>
      </head>
      <body>{body}</body>
    </html>
  );
};
