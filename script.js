// Function to open the enlarged image modal
function openEnlargedImage(src) {
    'use strict';
    var modal = document.querySelector('.enlarged-image-modal');
    var enlargedImage = document.querySelector('.enlarged-image');

    // Create a new Image object
    var img = new Image();

    // Set up an event listener for the 'load' event
    img.onload = function () {
        // Once the image is loaded, set the source for the enlarged image
        enlargedImage.src = src;
        modal.style.display = 'flex';
    };

    // Set the source for the image AFTER setting up the event listener
    img.src = src;
}

// Function to close the enlarged image modal
function closeEnlargedImage(event) {
    'use strict';
    // Check if the click target or its parent is the close button
    var isCloseButton = event.target.classList.contains('close-button') ||
                        event.target.parentElement.classList.contains('close-button');

    if (isCloseButton) {
        var modal = document.querySelector('.enlarged-image-modal');
        modal.style.display = 'none';
    }
}

// Event listener for closing the enlarged image modal
document.addEventListener('click', closeEnlargedImage);

// Prevent closing the modal when clicking on the enlarged image
var enlargedImage = document.querySelector('.enlarged-image');
if (enlargedImage) {
    enlargedImage.addEventListener('click', function (event) {
        'use strict';
        event.stopPropagation();
    });
}

// Function to copy the text to the clipboard with a network message
function copyText(elementId, networkMessage) {
    'use strict';
    var textElement = document.getElementById(elementId);

    // Create a textarea element
    var textArea = document.createElement("textarea");
    textArea.value = textElement.textContent;
    document.body.appendChild(textArea);

    // Select the text in the textarea
    textArea.select();

    try {
        // Copy the selected text to the clipboard using the modern clipboard API
        navigator.clipboard.writeText(textArea.value)
            .then(function () {
                // Create a custom notification with the copied address and network message
                var notification = document.createElement("div");
                notification.classList.add("copy-notification");
                notification.innerHTML = "<span style='font-weight: bold; font-size: 110%;'>Address copied!</span><br>" + networkMessage.replace(/\n/g, '<br>');
                document.body.appendChild(notification);

                // After a delay, remove the notification and the temporary textarea
                setTimeout(function () {
                    document.body.removeChild(notification);
                    document.body.removeChild(textArea);
                }, 5000);
            })
            .catch(function (err) {
                console.error("Unable to copy the text: ", err);
            });

    } catch (err) {
        console.error("Unable to copy the text: ", err);
    }
}

// Function to add/remove the 'hovered' class on the crypto address
function toggleHoveredClass(addressId) {
    'use strict';
    var cryptoAddress = document.getElementById(addressId);
    cryptoAddress.classList.toggle('hovered');
}

// Add event listeners to all crypto buttons
var cryptoButtons = document.querySelectorAll('.crypto-button');

cryptoButtons.forEach(function (button) {
    'use strict';
    button.addEventListener('mouseover', function () {
        // Extract the corresponding address ID from the button's data attribute
        var addressId = this.getAttribute('data-address-id');
        toggleHoveredClass(addressId);
    });

    button.addEventListener('mouseout', function () {
        // Extract the corresponding address ID from the button's data attribute
        var addressId = this.getAttribute('data-address-id');
        toggleHoveredClass(addressId);
    });
});
