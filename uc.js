
function run(){
 
    // *** Tomo el dato que viene del textarea del HTML
    var x = document.getElementById('cnsl').value;
    const myArray = x.split("\n");
    //**********************************************
    
    // **** defino variables ****/
        let text = "";
        let modifiedArray = [];
        let arrayString = [];
        let d =""; //Defino la descripcion del parametro
        let a =""; //Defino el assessment del parametro.
    myArray.forEach(myFunction); 
    let jsonDataString = "[ " + modifiedArray.toString() + " ]";
    let jsonData = JSON.parse(jsonDataString);

    text = "  <hr class='my-4'> <div> <h3> Assessment Results: </h3> </div>";
    text += "<table class='table table-striped table-sm'> <thead> <tr> <th scope='col'>#</th> <th scope='col'>Parameter</th> <th scope='col'>Description</th> <th scope='col'>Value</th> <th scope='col'>Assessment</th> </tr></thead> <tbody>"
    for (x in jsonData) {
        text += "<tr><td>" + x + "</td>";
        text += "<td>" + jsonData[x].key + "</td>";
        text += "<td>" + jsonData[x].desc + "</td>";
        text += "<td>" + jsonData[x].value + "</td>";
        text += "<td>" + jsonData[x].assess + "</td></tr>";
    }
    text += "</tbody></table>"    
    document.getElementById("demo").innerHTML = text;

    // ***FUNCION myFunction ***/
    function myFunction(value) {
        let arrayOfKeyValues = value.split(' : ');
        let k = arrayOfKeyValues[0].trim();  //Nombre del parametro.
        let v = arrayOfKeyValues[1];        // valor del parametro.

        switch (k){
            case 'MinPasswordAge':
                d = "The Minimum password age policy setting determines the period of time (in days) that a password must be used before the user can change it.";
                v = moment.duration(v).asDays() +" Days";
                a = "OK";
                arrayString ='{"key": "'+k+'"'+',"value": "'+v.trim()+'","desc": "'+d+'","assess": "'+a+'"}';
                modifiedArray.push(arrayString);
                break;
            case 'LockoutDuration':
                d = "The Account lockout duration policy setting determines the number of minutes that a locked-out account remains locked out before automatically becoming unlocked.";
                v =  moment.duration(v).asMinutes() +" Minutes";
                a = "OK";
                arrayString ='{"key": "'+k+'"'+',"value": "'+v.trim()+'","desc": "'+d+'","assess": "'+a+'"}';
                modifiedArray.push(arrayString);
                break;
            case 'LockoutObservationWindow':
                d = "Reset lockout counter";
                v =  moment.duration(v).asMinutes() +" Minutes";
                a = "OK";
                arrayString ='{"key": "'+k+'"'+',"value": "'+v.trim()+'","desc": "'+d+'","assess": "'+a+'"}';
                modifiedArray.push(arrayString);
                break;
            case 'LockoutThreshold':
                d = "Number of failed logon attempts that is allowed before a user account is locked-out";
                a = (v > "0") ? "OK" :  "The account will never get locked-out. This parameter must be greater than 0 (zero)";
                arrayString ='{"key": "'+k+'"'+',"value": "'+ v + ' invalid logon attempts","desc": "'+d+'","assess": "'+a+'"}';
                modifiedArray.push(arrayString);
                break;
            case 'ComplexityEnabled':
                d = "Password Complexity";
                a = (v == "True") ? "OK" :  "Password Complexity : Disabled  <-- This setting should be set to 'True'.";
                arrayString ='{"key": "'+k+'"'+',"value": "'+ v + '","desc": "'+d+'","assess": "'+a+'"}';
                modifiedArray.push(arrayString);
                break;
            case 'MaxPasswordAge':
                d = "The Maximum password age policy setting determines the period of time (in days) that a password can be used before the system requires the user to change it.";
                v = moment.duration(v).asDays() +" Days";
                a = "OK";
                arrayString ='{"key": "'+k+'"'+',"value": "'+v.trim()+'","desc": "'+d+'","assess": "'+a+'"}';
                modifiedArray.push(arrayString);
                break;
            case 'MinPasswordLength':
                d = "Minimum number of characters a Password should contain";
                a = (v > 8 ) ? "OK" :  "Minimum number of characters a Password should be 8 or greater";
                arrayString ='{"key": "'+k+'"'+',"value": "'+ v + ' characters","desc": "'+d+'","assess": "'+a+'"}';
                modifiedArray.push(arrayString);
                break;
            case 'PasswordHistoryCount':
                d = "The Enforce password history policy setting determines the number of unique new passwords that must be associated with a user account before an old password can be reused";
                a = (v > 23 ) ? "OK" :  "Minimum number of password remembered should be 24 or greater";
                arrayString ='{"key": "'+k+'"'+',"value": "'+ v + ' Passwords Remembered","desc": "'+d+'","assess": "'+a+'"}';
                modifiedArray.push(arrayString);
                break;
            case 'ReversibleEncryptionEnabled':
                d = "Reversible encryption has the ability to decrypt the stored password";
                a = (v =="False" ) ? "OK" :  "The password is stored using reversible encryption, This should be set to False that equals to Disable";
                arrayString ='{"key": "'+k+'"'+',"value": "'+ v + '","desc": "'+d+'","assess": "'+a+'"}';
                modifiedArray.push(arrayString);
                break;
            case 'DistinguishedName':
                d = "The LDAP API references an LDAP object by its distinguished name (DN) = Domain Name.";
                a= "";
                arrayString ='{"key": "'+k+'"'+',"value": "'+ v + '","desc": "'+d+'","assess": "'+a+'"}';
                modifiedArray.push(arrayString);
                break;
            default:
                text += "";       
        }
    }
}

function clean(){
    document.getElementById('cnsl').value = "";
    document.getElementById("demo").innerHTML = "";
}

var mytext = [
"ComplexityEnabled           : True",
"DistinguishedName           : DC=testdomain,DC=com",
"LockoutDuration             : 00:30:00",
"LockoutObservationWindow    : 00:30:00",
"LockoutThreshold            : 0",
"MaxPasswordAge              : 42.00:00:00",
"MinPasswordAge              : 1.00:00:00",
"MinPasswordLength           : 7",
"objectClass                 : {domainDNS}",
"objectGuid                  : d43f2f55-c381-4fa7-871d-4c990434259c",
"PasswordHistoryCount        : 24",
"ReversibleEncryptionEnabled : False"
];