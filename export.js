let LBRetrieve = localStorage.getItem('LBRetrieve');
let CFdata = localStorage.getItem('CFdata');
 
let iName = localStorage.getItem('iName');
let pNumber = localStorage.getItem('pNumber');
let pExDate = localStorage.getItem('pExDate');
let product = localStorage.getItem('product');
let pDesc = localStorage.getItem('pDesc');
let DoO = localStorage.getItem('DoO');
let bContact = localStorage.getItem('bContact');
let bContactEmail = localStorage.getItem('bContactEmail');
let to = localStorage.getItem('to');
let cc = localStorage.getItem('cc');
let RN1 = localStorage.getItem('RN1');
let RN2 = localStorage.getItem('RN2');
let lbname = localStorage.getItem('lbname');
let cfTitle = localStorage.getItem('cfTitle');
let program = localStorage.getItem('program');
let province = localStorage.getItem('province');
let bConf = localStorage.getItem('bConf');
let zrbw = localStorage.getItem('zrbw');
let retrievebrokerdata = localStorage.getItem('retrievebrokerdata');
let brokeraddress = localStorage.getItem('brokeraddress');
let postaladdress = localStorage.getItem('postaladdress');
let WOTF = localStorage.getItem('WTOF');
let isQC = localStorage.getItem('isQC');
 
let currentUW = localStorage.getItem('currentUW');
 
// zrbw, url, program, province, lbname, to // to, lbname
//alert(localStorage.getItem('iName', '') + localStorage.getItem('pNumber', '') + localStorage.getItem('pExDate', '') + localStorage.getItem('product', '') + localStorage.getItem('pDesc', '') + localStorage.getItem('DoO', '') + localStorage.getItem('bContact', '') + localStorage.getItem('bContactEmail', '') + localStorage.getItem('to', '') + 'CC: ' + localStorage.getItem('cc', '') + localStorage.getItem('RN1', '') + localStorage.getItem('RN2', '') + localStorage.getItem('lbname', '') + localStorage.getItem('cfTitle', '') + localStorage.getItem('program', '') + localStorage.getItem('province', '') + localStorage.getItem('LBRetrieve', '') + localStorage.getItem('cfData', '') + localStorage.getItem('bConf', '') + localStorage.getItem('zrbw', ''))
 
if ((document.title.includes('Task: ')) && retrievebrokerdata == 1) {
    localStorage.setItem('retrievebrokerdata', 0)
 
    // Function to extract "To", "CC", and "Latest broker" from email content
    function extractToCcAndLbname(content) {
        //var toRegex = /To:\s*([^CC:]+)\s*CC:/;
        var toRegex = /To:\s*([^\n]+)\s*CC:/;
        var ccRegex = /CC:\s*([\s\S]*?)\s*From:/;
        var lbnameRegex = /(?:Good morning|Good morning,|Good afternoon|Good afternoon,|Good day|Good day,|Hi|Hi,|Hello|Thank you for the instruction,|Thank you for the binding instructions|Bonjour)\s+(\w+).*/; // Modified regex
 
        var toMatch = content.match(toRegex);
        var ccMatch = content.match(ccRegex);
        var lbnameMatch = content.match(lbnameRegex);
 
        localStorage.setItem('to', toMatch ? toMatch[1].trim() : '')
     
        if (localStorage.getItem('bConf') == 1) {
            localStorage.setItem('cc', ccMatch ? ccMatch[1].trim() : '')
        }
 
        localStorage.setItem('lbname', lbnameMatch ? lbnameMatch[1].trim() : '')
    }
 
    var content = document.getElementById('tsk6_ileinner').textContent
    extractToCcAndLbname(content);
    downloadCSV();
}
 
