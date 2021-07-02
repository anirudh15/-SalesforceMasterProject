// demo data for events
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getCurrentDate() {
    let currentDate = new Date();
    var dd = String(currentDate.getDate()).padStart(2, '0');
    var mm = String(currentDate.getMonth() + 1).padStart(2, '0');
    var yyyy = currentDate.getFullYear();
    currentDate = yyyy + '-' + mm + '-' + dd;
    return currentDate;
}

async function getToken() {
    let response = await fetch("https://login.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9fTLmJ60pJ5LcM88X.T4cnlgFI6sTtiU0_tQwwMuyjIocVl289zYxysWrm45Y9JSHF0f55z.1SJoYFpkQ&client_secret=E2D30FFD226F098FDC26D1A0FA58581717B97678E30559C77F55C092B7899361&username=project2@eilireland.org&password=Secureit123AYfrE3tYJC7OVZtTEg0hgDkI", {
        method: "POST",
        mode: 'cors',
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
        },
    });

    let data = await response.json();
    return await data["access_token"];
}
async function getContactCampaign(){

  let vArray = [];
  let vArray2 = [];
  let userEmail = getCookie("Id");

    let campaignIdList = await fetch("https://eilireland.my.salesforce.com/services/data/v25.0/query?q=select+name,campaignId+from+CampaignMember+where+email="+userEmail, {
      method: "GET",
      mode: 'cors',
      headers: {
          "Content-type": "application/json;charset=UTF-8",
          "Authorization": "Bearer " + await getToken()
      }
    });

  campaignIdListResponse = await campaignIdList.json();
  for (let i = 0; i < campaignIdListResponse["totalSize"]; i++) {
      vArray.push([campaignIdListResponse["records"]["name"]["campaignId"]]);

  }

  let campaignNameList = await fetch("https://eilireland.my.salesforce.com/services/data/v25.0/query?q=select+name,StartDate+from+campaign+where+id+in+("+vArray+")", {
    method: "GET",
    mode: 'cors',
    headers: {
        "Content-type": "application/json;charset=UTF-8",
        "Authorization": "Bearer " + await getToken()
    }
  });

  campaignNameListResponse = await campaignNameList.json();
  for (let i = 0; i < campaignNameListResponse["totalSize"]; i++) {
    vArray2.push([campaignListResponse["name"]["StartDate"]]);

  }
return vArray2;
}

let demo = [
  for (var i = 0; i < vArray2.length; i++) {
    for (var j = 1; j < vArray2[i].length; i++) {

      {
        id: "xvblk",
        date: vArray2[][j],
        content: vArray2[i][],
        source: "http://salesforce.com" },

  }
}
];



let today = new Date(),
currentMonth = today.getMonth(),
currentYear = today.getFullYear();

// array dias de la semana
const weekdays = [
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday",
"Sunday"];

// array meses
const months = [
"JANUARY",
"FEBRUARY",
"MARCH",
"APRIL",
"MAY",
"JUNE",
"JULY"
"AUGUST",
"SEPTEMBER",
"OCTOBER",
"NOVEMBER",
"DECEMBER"];


// structure
let structureCalendar = createElement("div", window.root, {
  id: "structureCalendar" }),

// header
calendarHeader = createElement("header", structureCalendar, {}),
// header columns left center and right
headerLeft = createElement("div", calendarHeader, { className: "left" }),
headerCenter = createElement("div", calendarHeader, { className: "center" }),
headerRight = createElement("div", calendarHeader, { className: "right" }),
// inside left column
buttonPrev = createElement("button", headerLeft, { textContent: "Anterior" }),
buttonNext = createElement("button", headerLeft, { textContent: "Siguiente" }),
centerTitle = createElement("h1", headerCenter, {
  textContent: months[currentMonth] + " " + currentYear }),

// calendar body
calendarBody = createElement("div", structureCalendar, { id: "calendar" }),
weekdayBody = createElement("ul", calendarBody, { id: "weekdays" }),
daysBody = createElement("ul", calendarBody, { id: "days" });

// init calendar
showCalendar(currentMonth, currentYear);

// map week days
weekdays.map((item, i) =>
// change to monday
today.getDay() - 1 == i ?
createElement("li", weekdayBody, { className: "today", textContent: item }) :
createElement("li", weekdayBody, { textContent: item }));


// buttons next prev
buttonPrev.onclick = () => prev();
buttonNext.onclick = () => next();

// generate calendar
function showCalendar(month, year) {
  // first day - 1
  let firstDay = new Date(year, month).getDay() - 1;

  // clear preview content
  daysBody.textContent = "";

  // filing data about month and in the page via DOM.
  centerTitle.textContent = months[month] + " " + year;

  // creating all cells
  let date = 1;
  for (let i = 0; i < 6; i++) {
    //creating individual cells, filing them up with data.
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        createElement("li", daysBody, { textContent: "" });
      } else if (date > daysInMonth(month, year)) {
        break;
      } else {
        let li = createElement("li", daysBody, {}),
        info = createElement("div", li, {
          className: "info",
          textContent: weekdays[j] }),

        div = createElement("div", li, { className: "date", textContent: date });
        // ----------------------------
        // ----- view events
        if (typeof demo !== "undefined") {
          viewEvents(demo, li, [year, month, date]);
        }
        // ----------------------------
        if (
        date === today.getDate() &&
        year === today.getFullYear() &&
        month === today.getMonth())
        {
          li.className = "today";
        }
        date++;
      }
    }
  }
}
// view events
function viewEvents(data, where, args) {
  return (
    data &&
    data.map(item => {
      let date = item.date.split("/"),
      year = parseInt(date[0]),
      month = parseInt(date[1]) - 1,
      day = parseInt(date[2]);

      if (year === args[0] && month === args[1] && day === args[2]) {
        let event = createElement("div", where, { className: "ev", id: item.id }),
        eventDesc = createElement("div", event, { className: "ev-desc" });
        eventDesc.innerHTML = `<a href="${item.source}">${item.content}</a>`;
        event.onclick = () => alert(eventDesc.textContent);
      }
    }));

}

// next month
function next() {
  currentMonth = (currentMonth + 1) % 12;
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  showCalendar(currentMonth, currentYear);
}
// previus month
function prev() {
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  showCalendar(currentMonth, currentYear);
}
// check how many days in a month code from
// https://dzone.com/articles/determining-number-days-month
function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}
// --- Create element
function createElement(element, where, args) {
  let d = document.createElement(element);
  if (args) for (const [k, v] of Object.entries(args)) d[k] = v;
  where.appendChild(d);
  return d;
}
