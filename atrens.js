(async function() {
    'use strict';
    let xdxd = localStorage.getItem('xdxd');
    let timetoamendaddress = localStorage.getItem('timetoamendaddress');
    let url = localStorage.getItem('url');

    if (document.title.includes('Client file:')) {
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

                    if (content) {
                        var url = window.location.href;
                        var parts = url.split('/');
                        var idWithFragment = parts[parts.length - 1]; // Get the part after the last '/'
                        var idParts = idWithFragment.split('/'); // Split by '#' to separate the ID from the fragment
                        //var id = idParts[0]; // Get the ID part
                        var id = parts[3];
                        
                        localStorage.setItem('xdxd', "1")

                        if (url.includes("?srPos")) {
                            window.location.href = 'https://threeholdings--c.vf.force.com/apex/MGAClientFileStatusChangePage?id=' + url.match(/(?<=\.com\/)[^?]+(?=\?srPos)/) + '&status=Renewed';
                        } else {
                            window.location.href = 'https://threeholdings--c.vf.force.com/apex/MGAClientFileStatusChangePage?id=' + id + '&status=Renewed';
                        }
                    };
                }
            }
        }
    }
    } else if (window.location.href.includes('MGAClientFileStatusChangePage') && localStorage.getItem('xdxd') === "1") {
        alert(timetorenew);
    } else if (document.title.includes('Client file:') && localStorage.getItem('timetoamendaddress') === 'true') {
        console.log('timetoamendaddress before navigation:', localStorage.getItem('timetoamendaddress'));
        localStorage.setItem('timetoamendaddress', 'false');
        url = localStorage.getItem('url');
        let id = url.split('/')[3];

        if (url.includes("?srPos")) {
            window.location.href = 'https://threeholdings--c.vf.force.com/apex/MGAClientFileAccountChange?scontrolCaching=1&id=' + url.match(/(?<=\.com\/)[^?]+(?=\?srPos)/);
        } else {
            window.location.href = 'https://threeholdings--c.vf.force.com/apex/MGAClientFileAccountChange?scontrolCaching=1&id=' + id;
        }
    }
})();
