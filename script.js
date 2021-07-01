
$(document).ready(function() {
  checkSessionValidity();
  getContactCampaign();
  function checkSessionValidity() {
      if (getCookie("IsActive") == null || getCookie("IsActive") == "") {
          console.log("Session Expired");
          window.location.replace("./login.html");
      }
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
});
		$('#calendar').fullCalendar(
      {

      let getToday = getCurrentDate();
      let calArray = getContactCampaign();

			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,basicWeek,basicDay'
			},
			defaultDate: todayDate,
			navLinks: true, // can click day/week names to navigate views
			editable: true,
			eventLimit: true, // allow "more" link when too many events

      events: [
    				{
    					title: 'All Day Event',
    					start: '2016-12-01'
    				},
    				{
    					title: 'Long Event',
    					start: '2016-12-07',
    					end: '2016-12-10'
    				},
    				{
    					id: 999,
    					title: 'Repeating Event',
    					start: '2016-12-09T16:00:00'
    				},
    				{
    					id: 999,
    					title: 'Repeating Event',
    					start: '2016-12-16T16:00:00'
    				},
    				{
    					title: 'Conference',
    					start: '2016-12-11',
    					end: '2016-12-13'
    				},
    				{
    					title: 'Meeting',
    					start: '2016-12-12T10:30:00',
    					end: '2016-12-12T12:30:00'
    				},
    				{
    					title: 'Lunch',
    					start: '2016-12-12T12:00:00'
    				},
    				{
    					title: 'Meeting',
    					start: '2016-12-12T14:30:00'
    				},
    				{
    					title: 'Happy Hour',
    					start: '2016-12-12T17:30:00'
    				},
    				{
    					title: 'Dinner',
    					start: '2016-12-12T20:00:00'
    				},
    				{
    					title: 'Birthday Party',
    					start: '2016-12-13T07:00:00'
    				},
    				{
    					title: 'Click for Google',
    					url: 'https://google.com/',
    					start: '2016-12-28'
    				}
    			]
      }

    }




    } );
