window.onload = function () {
    document.getElementById("ContactPreference").addEventListener("focus", processForm);
}

function processForm() {
    let firstName = document.getElementById("FirstName").value;
    let lastName = document.getElementById("LastName").value;
    let phoneNumber = document.getElementById("PhoneNumber").value;
    let email = document.getElementById("Email").value;
    let password = document.getElementById("Password").value;
    let bio = document.getElementById("Bio").value;
    let skills = document.getElementById("Skills").value;
    let dateOfBirth = document.getElementById("DateOfBirth").value;
    let contactPreference = document.getElementById("ContactPreference").value;
    console.log(firstName);
    console.log(lastName);
    console.log(phoneNumber);
    console.log(email);
    console.log(password);
    console.log(bio);
    fetch('https://login.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9fTLmJ60pJ5LcM88X.T4cnlgFI6sTtiU0_tQwwMuyjIocVl289zYxysWrm45Y9JSHF0f55z.1SJoYFpkQ&client_secret=E2D30FFD226F098FDC26D1A0FA58581717B97678E30559C77F55C092B7899361&username=project2@eilireland.org&password=OldMonk1234auRJQemePs9mac0guNA7ZrFa', {
            mode: 'no-cors',
            method: "POST",
            headers: {
                "mode": 'no-cors',
                "Content-type": "application/json;charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
}