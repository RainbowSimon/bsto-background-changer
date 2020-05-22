chrome.storage.local.get(['backgroundImage'], function(items) {
	var style = document.createElement('style');
	
	style.textContent = `html{ 
							background-image: url('` + items.backgroundImage + `') !important;  	
							background-repeat: no-repeat !important; 		
							background-size: 100% !important;		
							background-attachment: fixed !important;		
							background-position: center !important;
						}`;
	style.type = "text/css";
	document.head.appendChild(style);
});