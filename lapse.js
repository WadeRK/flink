let LapseTask = GM_getValue('LapseTask');
let UW = GM_getValue('UW');
let exDate = GM_getValue('exDate');
let R4Lapse = GM_getValue('R4Lapse');
let R4CRAST = GM_getValue('R4CRAST');
let CloseTask = GM_getValue('CloseTask');
let UWInternal = GM_getValue('UWInternal');
let tabName = GM_getValue('tabName');
 
(function() {
    'use strict';
    if (document.title.includes('Task: ') && LapseTask == 1) {
        GM_setValue('LapseTask', 0)
 
        document.getElementById('tsk1').value = GM_getValue('UW')
        document.getElementById('00N3h00000AxyOA').value = 'Renewal application';
        var tName = GM_getValue('tName').replace("RAST", "Lapse - Broker's Request")
        document.getElementById('tsk5').value = tName
        var d = new Date();
        document.getElementById('tsk4').value = [d.getDate(), d.getMonth() + 1, d.getFullYear()].map(n => n.toString().padStart(2, '0')).join('/');
        document.getElementById('tsk12').value = 'In Progress';
        document.getElementById('reminder_select_check').checked = false;
 
        document.evaluate('//*[@id="topButtonRow"]/input[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
 
        GM_setValue('UW', 0)
        GM_setValue('exDate', 0)
    }
 
    else if (document.title.includes('Client file: ') && GM_getValue('R4Lapse') == 1) {
        GM_setValue('R4Lapse', 0)
 
        var xpath = '//*[contains(@id, "_RelatedActivityList")]/div[1]/div/div[1]/table/tbody/tr/td[2]/input[1]';
        var button = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
 
        if (button) {
            //alert('https://threeholdings.my.salesforce.com/' + url.match(/%26eid%3D([^%]+)%26ic%3D1%26linkToken/)?.[1] + '?retURL=%2F' + id)
 
            document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
            GM_setValue('LapseTask', 1)
        } else {
            alert('Button not found');
        }
    }
 
    else if (document.title.includes('Task: ') && CloseTask == 1) {
        GM_setValue('CloseTask', 0)
        GM_setValue('R4Lapse', 1)
 
        GM_setValue('tName', document.getElementById('tsk5').value)
 
        document.evaluate('//*[@id="topButtonRow"]/input[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
    }
 
    else if (document.title.includes('Client file: ')) {
        // Beginning

        GM_setValue('tabName', document.title)
 
            var url = window.location.href;
            var parts = url.split('/');
            var idWithFragment = parts[parts.length - 1]; // Get the part after the last '/'
            var idParts = idWithFragment.split('/'); // Split by '#' to separate the ID from the fragment
            //var id = idParts[0]; // Get the ID part
            var id = parts[3];
 
            GM_setValue('UW', document.evaluate("/html/body/div[1]/div[2]/table/tbody/tr/td[2]/div[4]/div[2]/div[7]/table/tbody/tr[7]/td[2]/a", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent);
 
            copyToClipboard(document.evaluate("/html/body/div/div[2]/table/tbody/tr/td[2]/div[1]/div[1]/div[1]/h2", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent);
 
            if (document.evaluate("//a[contains(text(), 'RAST')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
                var href = document.evaluate("//a[contains(text(), 'RAST')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.getAttribute('href');
                window.location.href = 'https://threeholdings.my.salesforce.com' + href + '/e?close=1&retURL=%2F' + id;
                //window.location.href = 'https://threeholdings.my.salesforce.com' + href + '/e?retURL=%2F' + id;
                GM_setValue('CloseTask', 1)
            }
 
            else if (document.evaluate("//a[contains(text(), 'Lapse -')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
                href = document.evaluate("//a[contains(text(), 'Lapse')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.getAttribute('href');
                window.location.href = 'https://threeholdings.my.salesforce.com' + href + '/e?close=1&retURL=%2F' + id;
                //window.location.href = 'https://threeholdings.my.salesforce.com' + href + '/e?retURL=%2F' + id;
                GM_setValue('CloseTask', 1)
            }
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
