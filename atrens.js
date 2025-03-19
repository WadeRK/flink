// ==UserScript==
// @name         Client File Validator
// @namespace    https://github.com/yourusername/yourrepo
// @version      1.0
// @description  Validate and navigate based on client file input
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(async function() {
    if (document.title.includes('Client file:')) {
        localStorage.setItem('url', window.location.href);
        let url = window.location.href;
        let parts = url.split('/');
        let id = parts[3];

        // Open file picker
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'text/plain';
        input.onchange = async (event) => {
            const file = event.target.files[0];
            if (!file) return;

            const text = await file.text();
            const lines = text.split('\n').map(line => line.trim()).filter(line => line);
            if (lines.length === 0) {
                alert('The selected file is empty.');
                return;
            }

            // Store variables in localStorage
            localStorage.setItem('storedVariables', JSON.stringify(lines));
            localStorage.setItem('timetorenew', 'true');

            console.log('timetorenew:', localStorage.getItem('timetorenew'));

            const expdate = lines[3];
            const xpath = '/html/body/div/div[2]/table/tbody/tr/td[2]/div[4]/div[2]/div[3]/table/tbody/tr[4]/td[2]';
            const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (!element) {
                alert('XPath element not found.');
                return;
            }

            const pageValue = element.textContent.trim();
            if (expdate !== pageValue) {
                alert(`Mismatch! Expected: ${expdate}, Found: ${pageValue}`);
                return;
            }

            if (url.includes("?srPos")) {
                window.location.href = 'https://threeholdings--c.vf.force.com/apex/MGAClientFileStatusChangePage?id=' + url.match(/(?<=\.com\/)[^?]+(?=\?srPos)/) + '&status=Renewed';
            } else {
                window.location.href = 'https://threeholdings--c.vf.force.com/apex/MGAClientFileStatusChangePage?id=' + id + '&status=Renewed';
            }
        };
        input.click();
    } else if (window.location.href.includes('MGAClientFileStatusChangePage') && localStorage.getItem('timetorenew') === 'true') {
        console.log('timetorenew before clicking save:', localStorage.getItem('timetorenew'));
        
        // Click the save button automatically
        const saveButton = document.getElementById('pg:frm:pb:saveButton');
        if (saveButton) {
            saveButton.click();
            localStorage.setItem('timetorenew', 'false');
            localStorage.setItem('timetoamendaddress', 'true');
            console.log('timetorenew after clicking save:', localStorage.getItem('timetorenew'));
            console.log('timetoamendaddress set to:', localStorage.getItem('timetoamendaddress'));
        } else {
            console.log('Save button not found.');
        }
    } else if (document.title.includes('Client file:') && localStorage.getItem('timetoamendaddress') === 'true') {
        console.log('timetoamendaddress before navigation:', localStorage.getItem('timetoamendaddress'));
        localStorage.setItem('timetoamendaddress', 'false');
        let url = localStorage.getItem('url');
        let id = url.split('/')[3];

        if (url.includes("?srPos")) {
            window.location.href = 'https://threeholdings--c.vf.force.com/apex/MGAClientFileAccountChange?scontrolCaching=1&id=' + url.match(/(?<=\.com\/)[^?]+(?=\?srPos)/);
        } else {
            window.location.href = 'https://threeholdings--c.vf.force.com/apex/MGAClientFileAccountChange?scontrolCaching=1&id=' + id;
        }
    }
})();