else if ((document.title.includes('Client file: ')) && CFdata == 1) {
    localStorage.setItem('CFdata', 0);
    localStorage.setItem('cfTitle', document.title);
 
    // XPath of the elements
    var xpaths = {
        iName: '//*[@id="ep"]/div[2]/div[11]/table/tbody/tr[1]/td[2]',
        pNumber: '//*[@id="ep"]/div[2]/div[3]/table/tbody/tr[2]/td[2]',
        pExDate: '//*[@id="ep"]/div[2]/div[3]/table/tbody/tr[4]/td[2]',
        product: '//*[@id="ep"]/div[2]/div[7]/table/tbody/tr[1]/td[2]',
        pDesc: '//*[@id="ep"]/div[2]/div[7]/table/tbody/tr[3]/td[2]',
        DoO: '//*[@id="ep"]/div[2]/div[11]/table/tbody/tr[4]/td[2]',
        bContact: '//*[@id="ep"]/div[2]/div[15]/table/tbody/tr[3]/td[2]',
        bContactEmail: '//*[@id="ep"]/div[2]/div[15]/table/tbody/tr[6]/td[2]',
        postaladdress: '//*[@id="ep"]/div[2]/div[11]/table/tbody/tr[2]/td[2]',
        brokeraddress: '//*[@id="ep"]/div[2]/div[15]/table/tbody/tr[5]/td[2]',
        currentUW: '//*[@id="ep"]/div[2]/div[7]/table/tbody/tr[7]/td[2]'
    };
 
    // Function to extract data using XPath
    function extractData(xpath) {
        var element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        var data = element ? element.textContent.trim() : null;
 
        // Check if the extracted data is empty
        if (!data) {
            // Extract alternative data based on the XPath
            if (xpath === xpaths.pNumber) {
                document.evaluate('/html/body/div[1]/div[2]/table/tbody/tr/td[2]/div[4]/div[2]/div[7]/table/tbody/tr[10]/td[4]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.focus();
 
                //alert('hey');
                // Check for the presence of the pop-up every 200 ms
                var interval = setInterval(function() {
                    var popupContent = document.evaluate('/html/body/div[2]/div/div/div[2]/table/tbody/tr[13]/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
 
                    if (popupContent) {
                        xpaths.pNumber = popupContent.textContent
                        var interval2 = setInterval(function() {
                            if (xpaths.pNumber) {
                                localStorage.setItem('pNumber', xpaths.pNumber)
                                clearInterval(interval2); // Stop the interval
                            }
                        }, 200);
                        clearInterval(interval); // Stop the interval
                    }
                }, 200);
 
            }
            // Add more conditions for other XPaths if needed
        }
 
        // Check if the extracted data is pExDate
        if (xpath === xpaths.pExDate && data) {
            // Split the date string into parts (assuming it's in mm-dd-yy format)
            var parts = data.split("-");
            if (parts.length === 3) {
                // Convert the date string into a JavaScript Date object
                var date = new Date(2000 + parseInt(parts[2]), parseInt(parts[0]) - 1, parseInt(parts[1]));
 
                // Format the date as "mmm dd, yyyy"
                data = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
            }
        }
 
        // Find the division (div) element with an id containing "RelatedHistoryList_body"
        var div = document.querySelector('div[id*="RelatedHistoryList_body"]');
        if (div) {
            // Find the table row (tr) elements within the division
            var rows = div.getElementsByTagName('tr');
            var RN1 = null;
            var RN2 = null;
 
            for (var i = 0; i < rows.length; i++) {
                var textContentLower = rows[i].textContent.toLowerCase();
 
                // Search for "1st Renewal" notice
                if (!RN1 && (textContentLower.includes('1st rnwl') || textContentLower.includes('first renewal') || textContentLower.includes('1st renewal'))) {
                    var cells1 = rows[i].getElementsByTagName('td');
                    var valueCell1 = cells1[4]; // Assuming the value is in the 4th cell (index 3)
                    RN1 = valueCell1.textContent.trim();
                }
 
                // Search for "2nd Renewal" notice
                if (!RN2 && (textContentLower.includes('second renewal') || textContentLower.includes('2nd rnwl') || textContentLower.includes('2nd renewal'))) {
                    var cells2 = rows[i].getElementsByTagName('td');
                    var valueCell2 = cells2[4]; // Assuming the value is in the 4th cell (index 3)
                    RN2 = valueCell2.textContent.trim();
                }
 
                // Stop searching if both RN1 and RN2 are found
                if (RN1 && RN2) break;
            }
 
            var today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to midnight
 
            // Get the stored date (16/12/2025)
            var storedDateStr = document.evaluate('//*[@id="ep"]/div[2]/div[3]/table/tbody/tr[4]/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent; // This should be in DD/MM/YYYY format
 
            // Split the date string to extract day, month, year
            var dateParts = storedDateStr.split('/');
            var storedDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]); // JavaScript months are zero-indexed
 
            var diffTime = storedDate - today; // Difference in milliseconds
            var diffDays = diffTime / (1000 * 3600 * 24); // Convert to days
 
            if (diffDays > 90) {
                // Store RN1 and RN2 using localStorage.setItem
                localStorage.setItem('RN1', RN1 || '');
                localStorage.setItem('RN2', RN2 || '');
            }
        }
 
        return data;
    }
 
    // Extract data from elements
    localStorage.setItem('iName', extractData(xpaths.iName))
    localStorage.setItem('pNumber', extractData(xpaths.pNumber))
    localStorage.setItem('pExDate', extractData(xpaths.pExDate))
    localStorage.setItem('product', extractData(xpaths.product))
    localStorage.setItem('pDesc', extractData(xpaths.pDesc))
    localStorage.setItem('DoO', extractData(xpaths.DoO))
    localStorage.setItem('bContact', extractData(xpaths.bContact))
    localStorage.setItem('bContactEmail', extractData(xpaths.bContactEmail))
    localStorage.setItem('postaladdress', extractData(xpaths.postaladdress))
    localStorage.setItem('brokeraddress', extractData(xpaths.brokeraddress))
 
    if (extractData(xpaths.pDesc).includes("Aegis - Opal")) {
        localStorage.setItem('currentUW', extractData(xpaths.currentUW))
    }
 
    if (!localStorage.getItem('pNumber'))
    {
        document.evaluate('/html/body/div[1]/div[2]/table/tbody/tr/td[2]/div[4]/div[2]/div[7]/table/tbody/tr[10]/td[4]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.focus();
 
        var interval = setInterval(function() {
            var popupContent = document.evaluate('/html/body/div[2]/div/div/div[2]/table/tbody/tr[13]/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (popupContent) {
                xpaths.pNumber = popupContent.textContent
 
                var interval2 = setInterval(function() {
                    if (xpaths.pNumber) {
                        //localStorage.setItem('LBRetrieve', 1)
                        localStorage.setItem('pNumber', xpaths.pNumber)
                        //document.evaluate('//*[@id="topButtonRow"]/input[15]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
 
                        // Find the division (div) element with an id containing "RelatedHistoryList_body"
                        var div = document.querySelector('div[id*="RelatedHistoryList_body"]');
                        if (div) {
                            // Find the table row (tr) elements within the division
                            var rows = div.getElementsByTagName('tr');
                            var RN1 = null;
                            var RN2 = null;
 
                            for (var i = 0; i < rows.length; i++) {
                                var textContentLower = rows[i].textContent.toLowerCase();
 
                                // Search for "1st Renewal" notice
                                if (!RN1 && (textContentLower.includes('1st rnwl') || textContentLower.includes('first renewal') || textContentLower.includes('1st renewal'))) {
                                    var cells1 = rows[i].getElementsByTagName('td');
                                    var valueCell1 = cells1[4]; // Assuming the value is in the 4th cell (index 3)
                                    RN1 = valueCell1.textContent.trim();
                                }
 
                                // Search for "2nd Renewal" notice
                                if (!RN2 && (textContentLower.includes('second renewal') || textContentLower.includes('2nd rnwl') || textContentLower.includes('2nd renewal'))) {
                                    var cells2 = rows[i].getElementsByTagName('td');
                                    var valueCell2 = cells2[4]; // Assuming the value is in the 4th cell (index 3)
                                    RN2 = valueCell2.textContent.trim();
                                }
 
                                // Stop searching if both RN1 and RN2 are found
                                if (RN1 && RN2) break;
                            }
 
                            var today = new Date();
                            today.setHours(0, 0, 0, 0); // Set time to midnight
 
                            // Get the stored date (16/12/2025)
                            var storedDateStr = document.evaluate('//*[@id="ep"]/div[2]/div[3]/table/tbody/tr[4]/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent; // This should be in DD/MM/YYYY format
 
                            // Split the date string to extract day, month, year
                            var dateParts = storedDateStr.split('/');
                            var storedDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]); // JavaScript months are zero-indexed
 
                            var diffTime = storedDate - today; // Difference in milliseconds
                            var diffDays = diffTime / (1000 * 3600 * 24); // Convert to days
 
                            if (diffDays > 90) {
                                // Store RN1 and RN2 using localStorage.setItem
                                localStorage.setItem('RN1', RN1 || '');
                                localStorage.setItem('RN2', RN2 || '');
                            }
 
                            //alert(div.textContent.toLowerCase())
 
                            if ((div.textContent.toLowerCase().includes("new broker contact")) || (div.textContent.toLowerCase().includes("new brk contact"))) {
                                // String found
                                alert("Check for new broker contacts.");
                            }
 
                            if ((div.textContent.toLowerCase().includes("bor")) || (div.textContent.toLowerCase().includes("broker of record"))) {
                                // String found
                                alert("Check for broker of record notice.");
                            }
 
                            if (((div.textContent.toLowerCase().includes("cancel")) || (div.textContent.toLowerCase().includes("cancellation")) || (div.textContent.toLowerCase().includes("lapse")) || (div.textContent.toLowerCase().includes("ERP"))) && (!div.textContent.toLowerCase().includes("renewal is to be lapsed")) && (!div.textContent.toLowerCase().includes("broker cancellation process"))){
                                // String found
                                alert("Check for cancellation/lapse.");
                            }
 
                            var parentElementId = findElementWithText();
                            console.log("Parent Element ID:", parentElementId);
 
                            if (parentElementId === "Nothing found") {
                                console.log("No binding confirmation data found.");
                                downloadCSV();
                                alert("Binding confirmation data not found. Downloading without...");
                            } else {
                                console.log("Navigating to:", parentElementId);
                                localStorage.setItem('retrievebrokerdata', 1);
                                window.location.href = parentElementId;
                            }
                        }
 
                        clearInterval(interval2); // Stop the interval
                    }
                }, 200);
                clearInterval(interval); // Stop the interval
            }
        }, 200);
    }
 
    else {
        localStorage.setItem('LBRetrieve', 1)
        //document.evaluate('//*[@id="topButtonRow"]/input[15]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
 
        // Find the division (div) element with an id containing "RelatedHistoryList_body"
        var div = document.querySelector('div[id*="RelatedHistoryList_body"]');
 
        if (div) {
            //alert(div.textContent.toLowerCase())
 
            if ((div.textContent.toLowerCase().includes("new broker contact")) || (div.textContent.toLowerCase().includes("new brk contact"))) {
                // String found
                alert("Check for new broker contacts.");
            }
 
            if ((div.textContent.toLowerCase().includes("bor")) || (div.textContent.toLowerCase().includes("broker of record"))) {
                // String found
                alert("Check for broker of record notice.");
            }
 
            if (((div.textContent.toLowerCase().includes("cancel")) || (div.textContent.toLowerCase().includes("cancellation")) || (div.textContent.toLowerCase().includes("lapse")) || (div.textContent.toLowerCase().includes("ERP"))) && (!div.textContent.toLowerCase().includes("renewal is to be lapsed")) && (!div.textContent.toLowerCase().includes("broker cancellation process"))){
                // String found
                alert("Check for cancellation/lapse.");
            }
 
            var parentElementId = findElementWithText();
            console.log("Parent Element ID:", parentElementId);
 
            if (parentElementId === "Nothing found") {
                console.log("No binding confirmation data found.");
                downloadCSV();
                alert("Binding confirmation data not found. Downloading without...");
            } else {
                console.log("Navigating to:", parentElementId);
                localStorage.setItem('retrievebrokerdata', 1);
                window.location.href = parentElementId;
            }
        }
    }
}
 
else if (document.title.includes('Application: ')) {
    // Function to handle button click
    localStorage.setItem('WTOF', document.title)

    if (document.title.includes('Excess/Umbrella: ')) {
        localStorage.setItem('program', '')
        localStorage.setItem('province', '')
        document.evaluate('//*[@id="topButtonRow"]/input[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
    }

    else if (document.title.includes('Security: ')) {
        localStorage.setItem('crimelimit', document.evaluate('//*[@id="00N3h00000I7hCt_ileinner"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent)

        // Select the div element by ID
        var divElement = document.getElementById('a3D3h000006qii1_00N3h00000I7hA0');

        // Check if the div contains "QC"
        if (divElement && divElement.innerHTML.includes("QC")) {
            localStorage.setItem('isQC', "Y")
        } else {
            localStorage.setItem('isQC', "N")
        }

        document.evaluate('//*[@id="topButtonRow"]/input[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
    }

    else if (document.title.includes('E&O: '))
    {
        localStorage.setItem('program', document.evaluate('//*[@id="00N3h00000EhaRs_ileinner"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent)
        localStorage.setItem('province', document.evaluate('//*[@id="00N3h00000EhaS8_ileinner"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent.toUpperCase())
        document.evaluate('//*[@id="topButtonRow"]/input[5]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
    }

    localStorage.setItem('CFdata', 1)
    
}
 
function downloadCSV() {
    // Convert extracted data to CSV format
    var csv = convertToCSV();
 
    // Add UTF-8 BOM to ensure proper character encoding
    var BOM = "\uFEFF"; // BOM character
    var csvWithBOM = BOM + csv;
 
    // Create a Blob containing the CSV data with BOM
    var blob = new Blob([csvWithBOM], { type: 'text/csv;charset=utf-8;' });
 
    // Create a download link for the Blob
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'extracted_data.csv'; // Set a default filename
    a.click();
}
 
function findElementWithText() {
    var tableElements = document.querySelectorAll('table.list');
    for (var i = 0; i < tableElements.length; i++) {
        var elements = tableElements[i].querySelectorAll('a, span, div');
        for (var j = 0; j < elements.length; j++) {
            var text = elements[j].textContent.toLowerCase();
 
            // Get the expiration date as a string
            var expdateStr = document.evaluate('//*[@id="ep"]/div[2]/div[3]/table/tbody/tr[4]/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent.trim();
 
            // Convert the expiration date string to a Date object
            var [day, month, year] = expdateStr.split('/').map(Number); // Split by '/' and convert to numbers
            var expdate = new Date(year, month - 1, day); // JS months are zero-based
 
            // Get today's date at midnight
            var today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to midnight
 
            // Calculate the difference in time (milliseconds)
            var diffTime = expdate - today; // Difference in milliseconds
 
            // Convert the difference to days
            var diffDays = diffTime / (1000 * 3600 * 24); // Convert to days
 
            if (diffDays > 90) {
                if ((text.includes('1st rnwl') || text.includes('1st renewal') || text.includes('first renewal') || text.includes('2nd rnwl') || text.includes('2nd renewal') || text.includes('second renewal')) && !text.includes('.msg')) {
                    localStorage.setItem('bConf', 0);
                    return [elements[j]]; // Break and return the matched element
                }
            }
 
            else {
                if (text.match(/(Quote|Binding|Bind|Bnd|Bound|Conf|Confirmed|Confirm)\s*(Confirmation|Conf|Bnd|Bind|Bound|Binding)/i) && !text.includes('hcc') && !text.includes('.msg')) {
                    localStorage.setItem('bConf', 1);
                    return [elements[j]]; // Break and return the matched element
                }
            }
        }
    }
 
    return "Nothing found"; // Return an empty array if no matches are found
}
 
// Function to convert object to CSV string
function convertToCSV() {
    var csv = '"iName","' + localStorage.getItem('iName') + '"\n';
    csv += '"pNumber","' + localStorage.getItem('pNumber') + '"\n';
    csv += '"pExDate","' + localStorage.getItem('pExDate') + '"\n';
    csv += '"product","' + localStorage.getItem('product') + '"\n';
    csv += '"pDesc","' + localStorage.getItem('pDesc') + '"\n';
    csv += '"DoO","' + localStorage.getItem('DoO') + '"\n';
    csv += '"bContact","' + localStorage.getItem('bContact') + '"\n';
    csv += '"bContactEmail","' + localStorage.getItem('bContactEmail') + '"\n';
    csv += '"to","' + localStorage.getItem('to') + '"\n';
    csv += '"cc","' + localStorage.getItem('cc') + '"\n';
    csv += '"RN1","' + localStorage.getItem('RN1') + '"\n';
    csv += '"RN2","' + localStorage.getItem('RN2') + '"\n';
    csv += '"lbname","' + localStorage.getItem('lbname') + '"\n';
 
    if (!localStorage.getItem('product').includes("Security")) {
        csv += '"program","' + localStorage.getItem('program') + '"\n';
        csv += '"province","' + localStorage.getItem('province') + '"';
    }
 
    if (localStorage.getItem('product').includes("Security")) {
        csv += '"postaladdress","' + localStorage.getItem('postaladdress') + '"\n';
        csv += '"brokeraddress","' + localStorage.getItem('brokeraddress') + '"\n';
        csv += '"isQC","' + localStorage.getItem('isQC') + '"\n';
        csv += '"crimelimit","' + localStorage.getItem('crimelimit') + '"';
    }
 
    if (localStorage.getItem('product').includes("Errors & Omissions") && localStorage.getItem('pDesc').includes("Aegis - Opal")) {
        csv += '\n"currentUW","' + localStorage.getItem('currentUW') + '"';
    }
 
    localStorage.removeItem('LBRetrieve');
    localStorage.removeItem('CFdata');
 
    localStorage.removeItem('iName');
    localStorage.removeItem('pNumber');
    localStorage.removeItem('pExDate');
    localStorage.removeItem('product');
    localStorage.removeItem('pDesc');
    localStorage.removeItem('DoO');
    localStorage.removeItem('bContact');
    localStorage.removeItem('bContactEmail');
    localStorage.removeItem('program');
    localStorage.removeItem('province');
    localStorage.removeItem('to');
    localStorage.removeItem('cc');
    localStorage.removeItem('RN1');
    localStorage.removeItem('RN2');
    localStorage.removeItem('lbname');
    localStorage.removeItem('cfTitle');
    localStorage.removeItem('bConf');
    localStorage.removeItem('retrievebrokerdata');
 
    return csv;
}
