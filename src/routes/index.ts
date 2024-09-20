export default defineEventHandler((event) => {
  const destination = getQuery<{ destination?: string }>(event).destination;
  if (destination) {
    return sendRedirect(
      event,
      `/${encodeURIComponent(destination.replace(/^(https?:\/\/)/, ""))}`,
      302,
    );
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>URL Redirect</title>
  <style>
    body {
      background-color: #000000;
      color: #ffffff;
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }

    .container {
      text-align: center;
    }

    input[type="url"] {
      width: 100%;
      max-width: 500px;
      padding: 10px;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      background-color: #333;
      color: #ffffff;
      margin-top: 20px;
    }

    input[type="url"]:focus {
      outline: none;
      border: 1px solid #555;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Enter a URL</h1>
    <form id="urlForm">
      <input type="url" id="urlInput" placeholder="https://example.com" required>
    </form>
  </div>

  <script>
    document.getElementById('urlForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const inputValue = document.getElementById('urlInput').value;
      if (inputValue) {
        window.location.href = 'https://lameproxy.lfdev.site/\${inputValue}';
      }
    });
  </script>
</body>
</html>

  `;
});
