var url = window.location.href;
var urll = new URL(url);
var c = urll.searchParams.get("id");

var xhttp = new XMLHttpRequest();
xhttp.open("GET", `https://publichtml/hdlrequest.php?request=3&id=${c}`, true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
let body = document.querySelector("body");
let container = document.createElement("div");
container.classList.add("container-fluid");
body.appendChild(container);
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {

    try {
      var response = JSON.parse(this.responseText);
      let val = response[0].value.replaceAll('""', '"'); //? for prevent error in parsing with two double quotes nextonext
      const usableRes = JSON.parse(val);
 
    
  
      usableRes.map((item) => {
        try {
          let main = document.createElement("div");
          // main.classList.add("row");
          main.classList.add("main-row");
          let col = document.createElement("div");

          let domainNametitle = document.createElement("span");
          domainNametitle.innerText = "domain name";
          let domainNameInput = document.createElement("input");
          domainNameInput.value = item.domain;

          col.appendChild(domainNametitle);
          col.appendChild(domainNameInput);
          col.classList.add('item-frame')
          main.appendChild(col);

          col = document.createElement("div");
          let expirationDateTitle = document.createElement("span");
          expirationDateTitle.innerText = "expirationDate";
          let expirationDateInput = document.createElement("input");
          expirationDateInput.value = item.expirationDate;

          col.appendChild(expirationDateTitle);
          col.appendChild(expirationDateInput);
          col.classList.add('item-frame')
          main.appendChild(col);

          col = document.createElement("div");
          let hostOnlyTitle = document.createElement("span");
          hostOnlyTitle.innerText = "hostOnly";
          let hostOnlyInput = document.createElement("input");
          hostOnlyInput.value = item.hostOnly;

          col.appendChild(hostOnlyTitle);
          col.appendChild(hostOnlyInput);
          col.classList.add('item-frame')
          main.appendChild(col);

          col = document.createElement("div");
          let httpOnlyTitle = document.createElement("span");
          httpOnlyTitle.innerText = "httpOnly";
          let httpOnlyInput = document.createElement("input");
          httpOnlyInput.value = item.httpOnly;

          col.appendChild(httpOnlyTitle);
          col.appendChild(httpOnlyInput);
          col.classList.add('item-frame')
          main.appendChild(col);
    

          col = document.createElement("div");
          let nameTitle = document.createElement("span");
          nameTitle.innerText = "name";
          let nameInput = document.createElement("input");
          nameInput.value = item.name;

          col.appendChild(nameTitle);
          col.appendChild(nameInput);
          col.classList.add('item-frame')
          main.appendChild(col);


          col = document.createElement("div");
          let pathTitle = document.createElement("span");
          pathTitle.innerText = "path";
          let pathInput = document.createElement("input");
          pathInput.value = item.path;

          col.appendChild(pathTitle);
          col.appendChild(pathInput);
          col.classList.add('item-frame')
          main.appendChild(col);



          col = document.createElement("div");
          let sameSiteTitle = document.createElement("span");
          sameSiteTitle.innerText = "sameSite";
          let sameSiteInput = document.createElement("input");
          sameSiteInput.value = item.sameSite;

          col.appendChild(sameSiteTitle);
          col.appendChild(sameSiteInput);
          col.classList.add('item-frame')
          main.appendChild(col);

          col = document.createElement("div");
          let secureTitle = document.createElement("span");
          secureTitle.innerText = "secure";
          let secureInput = document.createElement("input");
          secureInput.value = item.secure;

          col.appendChild(secureTitle);
          col.appendChild(secureInput);
          col.classList.add('item-frame')
          main.appendChild(col);

          col = document.createElement("div");
          let sessionTitle = document.createElement("span");
          sessionTitle.innerText = "session";
          let sessionInput = document.createElement("input");
          sessionInput.value = item.session;

          col.appendChild(sessionTitle);
          col.appendChild(sessionInput);
          col.classList.add('item-frame')
          main.appendChild(col);

          col = document.createElement("div");
          let storeIdTitle = document.createElement("span");
          storeIdTitle.innerText = "storeId";
          let storeIdInput = document.createElement("input");
          storeIdInput.value = item.storeId;

          col.appendChild(storeIdTitle);
          col.appendChild(storeIdInput);
          col.classList.add('item-frame')
          main.appendChild(col);

          col = document.createElement("div");
          let valueTitle = document.createElement("span");
          valueTitle.innerText = "value";
          let valueInput = document.createElement("input");
          valueInput.value = item.value;

          col.appendChild(valueTitle);
          col.appendChild(valueInput);
          col.classList.add('item-frame')
          main.appendChild(col);

          container.appendChild(main);

        } catch (e) {
      
        }
      });
      let allInputs = document.querySelectorAll("input");
      let allDataTitle = document.querySelectorAll("span");
      let allRow = document.querySelectorAll(".main-row");
      // console.log(y);
      allInputs.forEach((item) => {
        item.disabled = true;
      });

      const enableEdit = document.createElement("button");
      const save = document.createElement("button");

      enableEdit.innerText = "enable editing";
      save.innerText = "save";

      enableEdit.classList.add("reg-btn");
      save.classList.add("reg-btn");

      container.appendChild(enableEdit);
      container.appendChild(save);

      enableEdit.addEventListener("click", enableEditing);
      function enableEditing() {
        allInputs.forEach((item) => {
          item.disabled = false;
        });
      }
      save.addEventListener("click", saveEditedData);
 

      function saveEditedData() {
        let mainArray = []
    
        allRow.forEach((item, index) => {
          let node = [];
          let keys = [];
          let values = [];
          node.push(...item.children);
          node.forEach(item => {
            // console.log(item.children[0].innerText);
            // console.log(item.children[1].value);
            keys.push(item.children[0].innerText);
            values.push(item.children[1].value);
          })
        
          result = Object.assign(...keys.map((k, i) => ({ [k]: values[i] })));
          mainArray[index] = result;
        })
      
       // console.log(mainArray);
        //console.log(JSON.stringify(mainArray));

        var xxhttp = new XMLHttpRequest();
        xxhttp.open(
          "POST",
          `https://publichtml/hdlrequest.php?request=4&id=${c}`,
          true
        );
        xxhttp.setRequestHeader("Content-Type", "application/json");
        xxhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            // Response
            // var response = this.responseText;
            //message.innerHTML = response;
            window.location.reload();
          }
        };

        xxhttp.send(JSON.stringify(mainArray));
      

      }
    }
    catch (e) {
    
    }
  };
}
xhttp.send();



    
               
             
