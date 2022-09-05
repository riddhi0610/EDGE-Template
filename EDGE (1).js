"use strict"; // Used to prevent common JS errors
// Note: Array.from converts querySelectorAll from Nodelist to Array
// This is useful when using array methods such as push, pop, slice etc.

/*---------------------------------- Flip Cards ------------------------------*/
// Select all the flip cards from the HTML
const flipCards = Array.from(document.querySelectorAll(".card-flip"));

// Add a click event listener to toggle "flipped" class on each card
for (let card of flipCards) {
    card.addEventListener("click", function () {
        this.classList.toggle("flipped");
    });
}


// /*---------------------------------- Carousel Height ------------------------------*/
// Source https://coderwall.com/p/uf2pka/normalize-twitter-bootstrap-carousel-slide-heights
function carouselNormalization() {
    var items = Array.from(document.querySelectorAll('.carousel-item')), //grab all slides
        heights = [], //create empty array to store height values
        tallest; //create variable to make note of the tallest slide

    if (items.length) {
        function normalizeHeights() {
            items.forEach(item => {// add heights to array

                if (!item.classList.contains("active")) { // if not active slide
                    // display and hide the element quickly to get its height
                    item.style.display = "block";
                    heights.push(item.offsetHeight);
                    item.removeAttribute('style') // removes any styles added with JS
                } else {
                    heights.push(item.offsetHeight);
                }

            })

            tallest = Math.max.apply(null, heights); //cache largest value
            items.forEach(item => {//update min height
                item.style.minHeight = `${tallest}px`
            })

        };
        normalizeHeights();

        const reset = () => {
            //reset vars
            tallest = 0;
            heights.length = 0;
            //reset min height
            items.forEach(item => {
                item.style.minHeight = "0"
            })
            // run again
            normalizeHeights();
        }

        window.addEventListener("resize", reset);
        window.addEventListener("orientationchange", reset);
    }
}

carouselNormalization()



// *-------------------------------------- Bootstrap collapse for select ------------------------------------*
const selects = document.querySelectorAll("select"); // getting all selects

const collapse = (option, show) => {// takes select option as paramater and shows or hides associated collapse
    const bsTarget = option.attributes.getNamedItem('data-bs-target')
    const targetId = bsTarget ? bsTarget.value : null
    const collapseItem = targetId ? document.querySelector(targetId) : null

    if (collapseItem) {
        if (show) {
            collapseItem.classList.add("show")
        } else {
            collapseItem.classList.remove("show")
        }
    }

}

selects.forEach(select => {
    const options = Array.from(select.children) // getting options for each select

    // checking if the select is a Bootstrap collapse
    let isBsCollapse = false
    options.forEach(option => {
        const bsToggle = option.attributes.getNamedItem("data-bs-toggle");
        if (bsToggle && bsToggle.value === "collapse") { // if option has data-bs-toggle

            isBsCollapse = true
        }

    })

    if (isBsCollapse) {
        select.addEventListener("change", e => {
            const { selectedIndex } = select;

            const options = Array.from(e.target.options);

            options.forEach((option, idx) => {
                if (idx === selectedIndex) {
                    // if selected, show the associated collapse
                    collapse(option, true)
                } else {
                    // hide all other collapses
                    collapse(option, false)
                }
            })


        })
    }
})