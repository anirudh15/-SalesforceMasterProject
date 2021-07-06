// for (var i = 0; i < vArray2.length; i++) {
//   let campDate = newArray[i][1];
//   var dd = String(campDate.getDate()).padStart(2, '0');
//   var mm = String(campDate.getMonth() + 1).padStart(2, '0');
//   var yyyy = campDate.getFullYear();
//   campDate = yyyy + '/' + mm + '/' + dd;
// }
window.onload = function () {
    console.log(getContactCampaign());

}
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

      let campaignIdList = await fetch("https://eilireland.my.salesforce.com/services/data/v25.0/query?q=select+contact.name,campaignId+from+CampaignMember+where+contact.email" = :userEmail,{
        method: "GET",
        mode: 'cors',
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            "Authorization": "Bearer " + await getToken()
        }
      });

    campaignIdListResponse = await campaignIdList.json();
    //console.log(JSON.stringify(campaignIdListResponse));
     console.log(campaignIdListResponse);

    for (let i = 0; i < campaignIdListResponse["totalSize"]; i++) {
        vArray.push([campaignIdListResponse["records"]["name"]["campaignId"]]);

    }
    console.log((vArray));

    let campaignNameList = await fetch("https://eilireland.my.salesforce.com/services/data/v25.0/query?q=select+name,StartDate+from+campaign+where+id+in+("+vArray+")", {
      method: "GET",
      mode: 'cors',
      headers: {
          "Content-type": "application/json;charset=UTF-8",
          "Authorization": "Bearer " + await getToken()
      }
    });

    campaignNameListResponse = await campaignNameList.json();
    //console.log(JSON.stringify(campaignListResponse));
    console.log(campaignNameListResponse);

    for (let i = 0; i < campaignNameListResponse["totalSize"]; i++) {
       //const campaigns = campaignNameListResponse
      vArray2.push([campaignNameListResponse["name"]["StartDate"]]);

      // let demosArray = []
      // campaigns.forEach((campaign) => {
      //   const eventObject = {
      //     id: i,
      //     content: campaign.name,
      //     date: ,
      //     source: ""
      //   }

        // demosArray.push(eventObject);
      }
console.log(vArray2);
      // initCalender(demosArray);
//loader-offset//
//load-data-in-demo
  //   }
  // return vArray2;
  }
