let RAPPTask = localStorage.getItem('RAPPTask');
let UW = localStorage.getItem('UW');
let product = localStorage.getItem('product');
let exDate = localStorage.getItem('exDate');
let bContactExists = ""
let bContact = localStorage.getItem('bContact');
let iName = localStorage.getItem('iName');
let R4RAPP = localStorage.getItem('R4RAPP');
let R4CRAST = localStorage.getItem('R4CRAST');
let CloseTask = localStorage.getItem('CloseTask');
let UWInternal = localStorage.getItem('UWInternal');
let tabName = localStorage.getItem('tabName');
 
(function() {
    'use strict';
    if (document.title.includes('Task: ') && RAPPTask == 1) {
        localStorage.setItem('RAPPTask', 0)
 
        document.getElementById('tsk1').value = localStorage.getItem('UW')
        document.getElementById('00N3h00000AxyOA').value = 'Renewal application';
        var tName = localStorage.getItem('tName').replace("RAST", "RAPP")
        tName = tName.replace("Lapse", "RAPP")
        document.getElementById('tsk5').value = tName
        var d = new Date();
        document.getElementById('tsk4').value = [d.getDate(), d.getMonth() + 1, d.getFullYear()].map(n => n.toString().padStart(2, '0')).join('/');
        document.getElementById('tsk12').value = 'In Progress';
        document.getElementById('reminder_select_check').checked = false;
 
        document.evaluate('//*[@id="topButtonRow"]/input[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
 
        localStorage.setItem('UW', 0)
        localStorage.setItem('exDate', 0)
 
        // Convert extracted data to CSV format
        var csv = convertToCSV();
 
        // Create a Blob containing the CSV data
        var blob = new Blob([csv], { type: 'text/csv' });
 
        // Create a download link for the Blob
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'rappuw.csv';
        a.click();
        //End
    }
 
    else if (document.title.includes('Client file: ') && localStorage.getItem('R4RAPP') == 1) {
        localStorage.setItem('R4RAPP', 0)
 
        var xpath = '//*[contains(@id, "_RelatedActivityList")]/div[1]/div/div[1]/table/tbody/tr/td[2]/input[1]';
        var button = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
 
        if (button) {
            //alert('https://threeholdings.my.salesforce.com/' + url.match(/%26eid%3D([^%]+)%26ic%3D1%26linkToken/)?.[1] + '?retURL=%2F' + id)
 
            document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
            localStorage.setItem('RAPPTask', 1)
        } else {
            alert('Button not found');
        }
    }
 
    else if (document.title.includes('Task: ') && CloseTask == 1) {
        localStorage.setItem('CloseTask', 0)
        localStorage.setItem('R4RAPP', 1)
 
        localStorage.setItem('tName', document.getElementById('tsk5').value)
 
        document.evaluate('//*[@id="topButtonRow"]/input[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
    }
 
    else if (document.title.includes('Client file') && localStorage.getItem('R4CRAST') == 1) {
        localStorage.setItem('R4CRAST', 0)
 
        url = window.location.href;
        var parts = url.split('/');
        var idWithFragment = parts[parts.length - 1]; // Get the part after the last '/'
        var idParts = idWithFragment.split('/'); // Split by '#' to separate the ID from the fragment
        //var id = idParts[0]; // Get the ID part
        var id = parts[3];
 
        if (document.evaluate("//a[contains(text(), 'RAST')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
            var href = document.evaluate("//a[contains(text(), 'RAST')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.getAttribute('href');
            window.location.href = 'https://threeholdings.my.salesforce.com' + href + '/e?close=1&retURL=%2F' + id;
            //window.location.href = 'https://threeholdings.my.salesforce.com' + href + '/e?retURL=%2F' + id;
            localStorage.setItem('CloseTask', 1)
        }
 
        else if (document.evaluate("//a[contains(text(), 'Lapse -')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
            href = document.evaluate("//a[contains(text(), 'Lapse')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.getAttribute('href');
            window.location.href = 'https://threeholdings.my.salesforce.com' + href + '/e?close=1&retURL=%2F' + id;
            //window.location.href = 'https://threeholdings.my.salesforce.com' + href + '/e?retURL=%2F' + id;
            localStorage.setItem('CloseTask', 1)
        }
    }
 
    else if (document.title.includes('Salesforce - Enterprise Edition') && localStorage.getItem('UWInternal') == 1) {
        localStorage.setItem('UWInternal', 0)
 
        if (!localStorage.getItem('tabName').includes('Commercial property')) {
            localStorage.setItem('R4CRAST', 1)
        }
 
        document.evaluate('//*[@id="pg:frm:pb:saveButton"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
    }
 
    else if (document.title.includes('Client file: ')) {
        // Beginning
 
        localStorage.setItem('tabName', document.title)
 
            var url = window.location.href;
            var parts = url.split('/');
            var idWithFragment = parts[parts.length - 1]; // Get the part after the last '/'
            var idParts = idWithFragment.split('/'); // Split by '#' to separate the ID from the fragment
            //var id = idParts[0]; // Get the ID part
            var id = parts[3];
 
            localStorage.setItem('iName', document.evaluate("/html/body/div[1]/div[2]/table/tbody/tr/td[2]/div[4]/div[2]/div[11]/table/tbody/tr[1]/td[2]/a", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent);
            localStorage.setItem('UW', document.evaluate("/html/body/div[1]/div[2]/table/tbody/tr/td[2]/div[4]/div[2]/div[7]/table/tbody/tr[7]/td[2]/a", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent);
            localStorage.setItem('exDate', document.evaluate("/html/body/div/div[2]/table/tbody/tr/td[2]/div[4]/div[2]/div[3]/table/tbody/tr[3]/td[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent);
            localStorage.setItem('product', document.evaluate("/html/body/div[1]/div[2]/table/tbody/tr/td[2]/div[4]/div[2]/div[7]/table/tbody/tr[1]/td[2]/a", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent);
 
            bContactExists = document.evaluate("/html/body/div[1]/div[2]/table/tbody/tr/td[2]/div[4]/div[2]/div[15]/table/tbody/tr[3]/td[2]/a", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
 
            if (bContactExists) {
                bContact = document.evaluate("/html/body/div[1]/div[2]/table/tbody/tr/td[2]/div[4]/div[2]/div[15]/table/tbody/tr[3]/td[2]/a", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
 
                if (bContact.trim !== "") {
                    localStorage.setItem('bContact', bContact);
                }
            }
 
            copyToClipboard(document.evaluate("/html/body/div/div[2]/table/tbody/tr/td[2]/div[1]/div[1]/div[1]/h2", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent);
 
            localStorage.setItem('UWInternal', 1)
 
            if (url.includes("?srPos")) {
                window.location.href = 'https://threeholdings--c.vf.force.com/apex/MGAClientFileStatusChangePage?id=' + url.match(/(?<=\.com\/)[^?]+(?=\?srPos)/) + '&status=Underwriting%20(internal)';
            }
 
            else {
                window.location.href = 'https://threeholdings--c.vf.force.com/apex/MGAClientFileStatusChangePage?id=' + id + '&status=Underwriting%20(internal)';
            }
    }
 
    function convertToCSV() {
        var csv = '"Underwriter","' + UW + '"\n';
        csv += '"Expiry Date","' + exDate + '"\n';
        csv += '"Product","' + product + '"\n';
        csv += '"Broker contact","' + bContact + '"\n';
        csv += '"Insured name","' + iName + '"';
 
        localStorage.setItem('UW', "");
        localStorage.setItem('exDate', "");
        localStorage.setItem('product', "");
        bContactExists = "";
        bContact = "";
 
        return csv;
    }
 
    function copyToClipboard(text) {
        // Remove extra spaces from start, end, and between words
        const trimmedText = text.trim().replace(/\s+/g, ' ');
 
        navigator.clipboard.writeText(trimmedText).then(() => {
            console.log('Text copied to clipboard');
        }).catch(err => {
            console.error('Error copying text: ', err);
        });
    }
})();
