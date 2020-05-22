//Aktuelles Bild als Hintergrundbild setzem
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


imageDiv = "";
//Elemente werden erst nach laden der Seite generiert --> Keine Element ist "noch nicht da"
window.onload = function() {
	imageDiv = document.getElementById('image-div');

	if (window.FileList && window.File && window.FileReader) {
		var sel = document.getElementById('img-selector');
		
		sel.addEventListener('change', event => {
			if(document.getElementById('error-message')) {
				document.getElementById('error-message').remove();
			}
			if(document.getElementById('notif-message')) {
				document.getElementById('notif-message').remove();
			}
			if(document.getElementById('image-preview')) {
				document.getElementById('image-preview').remove();
			}
			
			
			var reader = new FileReader();
			
			
			
			
			
			var imageEl = document.createElement('img');
			imageEl.id = 'image-preview';
			
			var file = event.target.files[0];
			
			if (imageEl) {
				if(!file.type.match('image.*')) {
					var errorMsg = document.createElement('h3');
					errorMsg.textContent = unescape("Du musst eine Bilddatei ausw%E4hlen");
					errorMsg.id = "error-message";
					imageDiv.insertBefore(errorMsg, imageDiv.firstChild);
					
					return;
				}
			}				 
			
			
			
			
			reader.addEventListener('load', event => {
				imageEl.src = event.target.result;
				imageDiv.insertBefore(imageEl, imageDiv.firstChild);
			});
			
			reader.readAsDataURL(file);
			
			
			imageEl.onload = function () {
				if(imageEl.naturalHeight > imageEl.naturalWidth) {
					imageEl.remove();
					
					var errorMsg = document.createElement('h3');
					errorMsg.textContent = "Das Bild darf nicht Hochkant sein.";
					errorMsg.id = "error-message";
					imageDiv.insertBefore(errorMsg, imageDiv.firstChild);
					
				}
			}
			
		}); 
	}
	
	
	document.getElementById('saveImageButton').addEventListener("click", saveImage);
}

//Bild speichern
function saveImage() {
	if(document.getElementById('error-message')) {
		document.getElementById('error-message').remove();
	}
	if(document.getElementById('notif-message')) {
		document.getElementById('notif-message').remove();
	}
	
	
	if(document.getElementById('image-preview')) {
		imageAsDataURL = document.getElementById('image-preview').src;
		
		chrome.storage.local.set({'backgroundImage': imageAsDataURL}, function() {
			
		});
		
		chrome.storage.local.get(['backgroundImage'], function(items) {
			var style = document.createElement('style');
	
			style.textContent = "html{ background-image: url('" + items.backgroundImage +"') !important;  	background-repeat: no-repeat !important; 		background-size: 100% !important;		background-attachment: fixed !important;}";
			style.type = "text/css";
			document.head.appendChild(style);
		});
		
		var errorMsg = document.createElement('h3');
		errorMsg.textContent = unescape("Hintergrundbild gespeichert");
		errorMsg.id = "notif-message";
		imageDiv.insertBefore(errorMsg, imageDiv.firstChild);
	} else {
		var errorMsg = document.createElement('h3');
		errorMsg.textContent = unescape("Du musst ein Bild einf%FCgen%2C was du als Hintergrundbild verwenden m%F6chtest");
		errorMsg.id = "error-message";
		imageDiv.insertBefore(errorMsg, imageDiv.firstChild);
	}
}




