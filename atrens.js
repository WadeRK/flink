// ==UserScript==
// @name         Atrens
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Populates fields from a selected spreadsheet and cross-checks values
// @author       Your Name
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==
 
(function() {
    'use strict';
 
    let text = GM_getValue('text', '');
    let RenewFile = GM_getValue('RenewFile', '');
    let AmendDetails = GM_getValue('AmendDetails', '');
    let TimeToAmendDetails = GM_getValue('TimeToAmendDetails', '');
    let AmendAddress = GM_getValue('AmendAddress', '');
    let TimeToAmendAddress = GM_getValue('TimeToAmendAddress', '');
    let Bind = GM_getValue('Bind', '');
    let TimeToBind = GM_getValue('TimeToBind', '');
    let TimeToCreateFile = GM_getValue('TimeToCreateFile', '');
    let Search1Results = GM_getValue('Search1Results', '');
    let Search2Results = GM_getValue('Search2Results', '');
    let CreateFile = GM_getValue('CreateFile', '');
    let NewAmendDetails = GM_getValue('NewAmendDetails', '');
    let NewTimeToAmendDetails = GM_getValue('NewTimeToAmendDetails', '');
    let BindCheck = GM_getValue('BindCheck', '');
 
    if (window.location.href.includes('Renewed') && RenewFile == 1) {
        GM_setValue('RenewFile', 0);
        document.querySelector("[id='pg:frm:pb:renewalProduct:j_id73']").value = "Kristy Shuk Ching Lai";
        document.querySelector("[id='pg:frm:pb:saveButton']").click();
        GM_setValue('TimeToAmendDetails', 1);
    }
 
    else if (document.title.includes('Client file: ') && TimeToAmendDetails == 1) {
        GM_setValue('TimeToAmendDetails', 0);
        document.evaluate('//*[@id="topButtonRow"]/input[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
        GM_setValue('AmendDetails', 1);
    }
 
    else if (window.location.href.includes('MGAClientFilePage') && AmendDetails == 1) {
        GM_setValue('AmendDetails', 0);
 
        var values = parseCSV(GM_getValue('text'));
 
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
            GM_setValue('TimeToAmendAddress', 1);
        }
    }
 
    else if (document.title.includes('Client file: ') && TimeToAmendAddress == 1) {
        GM_setValue('TimeToAmendAddress', 0);
        document.evaluate('//*[@id="topButtonRow"]/input[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
        GM_setValue('AmendAddress', 1);
    }
 
    else if (window.location.href.includes('MGAClientFileAccountChange') && AmendAddress == 1) {
        GM_setValue('AmendAddress', 0);
 
        values = parseCSV(GM_getValue('text'));
 
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
 
        GM_setValue('TimeToBind', 1);
    }
 
    else if (document.title.includes('Client file: ') && TimeToBind == 1) {
        GM_setValue('TimeToBind', 0);
        var url = window.location.href;
        var parts = url.split('/');
        var idWithFragment = parts[parts.length - 1]; // Get the part after the last '/'
        var idParts = idWithFragment.split('/'); // Split by '#' to separate the ID from the fragment
        //var id = idParts[0]; // Get the ID part
        var id = parts[3];
        window.location.href = 'https://threeholdings--c.vf.force.com/apex/MGAClientFileStatusChangePage?id=' + id + '&status=Bound';
 
        GM_setValue('Bind', 1);
    }
 
    else if (window.location.href.includes('MGAClientFileStatusChangePage') && Bind == 1) {
        GM_setValue('Bind', 0);
 
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
                    GM_setValue('Bind', 1);
                }
            }
        }, 500); // Check every 500ms
    }
 
 
    else if (document.title.includes('Search Results') && Search1Results == 1) {
        GM_setValue('Search1Results', 0);
 
        let exists = document.body.textContent.includes("There are no matching");
 
        if (exists) {
            var values2 = parseCSV(GM_getValue('text2'));
            let name = values2[3][0];
            let updatedName = name.replace(/\s+/g, ' ').trim().replace(/(\d+)$/, 'No. $1');
            document.getElementById("_sbstr").value = updatedName;
            document.evaluate('/html/body/div/div[2]/table/tbody/tr/td[2]/div[2]/form/div[3]/div/span/div/input[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
            GM_setValue('Search2Results', 1);
        }
 
        else {
            alert("Account exists.");
        }
    }
 
    else if (document.title.includes('Search Results') && Search2Results == 1) {
        GM_setValue('Search2Results', 0);
 
        let exists = document.body.textContent.includes("There are no matching");
 
        if (exists) {
            window.location.href = 'https://threeholdings--c.vf.force.com/apex/MGAClientFilePage?retURL=%2Fa1D%2Fo&save_new=1&sfdc.override=1';
            GM_setValue('CreateFile', 1);
        }
    }
 
    else if (document.title.includes('Salesforce - Enterprise Edition') && CreateFile == 1) {
        GM_setValue('CreateFile', 0);
        values2 = parseCSV(GM_getValue('text2'));
 
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
 
        GM_setValue('NewTimeToAmendDetails', 1);
    }
 
    else if (document.title.includes('Client file: ') && NewTimeToAmendDetails == 1) {
        GM_setValue('NewTimeToAmendDetails', 0);
        document.evaluate('//*[@id="topButtonRow"]/input[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
        GM_setValue('NewAmendDetails', 1);
    }
 
    else if (window.location.href.includes('MGAClientFilePage') && NewAmendDetails == 1) {
        GM_setValue('NewAmendDetails', 0);
 
        values2 = parseCSV(GM_getValue('text2'));
 
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
        GM_setValue('TimeToBind', 1);
    }
 
    else if (document.title.includes('Salesforce')) {
        // Create and style the floating button
        var button = document.createElement('button');
        button.innerText = 'Atrens Renewal';
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.left = '20px';
        button.style.zIndex = '1000';
        document.body.appendChild(button);
 
        // Create the file input element
        var fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.style.display = 'none';
        fileInput.accept = '.txt'; // Using CSV format
        document.body.appendChild(fileInput);
 
        button.addEventListener('click', function() {
            fileInput.click();
        });
 
        fileInput.addEventListener('change', function(event) {
            var file = event.target.files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var text = e.target.result;
                    GM_setValue('text', text);
 
                    var url = window.location.href;
                    var parts = url.split('/');
                    var idWithFragment = parts[parts.length - 1]; // Get the part after the last '/'
                    var idParts = idWithFragment.split('/'); // Split by '#' to separate the ID from the fragment
                    //var id = idParts[0]; // Get the ID part
                    var id = parts[3];
 
                    var values = parseCSV(GM_getValue('text'));
 
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
                        GM_setValue('RenewFile', 1);
                    }
                };
                reader.readAsText(file);
            }
        });
 
        var button2 = document.createElement('button');
        button2.innerText = 'Atrens New';
        button2.style.position = 'fixed';
        button2.style.bottom = '50px';
        button2.style.left = '20px';
        button2.style.zIndex = '1000';
        document.body.appendChild(button2);
 
        // Create the file input element
        var fileInput2 = document.createElement('input');
        fileInput2.type = 'file';
        fileInput2.style.display = 'none';
        fileInput2.accept = '.txt'; // Using CSV format
        document.body.appendChild(fileInput2);
 
        button2.addEventListener('click', function() {
            fileInput2.click();
        });
 
        fileInput2.addEventListener('change', function(event2) {
            var file2 = event2.target.files[0];
            if (file2) {
                var reader2 = new FileReader();
                reader2.onload = function(e) {
                    var text2 = e.target.result;
                    GM_setValue('text2', text2);
 
                    var values2 = parseCSV(GM_getValue('text2'));
 
                    document.getElementById("sbstr").value = values2[1][0];
                    document.evaluate('/html/body/div/div[2]/table/tbody/tr/td[1]/div/div[1]/form/div[2]/div[1]/input[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
                    GM_setValue('Search1Results', 1);
 
                };
                reader2.readAsText(file2);
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
