let CloseTask = localStorage.getItem('CloseTask', '');
let YallaRenew = localStorage.getItem('YallaRenew', '');
let RenewFile = localStorage.getItem('RenewFile', '');
let RenewBP = localStorage.getItem('RenewBP', '');
let RContent = localStorage.getItem('RContent', '');
let SPN = localStorage.getItem('SPN', '');
let SPNcheck = localStorage.getItem('SPNcheck', '');
let AmendSPN = localStorage.getItem('AmendSPN', '');
let PickProduct = localStorage.getItem('PickProduct', '');
 
(function() {
    'use strict';
    //localStorage.setItem('SPNcheck', 1)
    if (window.location.href.includes('Renewed') && RenewFile == 1) {
        let line1 = '';
        let line2 = '';
        let line3 = '';
 
        const lines = RContent.split('\n');
        line1 = lines[0] || '';
        line2 = lines[1] || '';
        line3 = lines[2] || '';
 
        var currentprod = document.getElementById('pg:frm:pb:renewalProduct:j_id71').value
 
        // Populate elements with IDs "tsk5" and "tsk4"
        if (!line1.includes("Underwriter on File")) {
            if (line1.includes("Nancy Chivers (CC)")) {
                line1 = "Nancy Chivers"
            }
 
            document.getElementById('pg:frm:pb:renewalProduct:j_id73').value = line1;
        }
 
        // Populate elements with IDs "tsk5" and "tsk4"
        if (line1.includes("Underwriter on File")) {
            document.evaluate('//*[@id="pg:frm:pb:saveButton"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
        }
 
        if (!(localStorage.getItem('RenewBP') == 1) && line2.includes('Tattoo and body piercing')) {
            localStorage.setItem('PickProduct', 1)
            document.getElementById('pg:frm:pb:renewalProduct:j_id71').value = line2;
            document.evaluate('//*[@id="pg:frm:pb:renewalProduct:j_id71_lkwgt"]/img', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
        }
 
        if (!(localStorage.getItem('RenewBP') == 1) && line3.includes('Domestic Pool')) {
            localStorage.setItem('PickProduct', 2)
            document.evaluate('//*[@id="pg:frm:pb:renewalProduct:j_id71_lkwgt"]/img', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
        }
 
        if ((localStorage.getItem('RenewBP') == 1) && currentprod != "Commercial property") {
            localStorage.setItem('PickProduct', 3)
            document.evaluate('//*[@id="pg:frm:pb:renewalProduct:j_id71_lkwgt"]/img', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
        }
 
        if (!(localStorage.getItem('RenewBP') == 1) && line2.includes('Security Services')) {
            localStorage.setItem('PickProduct', 4)
            document.evaluate('//*[@id="pg:frm:pb:renewalProduct:j_id71_lkwgt"]/img', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
        }
 
        if (localStorage.getItem('RenewBP') == 1) {
            document.evaluate('//*[@id="pg:frm:pb:saveButton"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
        }
 
        if (document.getElementById('pg:frm:pb:renewalProduct:j_id71').value.includes("Security Services")) {
            var interval = setInterval(function() {
                var element = document.getElementById("pg:frm:pb:renewalProduct:renewalYear");
                if (element && element.textContent.trim() === "2024a") {
                    clearInterval(interval); // Stop checking
                    document.getElementById('pg:frm:pb:saveButton').click();
                }
                //alert(element.textContent)
            }, 500); // Check every 500ms
            localStorage.setItem('SPNcheck', 1)
        }
 
        else if (document.getElementById('pg:frm:pb:renewalProduct:renewalDescription').textContent.includes("HCC") && document.getElementById('pg:frm:pb:renewalProduct:j_id73').value.includes("Danielle Such")) {
            document.getElementById('pg:frm:pb:saveButton').click();
        }
 
        else if (document.getElementById('pg:frm:pb:renewalProduct:j_id71').value.includes("Tattoo and body piercing")) {
            interval = setInterval(function() {
                var element = document.getElementById("pg:frm:pb:renewalProduct:renewalYear");
                if (element && element.textContent.trim() === "2024") {
                    clearInterval(interval); // Stop checking
                    document.getElementById('pg:frm:pb:saveButton').click();
                }
                //alert(element.textContent)
            }, 500); // Check every 500ms
        }
 
        else if (document.getElementById('pg:frm:pb:renewalProduct:j_id71').value.includes("Omissions") && document.getElementById('pg:frm:pb:renewalProduct:renewalDescription').textContent.includes("Pool")) {
            interval = setInterval(function() {
                var element = document.getElementById("pg:frm:pb:renewalProduct:renewalYear");
                if (element && element.textContent.trim() === "2024") {
                    clearInterval(interval); // Stop checking
                    document.getElementById('pg:frm:pb:saveButton').click();
                }
                //alert(element.textContent)
            }, 500); // Check every 500ms
        }
 
        else {
            document.getElementById('pg:frm:pb:saveButton').click();
        }
 
        localStorage.setItem('RenewBP', 0)
        localStorage.setItem('RenewFile', 0)
        localStorage.setItem('RContent', 0)
    }
 
    else if (document.title.includes('Client file: ') && SPNcheck == 1) {
        localStorage.setItem('SPNcheck', 0)
        if (document.evaluate('/html/body/div/div[2]/table/tbody/tr/td[2]/div[4]/div[2]/div[3]/table/tbody/tr[2]/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent.trim() === "") {
            document.evaluate('//*[@id="topButtonRow"]/input[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
 
            localStorage.setItem('AmendSPN', 1)
        }
    }
 
    else if (document.title.includes('Salesforce - Enterprise Edition') && AmendSPN == 1) {
        document.querySelector("[id='j_id0:j_id5:j_id14:j_id429:j_id430']").value = localStorage.getItem('SPN');
        document.evaluate('//*[@id="j_id0:j_id5:j_id14:j_id15:save"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
 
        localStorage.setItem('AmendSPN', 0)
    }
 
    else if (document.title.includes('Search ~ Salesforce') & PickProduct == 1) {
        localStorage.setItem('PickProduct', 0)
 
        var frame = document.getElementById('resultsFrame');
        if (frame) {
 
            var frameDocument = frame.contentDocument || frame.contentWindow.document;
            top.window.opener.lookupPick('pg:frm','pg:frm:pb:renewalProduct:j_id71_lkid','pg:frm:pb:renewalProduct:j_id71','','a1KOO00000BEpfR','Tattoo and body piercing','','');
        }
    }
 
    else if (document.title.includes('Search ~ Salesforce') && PickProduct == 2) {
        localStorage.setItem('PickProduct', 0);
 
        var frame1 = document.getElementById('resultsFrame');
        if (frame1) {
 
            var frameDocument1 = frame1.contentDocument || frame1.contentWindow.document;
            top.window.opener.lookupPick('pg:frm', 'pg:frm:pb:renewalProduct:j_id71_lkid', 'pg:frm:pb:renewalProduct:j_id71', '', 'a1KOO00000BMplV', 'Errors & Omissions', '', '');
        }
    }
 
    else if (document.title.includes('Search ~ Salesforce') && PickProduct == 3) {
        localStorage.setItem('PickProduct', 0);
 
        var frame2 = document.getElementById('resultsFrame');
        if (frame2) {
 
            var frameDocument2 = frame2.contentDocument || frame2.contentWindow.document;
            top.window.opener.lookupPick('pg:frm','pg:frm:pb:renewalProduct:j_id71_lkid','pg:frm:pb:renewalProduct:j_id71','','a1KOO00000BVEQ9','Commercial property','','')
        }
    }
 
    else if (document.title.includes('Search ~ Salesforce') && PickProduct == 4) {
        localStorage.setItem('PickProduct', 0);
 
        var frame3 = document.getElementById('resultsFrame');
        if (frame3) {
 
            var frameDocument3 = frame3.contentDocument || frame3.contentWindow.document;
            top.window.opener.lookupPick('pg:frm','pg:frm:pb:renewalProduct:j_id71_lkid','pg:frm:pb:renewalProduct:j_id71','','a1KOO00000I4BCD','Security Services','','')
        }
    }
 
    else if (document.title.includes('Task: ') && CloseTask == 1) {
        localStorage.setItem('CloseTask', 0)
        //document.getElementById('tsk12').value = 'Completed';
 
        var tComment = document.evaluate('/html/body/div/div[2]/table/tbody/tr/td[2]/form/div/div[2]/div[6]/table/tbody/tr/td[2]/textarea', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
 
        if (tComment) {
            alert("Check for instructions in the comment.")
        }
 
        document.evaluate('//*[@id="topButtonRow"]/input[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
 
        localStorage.setItem('YallaRenew', 1)
    }
 
    else if (document.title.includes('Client file: ') && YallaRenew == 1) {
        localStorage.setItem('YallaRenew', 0)
 
        var url = localStorage.getItem('url');
        var parts = url.split('/');
        var idWithFragment = parts[parts.length - 1]; // Get the part after the last '/'
        var idParts = idWithFragment.split('/'); // Split by '#' to separate the ID from the fragment
        //var id = idParts[0]; // Get the ID part
        var id = parts[3];
 
        if (url.includes("?srPos")) {
            window.location.href = 'https://threeholdings--c.vf.force.com/apex/MGAClientFileStatusChangePage?id=' + url.match(/(?<=\.com\/)[^?]+(?=\?srPos)/) + '&status=Renewed';
        }
 
        else {
            window.location.href = 'https://threeholdings--c.vf.force.com/apex/MGAClientFileStatusChangePage?id=' + id + '&status=Renewed';
        }
        localStorage.setItem('RenewFile', 1);
    }
 
    else if (document.title.includes('Client file: ')) {
        const input = document.createElement('input');
        input.type = 'file';
        input.style.display = 'none';
        input.addEventListener('change', handleFileSelect, false);
 
        // Append the input element to the body
        document.body.appendChild(input);
 
        // Trigger the file dialog
        input.click();
 
        // Remove the input element after the file dialog is closed
        input.addEventListener('click', function() {
            document.body.removeChild(input);
        }, {once: true});
 
        function handleFileSelect(event) {
            const file = event.target.files[0];
 
            if (file) {
                const reader = new FileReader();
 
                reader.onload = function(e) {
                    const content = e.target.result;
                    localStorage.setItem('RContent', content)
 
                    if (content) {
                        localStorage.setItem('url', window.location.href)
                        url = window.location.href
                        parts = url.split('/');
                        idWithFragment = parts[parts.length - 1]; // Get the part after the last '/'
                        idParts = idWithFragment.split('/'); // Split by '#' to separate the ID from the fragment
                        //var id = idParts[0]; // Get the ID part
                        id = parts[3];
 
                        SPN = document.evaluate('//*[@id="ep"]/div[2]/div[3]/table/tbody/tr[2]/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent
                        if (SPN.includes('-202')) {
                            SPN = SPN.slice(0, -9)
                        }
                        localStorage.setItem('SPN', SPN)
 
                        // Find the element that contains the text 'RAST'
                        var element = document.evaluate("//a[contains(text(), 'RAST')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
 
                        if (element) {
                            // Retrieve the full XPath (simulated manually, as JavaScript doesn't natively have a getFullXPath method)
                            var xpath = getFullXPath(element); // You would need a helper function like getFullXPath
 
                            // Trim the last 4 characters and add 'td[1]/a[2]'
                            var newXPath = xpath.slice(0, -4) + "td[1]/a[2]";
 
                            // Retrieve the new element using the modified XPath
                            var newElement = document.evaluate(newXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
 
                            if (newElement) {
                                // Get the text content of the new element
                                var newText = newElement.textContent.trim();
 
                                // Perform different actions based on the text content
                                if (newText === "Del") {
                                    if (url.includes("?srPos")) {
                                        window.location.href = 'https://threeholdings--c.vf.force.com/apex/MGAClientFileStatusChangePage?id=' + url.match(/(?<=\.com\/)[^?]+(?=\?srPos)/) + '&status=Renewed';
                                    }
 
                                    else {
                                        window.location.href = 'https://threeholdings--c.vf.force.com/apex/MGAClientFileStatusChangePage?id=' + id + '&status=Renewed';
                                    }
                                    localStorage.setItem('RenewFile', 1);
                                } else if (newText === "Cls") {
                                    var href = element.getAttribute('href');
                                    window.location.href = 'https://threeholdings.my.salesforce.com' + href + '/e?close=1&retURL=%2F' + id;
                                    //window.location.href = 'https://threeholdings.my.salesforce.com' + href + '/e?retURL=%2F' + id;
                                    localStorage.setItem('CloseTask', 1)
                                }
                            }
                        }
 
                        else {
                            if (url.includes("?srPos")) {
                                window.location.href = 'https://threeholdings--c.vf.force.com/apex/MGAClientFileStatusChangePage?id=' + url.match(/(?<=\.com\/)[^?]+(?=\?srPos)/) + '&status=Renewed';
                            }
 
                            else {
                                window.location.href = 'https://threeholdings--c.vf.force.com/apex/MGAClientFileStatusChangePage?id=' + id + '&status=Renewed';
                            }
                            localStorage.setItem('RenewFile', 1);
                        }
                    }
                };
 
                reader.readAsText(file);
            } else {
                console.error('No file selected');
            }
        }
 
        function handleButtonClickBP(event) {
            const input = document.createElement('input');
            input.type = 'file';
            input.style.display = 'none';
            input.addEventListener('change', handleFileSelectBP, false);
 
            // Append the input element to the body
            document.body.appendChild(input);
 
            // Trigger the file dialog
            input.click();
 
            // Remove the input element after the file dialog is closed
            input.addEventListener('click', function() {
                document.body.removeChild(input);
            }, {once: true});
        }
 
        function handleFileSelectBP(event) {
            const file = event.target.files[0];
 
            if (file) {
                const reader = new FileReader();
 
                reader.onload = function(e) {
                    const content = e.target.result;
                    localStorage.setItem('RContent', content)
 
                    if (content) {
                        localStorage.setItem('url', window.location.href)
                        url = window.location.href
                        parts = url.split('/');
                        idWithFragment = parts[parts.length - 1]; // Get the part after the last '/'
                        idParts = idWithFragment.split('/'); // Split by '#' to separate the ID from the fragment
                        //var id = idParts[0]; // Get the ID part
                        id = parts[3];
 
                        if (url.includes("?srPos")) {
                            window.location.href = 'https://threeholdings--c.vf.force.com/apex/MGAClientFileStatusChangePage?id=' + url.match(/(?<=\.com\/)[^?]+(?=\?srPos)/) + '&status=Renewed';
                        }
 
                        else {
                            window.location.href = 'https://threeholdings--c.vf.force.com/apex/MGAClientFileStatusChangePage?id=' + id + '&status=Renewed';
                        }
 
                        localStorage.setItem('RenewFile', 1);
                        localStorage.setItem('RenewBP', 1);
                    }
                };
 
                reader.readAsText(file);
            } else {
                console.error('No file selected');
            }
        }
 
        // Helper function to get the full XPath of an element
        function getFullXPath(el) {
            var xpath = '';
            while (el && el.nodeType === Node.ELEMENT_NODE) {
                var index = 0;
                var sibling = el.previousSibling;
                while (sibling) {
                    if (sibling.nodeType === Node.ELEMENT_NODE && sibling.nodeName === el.nodeName) {
                        index++;
                    }
                    sibling = sibling.previousSibling;
                }
                var tagName = el.nodeName.toLowerCase();
                var position = (index ? "[" + (index + 1) + "]" : "");
                xpath = "/" + tagName + position + xpath;
                el = el.parentNode;
            }
            return xpath;
        }
    }
})();
