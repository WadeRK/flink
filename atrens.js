// ==UserScript==
// @name         Atrens
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Populates fields from a selected spreadsheet and cross-checks values
// @author       Your Name
// @match        *://*/*
// @grant        localStorage.setItem
// @grant        localStorage.getItem
// ==/UserScript==
 
(function() {
    'use strict';
 
    let text = localStorage.getItem('text', '');
    let RenewFile = localStorage.getItem('RenewFile', '');
    let AmendDetails = localStorage.getItem('AmendDetails', '');
    let TimeToAmendDetails = localStorage.getItem('TimeToAmendDetails', '');
    let AmendAddress = localStorage.getItem('AmendAddress', '');
    let TimeToAmendAddress = localStorage.getItem('TimeToAmendAddress', '');
    let Bind = localStorage.getItem('Bind', '');
    let TimeToBind = localStorage.getItem('TimeToBind', '');
    let TimeToCreateFile = localStorage.getItem('TimeToCreateFile', '');
    let Search1Results = localStorage.getItem('Search1Results', '');
    let Search2Results = localStorage.getItem('Search2Results', '');
    let CreateFile = localStorage.getItem('CreateFile', '');
    let NewAmendDetails = localStorage.getItem('NewAmendDetails', '');
    let NewTimeToAmendDetails = localStorage.getItem('NewTimeToAmendDetails', '');
    let BindCheck = localStorage.getItem('BindCheck', '');
 
    if (window.location.href.includes('Renewed') && RenewFile == 1) {
        localStorage.setItem('RenewFile', 0);
        document.querySelector("[id='pg:frm:pb:renewalProduct:j_id73']").value = "Kristy Shuk Ching Lai";
        document.querySelector("[id='pg:frm:pb:saveButton']").click();
        localStorage.setItem('TimeToAmendDetails', 1);
    }
 
    else if (document.title.includes('Client file: ') && TimeToAmendDetails == 1) {
        localStorage.setItem('TimeToAmendDetails', 0);
        document.evaluate('//*[@id="topButtonRow"]/input[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
        localStorage.setItem('AmendDetails', 1);
    }
 
    else if (window.location.href.includes('MGAClientFilePage') && AmendDetails == 1) {
        localStorage.setItem('AmendDetails', 0);
 
        var values = parseCSV(localStorage.getItem('text'));
 
        // Populate fields
        document.querySelector("[id='j_id0:j_id5:j_id14:j_id394:j_id415']").value = values[13][0];
        document.querySelector("[id='j_id0:j_id5:j_id14:j_id394:j_id417']").value = values[14][0];
        document.querySelector("[id='j_id0:j_id5:j_id14:j_id394:j_id419']").value = "0";
        document.querySelector("[id='j_id0:j_id5:j_id14:j_id440:j_id441']").value = values[16][0];
        document.querySelector("[id='j_id0:j_id5:j_id14:j_id429:j_id430']").value = values[1][0];
 
        // Cross-check values and show warning if any do not match
        var mismatchMsg = "";
        if (document.querySelector("[id='j_id0:j_id5:j_id14:j_id429:j_id434']").value.trim() !== values[4][0].trim()) {
            mismatchMsg += "Effective date does not match. Expected: " + values[4][0] + ", Actual: " + document.querySelector("[id='j_id0:j_id5:j_id14:j_id429:j_id434']").value + "\n";
        }
        if (document.querySelector("[id='j_id0:j_id5:j_id14:j_id429:policyExpiryDateField']").value.trim() !== values[5][0].trim()) {
            mismatchMsg += "Expiry date does not match. Expected: " + values[5][0] + ", Actual: " + document.querySelector("[id='j_id0:j_id5:j_id14:j_id429:policyExpiryDateField']").value + "\n";
        }
        if (mismatchMsg !== "") {
            alert("Warning: Some fields do not match the spreadsheet values.\n" + mismatchMsg);
            var ThereIsAnError = "1";
        }
 
        if (ThereIsAnError !== "1") {
            document.querySelector("[id='j_id0:j_id5:j_id14:j_id15:save']").click();
            localStorage.setItem('TimeToAmendAddress', 1);
        }
    }
 
    else if (document.title.includes('Client file: ') && TimeToAmendAddress == 1) {
        localStorage.setItem('TimeToAmendAddress', 0);
        document.evaluate('//*[@id="topButtonRow"]/input[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
        localStorage.setItem('AmendAddress', 1);
    }
 
    else if (window.location.href.includes('MGAClientFileAccountChange') && AmendAddress == 1) {
        localStorage.setItem('AmendAddress', 0);
 
        values = parseCSV(localStorage.getItem('text'));
 
        // Populate fields
        document.querySelector("[id='pg:pb:frm:j_id62:pca_street']").value = toTitleCase(values[7][0]);
        document.querySelector("[id='pg:pb:frm:j_id62:pca_city']").value = toTitleCase(values[8][0]);
        document.querySelector("[id='pg:pb:frm:j_id62:pca_state']").value = values[9][0];
        document.querySelector("[id='pg:pb:frm:j_id62:pca_postcode']").value = values[10][0];
 
        //document.evaluate("/html/body/div[1]/div[2]/table/tbody/tr/td[2]/div[2]/div/div/div/div/div[1]/form/span/span[1]/input[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
 
        var interval = setInterval(function() {
            // Locate the parent container
            var parentElement = document.getElementById('pg:pb:frm:j_id42:table:tb');
 
            // Check if the parent element exists
            if (parentElement) {
                // Select all checkboxes within the parent element
                var checkboxes = parentElement.querySelectorAll("input[type='checkbox']");
 
                // Ensure there are checkboxes within the parent element
                if (checkboxes.length > 0) {
                    checkboxes.forEach(function(checkbox) {
                        checkbox.checked = true; // Check each checkbox
                    });
 
                    document.querySelector("[id='pg:pb:frm:saveButton']").click(); // Uncomment to perform the action
 
                    clearInterval(interval); // Stop the interval once the action is complete
                } else {
                    console.log("No checkboxes found within the parent element.");
                }
            } else {
                console.log("Parent element not found.");
            }
        }, 1000); // Check every 1 second
 
        localStorage.setItem('TimeToBind', 1);
    }
 
    else if (document.title.includes('Client file: ') && TimeToBind == 1) {
        localStorage.setItem('TimeToBind', 0);
        var url = window.location.href;
        var parts = url.split('/');
        var idWithFragment = parts[parts.length - 1]; // Get the part after the last '/'
        var idParts = idWithFragment.split('/'); // Split by '#' to separate the ID from the fragment
        //var id = idParts[0]; // Get the ID part
        var id = parts[3];
        window.location.href = 'https://threeholdings--c.vf.force.com/apex/MGAClientFileStatusChangePage?id=' + id + '&status=Bound';
 
        localStorage.setItem('Bind', 1);
    }
 
    else if (window.location.href.includes('MGAClientFileStatusChangePage') && Bind == 1) {
        localStorage.setItem('Bind', 0);
 
        var today = new Date();
 
        if (today.getDate().toString().padStart(2, '0') < 28) {
            // Use today's date
            var formattedDate = today.getDate().toString().padStart(2, '0') + '/' + (today.getMonth() + 1).toString().padStart(2, '0') + '/' + today.getFullYear();
        } else {
            // Use the 28th of the current month
            formattedDate = '28/' + (today.getMonth() + 1).toString().padStart(2, '0') + '/' + today.getFullYear();
        }
 
        document.querySelector("[id='pg:frm:pb:issued']").checked = true;
        document.querySelector("[id='pg:frm:pb:inv:j_id343']").value = formattedDate;
 
        document.querySelector("[id='pg:frm:pb:saveButton']").click();
 
        //alert("Finished.")
 
        interval = setInterval(function() {
            if (document.body.textContent.includes("The record you were editing was modified") || document.title.includes('Client file: ')) {
                clearInterval(interval); // Stop checking
                if (!document.title.includes('Client file: ')) {
                    window.location.reload();
                    localStorage.setItem('Bind', 1);
                }
            }
        }, 500); // Check every 500ms
    }
 
 
    else if (document.title.includes('Search Results') && Search1Results == 1) {
        localStorage.setItem('Search1Results', 0);
 
        let exists = document.body.textContent.includes("There are no matching");
 
        if (exists) {
            var values2 = parseCSV(localStorage.getItem('text2'));
            let name = values2[3][0];
            let updatedName = name.replace(/\s+/g, ' ').trim().replace(/(\d+)$/, 'No. $1');
            document.getElementById("_sbstr").value = updatedName;
            document.evaluate('/html/body/div/div[2]/table/tbody/tr/td[2]/div[2]/form/div[3]/div/span/div/input[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
            localStorage.setItem('Search2Results', 1);
        }
 
        else {
            alert("Account exists.");
        }
    }
 
    else if (document.title.includes('Search Results') && Search2Results == 1) {
        localStorage.setItem('Search2Results', 0);
 
        let exists = document.body.textContent.includes("There are no matching");
 
        if (exists) {
            window.location.href = 'https://threeholdings--c.vf.force.com/apex/MGAClientFilePage?retURL=%2Fa1D%2Fo&save_new=1&sfdc.override=1';
            localStorage.setItem('CreateFile', 1);
        }
    }
 
    else if (document.title.includes('Salesforce - Enterprise Edition') && CreateFile == 1) {
        localStorage.setItem('CreateFile', 0);
        values2 = parseCSV(localStorage.getItem('text2'));
 
        document.getElementById("j_id0:j_id5:j_id14:j_id67:j_id68:insurance_product").value = "a1KOO00000BG3d82AD";
        document.querySelector("[id='j_id0:j_id5:j_id14:j_id67:j_id86']").value = "Kristy Lai";
        document.getElementById("j_id0:j_id5:j_id14:j_id101:j_id102").value = "New";
 
        let name = values2[3][0];
        let updatedName = name.replace(/\s+/g, ' ').trim().replace(/(\d+)$/, 'No. $1');
        document.getElementById("j_id0:j_id5:j_id14:j_id144:clientfilenewaccountname").value = updatedName;
 
        let address = values2[7][0];
        let titleCasedAddress = toTitleCase(address);
 
        let city = values2[8][0];
        let titleCasedCity = toTitleCase(city);
 
        let state = values2[9][0];
        let titleCasedState = state.toUpperCase();
 
        document.getElementById("j_id0:j_id5:j_id14:j_id146:pca_streetnonbroker").value = titleCasedAddress;
        document.getElementById("j_id0:j_id5:j_id14:j_id146:pca_citynonbroker").value = titleCasedCity;
        document.getElementById("j_id0:j_id5:j_id14:j_id146:pca_statenonbroker").value = titleCasedState;
 
        document.getElementById("j_id0:j_id5:j_id14:j_id146:pca_postcodenonbroker").value = values2[10][0];
        document.getElementById("j_id0:j_id5:j_id14:j_id146:pca_countrynonbroker").value = "Canada";
        document.getElementById("j_id0:j_id5:j_id14:brokerArea:existingbroker").value = "Atrens-Counsel Insurance Brkrs";
 
        localStorage.setItem('NewTimeToAmendDetails', 1);
    }
 
    else if (document.title.includes('Client file: ') && NewTimeToAmendDetails == 1) {
        localStorage.setItem('NewTimeToAmendDetails', 0);
        document.evaluate('//*[@id="topButtonRow"]/input[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
        localStorage.setItem('NewAmendDetails', 1);
    }
 
    else if (window.location.href.includes('MGAClientFilePage') && NewAmendDetails == 1) {
        localStorage.setItem('NewAmendDetails', 0);
 
        values2 = parseCSV(localStorage.getItem('text2'));
 
        // Populate fields
        document.querySelector("[id='j_id0:j_id5:j_id14:j_id394:j_id415']").value = values2[13][0];
        document.querySelector("[id='j_id0:j_id5:j_id14:j_id394:j_id417']").value = values2[14][0];
        document.querySelector("[id='j_id0:j_id5:j_id14:j_id394:j_id419']").value = "0";
        document.querySelector("[id='j_id0:j_id5:j_id14:j_id440:j_id441']").value = values2[16][0];
        document.querySelector("[id='j_id0:j_id5:j_id14:j_id429:j_id430']").value = values2[1][0];
        document.querySelector("[id='j_id0:j_id5:j_id14:j_id429:j_id434']").value = values2[4][0];
        document.querySelector("[id='j_id0:j_id5:j_id14:j_id429:policyExpiryDateField']").value = values2[5][0];
        document.querySelector("[id='j_id0:j_id5:j_id14:j_id429:j_id437']").value = values2[6][0];
 
        document.querySelector("[id='j_id0:j_id5:j_id14:j_id15:save']").click();
        localStorage.setItem('TimeToBind', 1);
    }
 
    else if (document.title.includes('Salesforce')) { 
        // Create the file input element
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.style.display = 'none';
        fileInput.accept = '.txt'; // Using CSV format
        fileInput.click();
 
        fileInput.addEventListener('change', function(event) {
            var file = event.target.files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var text = e.target.result;
                    localStorage.setItem('text', text);
 
                    var url = window.location.href;
                    var parts = url.split('/');
                    var idWithFragment = parts[parts.length - 1]; // Get the part after the last '/'
                    var idParts = idWithFragment.split('/'); // Split by '#' to separate the ID from the fragment
                    //var id = idParts[0]; // Get the ID part
                    var id = parts[3];
 
                    var values = parseCSV(localStorage.getItem('text'));
 
                    var mismatchMsg = "";
                    var policyExpiryDateXpath = document.evaluate('/html/body/div/div[2]/table/tbody/tr/td[2]/div[4]/div[2]/div[3]/table/tbody/tr[4]/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    if (policyExpiryDateXpath && policyExpiryDateXpath.textContent.trim() !== values[4][0].trim()) {
                        mismatchMsg += "Value in specified XPath does not match. Expected: " + values[4][0] + ", Actual: " + policyExpiryDateXpath.textContent + "\n";
                    }
                    if (mismatchMsg !== "") {
                        alert("Warning: Some fields do not match the spreadsheet values.\n" + mismatchMsg);
                        var ThereIsAnError = "1";
                    }
 
                    if (ThereIsAnError !== "1") {
                        if (url.includes("?srPos")) {
                            window.location.href = 'https://threeholdings--c.vf.force.com/apex/MGAClientFileStatusChangePage?id=' + url.match(/(?<=\.com\/)[^?]+(?=\?srPos)/) + '&status=Renewed';
                        }
                        else if (url.includes("?sbstr")) {
                            window.location.href = 'https://threeholdings--c.vf.force.com/apex/MGAClientFileStatusChangePage?id=' + url.match(/(?<=\.com\/)[^?]+(?=\?sbstr)/) + '&status=Renewed';
                        }
 
                        else {
                            window.location.href = 'https://threeholdings--c.vf.force.com/apex/MGAClientFileStatusChangePage?id=' + id + '&status=Renewed';
                        }
                        localStorage.setItem('RenewFile', 1);
                    }
                };
                reader.readAsText(file);
            }
        });
    }
 
    function parseCSV(text) {
        var lines = text.split('\n');
        return lines.map(function(line) {
            return line.split('\n');
        });
    }
 
    function toTitleCase(str) {
        return str.toLowerCase().split(' ').map(function(word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    }
})();
