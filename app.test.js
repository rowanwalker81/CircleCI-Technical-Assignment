if (typeof TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// Import the testing library
const { JSDOM } = require('jsdom');

describe("HTML Content and Button Functionality", () => {
  let dom;
  let document;

  beforeEach(() => {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Welcome App</title>
      </head>
      <body>
        <h1>CircleCi</h1>
        <button onclick="showMessage()">SUBMIT</button>
        <div id="message"></div>
        <script>
          function showMessage() {
            document.getElementById('message').textContent = 'Welcome to my app!';
          }
        </script>
      </body>
      </html>
    `;
    dom = new JSDOM(htmlContent, { runScripts: 'dangerously' });
    document = dom.window.document;
  });

  test("should display the correct message when button is clicked", () => {
    const button = document.querySelector("button");
    const messageDiv = document.getElementById("message");

    expect(messageDiv.textContent).toBe("");
    button.click();
    expect(messageDiv.textContent).toBe("Welcome to my app!");
  });
});
