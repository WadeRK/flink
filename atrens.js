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

            const expdate = lines[5];
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

            // Navigate if matched
            window.location.href = 'YOUR_TARGET_URL_HERE';
        };
        input.click();
    } else if (document.title.includes('SOME_OTHER_TITLE')) {
        // Execute a different script logic here
        console.log('Executing alternative logic...');
    }
})();
