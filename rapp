let CloseTask = localStorage.getItem('CloseTask');
let OpenNewTask = localStorage.getItem('OpenNewTask');
let GUT = localStorage.getItem('GUT');
let UpdateTask = localStorage.getItem('UpdateTask');
let UTContent = localStorage.getItem('UTContent');
let UWonFile = localStorage.getItem('UWonFile');
let currentUW = localStorage.getItem('currentUW');
 
(function() {
    if (document.title.includes('Task: ') && CloseTask == 1) {
        localStorage.setItem('CloseTask', 0)
 
        var tComment = document.evaluate('/html/body/div/div[2]/table/tbody/tr/td[2]/form/div/div[2]/div[6]/table/tbody/tr/td[2]/textarea', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
 
        if (tComment) {
            alert("Check for instructions in the comment.")
        }
 
        document.evaluate('//*[@id="topButtonRow"]/input[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
        localStorage.setItem('OpenNewTask', 1)
    }
 
    if (document.title.includes('Client file: ') && OpenNewTask == 1) {
        localStorage.setItem('OpenNewTask', 0)
 
        var xpath = '//*[contains(@id, "_RelatedActivityList")]/div[1]/div/div[1]/table/tbody/tr/td[2]/input[1]';
        var button = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
 
        if (button) {
            //alert('https://threeholdings.my.salesforce.com/' + url.match(/%26eid%3D([^%]+)%26ic%3D1%26linkToken/)?.[1] + '?retURL=%2F' + id)
 
            document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
            localStorage.setItem('UpdateTask', 1)
        } else {
            alert('Button not found');
        }
    }
 
    else if (document.title.includes('Task: ') && UpdateTask == 1) {
        let line1 = '';
        let line2 = '';
        let line3 = '';
        let line4 = '';
 
        const lines = UTContent.split('\n');
        line1 = lines[0] || '';
        line2 = lines[1] || '';
        line3 = lines[2] || '';
        line4 = lines[3] || '';
 
        if (line1.includes("Underwriter on")) {
            line1 = localStorage.getItem('UWonFile')
        }
 
        tComment = document.evaluate('/html/body/div/div[2]/table/tbody/tr/td[2]/form/div/div[2]/div[6]/table/tbody/tr/td[2]/textarea', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
 
        if (tComment) {
            alert("Check for instructions in the comment.")
        }
 
        // Populate elements with IDs "tsk5" and "tsk4"
        document.getElementById('tsk1').value = line1;
        document.getElementById('00N3h00000AxyOA').value = 'Renewal application';
        document.getElementById('tsk5').value = line2;
        document.getElementById('tsk4').value = line3;
        document.getElementById('tsk12').value = 'In Progress';
        document.getElementById('reminder_select_check').checked = false;
 
        currentUW = localStorage.getItem('currentUW')
 
        if (!line4.includes(currentUW) && !line4.includes("Underwriter on File"))
        {
            alert("Potentially incorrect underwriter. Expected: '" + line4 + "' Found: '" + currentUW + "'")
        }
 
        document.evaluate('//*[@id="topButtonRow"]/input[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
 
        localStorage.setItem('UpdateTask', 0);
        localStorage.setItem('UTContent', 0);
    }
 
    else if (document.title.includes('Client file: ')) {
        const button = document.createElement('button');
        button.id = 'GTask';
        button.textContent = 'Update Task';
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.right = '20px';
 
        button.addEventListener('click', function() {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.style.display = 'none'; // Hide the file input
            fileInput.addEventListener('change', handleFileSelect, false);
 
            // Trigger the file input
            fileInput.click();
 
            // Remove the file input after file selection
            fileInput.remove();
        });
 
        // Append the button to the body
        document.body.appendChild(button);
 
        const button2 = document.createElement('button');
        button2.id = 'CTask';
        button2.textContent = 'Close Task';
        button2.style.position = 'fixed';
        button2.style.bottom = '80px';
        button2.style.right = '20px';
 
        button2.addEventListener('click', function() {
            var url = window.location.href;
            var parts = url.split('/');
            var idWithFragment = parts[parts.length - 1]; // Get the part after the last '/'
            var idParts = idWithFragment.split('/'); // Split by '#' to separate the ID from the fragment
            //var id = idParts[0]; // Get the ID part
            var id = parts[3];
 
            var currentUW = localStorage.setItem('currentUW', document.getElementById("lookup0053h000002pRso00N3h00000AxzIG").value)
 
            var element = document.evaluate("//a[contains(text(), 'RAST')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (element) {
                var href = element.getAttribute('href');
                window.location.href = 'https://threeholdings.my.salesforce.com' + href + '/e?close=1&retURL=%2F' + id;
                //window.location.href = 'https://threeholdings.my.salesforce.com' + href + '/e?retURL=%2F' + id;
                localStorage.setItem('CloseTask', 1)
            }
        });
 
        // Append the Close Task button to the body
        document.body.appendChild(button2);
 
        function handleFileSelect(event) {
            const file = event.target.files[0];
 
            if (file) {
                const reader = new FileReader();
 
                reader.onload = function(e) {
                    const content = e.target.result;
                    localStorage.setItem('UTContent', content)
 
                    if (localStorage.getItem('UTContent').includes('Underwriter on File')) {
 
                        localStorage.setItem('UWonFile', document.evaluate('/html/body/div[1]/div[2]/table/tbody/tr/td[2]/div[4]/div[2]/div[7]/table/tbody/tr[7]/td[2]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent)
                    }
 
                    if (content) {
                        var url = window.location.href;
                        var parts = url.split('/');
                        var idWithFragment = parts[parts.length - 1]; // Get the part after the last '/'
                        var idParts = idWithFragment.split('/'); // Split by '#' to separate the ID from the fragment
                        //var id = idParts[0]; // Get the ID part
                        var id = parts[3];
 
                        currentUW = localStorage.setItem('currentUW', document.evaluate("/html/body/div[1]/div[2]/table/tbody/tr/td[2]/div[4]/div[2]/div[7]/table/tbody/tr[7]/td[2]/a", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent);
 
                        if (document.title.includes('Client file'))
                        {
                            var element = document.evaluate("//a[contains(text(), 'RAST')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                            if (element) {
                                var href = element.getAttribute('href');
                                window.location.href = 'https://threeholdings.my.salesforce.com' + href + '/e?close=1&retURL=%2F' + id;
                                //window.location.href = 'https://threeholdings.my.salesforce.com' + href + '/e?retURL=%2F' + id;
                                localStorage.setItem('CloseTask', 1)
                            }
 
                            else
                            {
                                var xpath = '//*[contains(@id, "_RelatedActivityList")]/div[1]/div/div[1]/table/tbody/tr/td[2]/input[1]';
                                var button = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
 
                                if (button) {
                                    //alert('https://threeholdings.my.salesforce.com/' + url.match(/%26eid%3D([^%]+)%26ic%3D1%26linkToken/)?.[1] + '?retURL=%2F' + id)
 
                                    document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
                                    localStorage.setItem('UpdateTask', 1)
                                } else {
                                    alert('Button not found');
                                }
                            }
                        }
                    }
                };
 
                reader.readAsText(file);
            } else {
                console.error('No file selected');
            }
        }
    }
})();
