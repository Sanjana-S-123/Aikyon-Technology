// Ensure the script waits for the entire HTML document to load
document.addEventListener('DOMContentLoaded', () => {
    // 1. Define the slides, linking background IDs to content IDs
    const slideData = [
        { bg: 'slide-1-bg', content: 'slide-1-content' },
        { bg: 'slide-2-bg', content: 'slide-2-content' },
        { bg: 'slide-3-bg', content: 'slide-3-content' },
        { bg: 'slide-4-bg', content: 'slide-4-content' },
        { bg: 'slide-5-bg', content: 'slide-5-content' },
        { bg: 'slide-6-bg', content: 'slide-6-content' },
        { bg: 'slide-7-bg', content: 'slide-7-content' } 
    ];
    
    let currentSlideIndex = 0;
    const intervalTime = 5000; // 5 seconds per slide

    // 2. Function to transition between slides
    function showSlide(index) {
        // Ensure index is within bounds and wrap around
        const newIndex = index % slideData.length;

        // Clear 'current' classes from ALL elements first
        slideData.forEach(slide => {
            // Check if the element exists before trying to access its classList
            const bgElement = document.getElementById(slide.bg);
            const contentElement = document.getElementById(slide.content);

            if (bgElement) bgElement.classList.remove('current-bg');
            if (contentElement) contentElement.classList.remove('current-content');
        });

        // Add 'current' classes to the new slide
        const nextBgElement = document.getElementById(slideData[newIndex].bg);
        const nextContentElement = document.getElementById(slideData[newIndex].content);

        if (nextBgElement) nextBgElement.classList.add('current-bg');
        if (nextContentElement) nextContentElement.classList.add('current-content');

        // Update the current index
        currentSlideIndex = newIndex;
    }

    // 3. Auto-cycling function
    function cycleSlides() {
        // Calculate the next index
        const nextIndex = (currentSlideIndex + 1);
        showSlide(nextIndex);
    }

    // 4. Initial Load: Show the first slide immediately (This is now redundant
    //    as the first slide has the classes in the HTML, but it's good practice
    //    to initialize the state).
    showSlide(currentSlideIndex);

    // 5. Start the automatic slideshow interval
    setInterval(cycleSlides, intervalTime);
});
// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Dropdown toggle for mobile
const dropdowns = document.querySelectorAll('.dropdown, .dropdown-submenu');

dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
        if(window.innerWidth <= 768){
            e.stopPropagation();
            const submenu = dropdown.querySelector('ul');
            submenu.classList.toggle('active');
        }
    });
});

// Dynamic Year in Footer
document.getElementById("currentYear").textContent = new Date().getFullYear();


// Function called by the 'onclick' event in the HTML headers
function toggleAccordion(headerElement) {
    // Find the content body (the sibling div immediately after the header)
    const contentBody = headerElement.nextElementSibling;
    const parentItem = headerElement.parentElement;

    if (!contentBody || !parentItem) return;

    // Toggle the 'active' class on the parent item (for consistent styling)
    parentItem.classList.toggle('active');

    // Toggle the 'active' class on the header (for arrow rotation)
    headerElement.classList.toggle('active');

    // Handle the slide transition using max-height
    if (contentBody.classList.contains('show')) {
        // HIDE: Set max-height to 0 to trigger CSS collapse transition
        contentBody.style.maxHeight = '0';
        contentBody.classList.remove('show');
    } else {
        // SHOW: Set max-height to its natural height (scrollHeight)
        // This makes the smooth transition work, as CSS can transition from 0 to a known value
        contentBody.style.maxHeight = contentBody.scrollHeight + 'px';
        contentBody.classList.add('show');
    }
}

// Initialization script to set initial heights and attach event listeners (best practice)
document.addEventListener('DOMContentLoaded', () => {
    // 1. Target all accordion items
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const body = item.querySelector('.item-body');
        
        // 2. Initial State: If an item is active/expanded on load, set its max-height
        if (item.classList.contains('active') || body.classList.contains('show')) {
            // Set max-height to current content height for initial display
            body.style.maxHeight = body.scrollHeight + 'px';
            body.classList.add('show');
            item.querySelector('.item-header').classList.add('active'); // Activate header/arrow
        } else {
            // Ensure all inactive items start collapsed
            body.style.maxHeight = '0';
        }

        // 3. Attach click listener using JavaScript (more robust than inline 'onclick')
        const header = item.querySelector('.item-header');
        if (header && !header.onclick) { // Check if onclick isn't already set inline
            header.addEventListener('click', () => toggleAccordion(header));
        }
    });
});



