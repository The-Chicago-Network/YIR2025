// Return a random item from an array
export const returnRandom = arr => arr[Math.floor(Math.random() * arr.length)];

/* Generate a series of <tcn-event> elements from an array of event objects, and an array of color values. Event object array example:
 * [
 *  {
 *   title: "Well, if this wasn't a good time!"
 *  }
 * ]

*/

export const eventGenerator = (arr, container, colorArr) => {
    arr.forEach((x) => {
        document.querySelector(container).innerHTML += `
                <tcn-event
                    title="${x.title}"
                    color="${returnRandom(colorArr)}">
                </tcn-event>
                `;
    });
};

/* Generate a series of cards containing images  from an array of objects:
 * [
 *  {
 *   imgUrl: "Image_URL",
 *   imgAlt: "Image_Alt_Text"
 *  }
 * ]
*/

export const cardGenerator = (arr, container, className) => {
    arr.forEach((x) => {
      console.log(x.imgUrl)
        document.querySelector(container).innerHTML += `
                <basic-card class="${className}">
                <div class="imageContainer">
                  <img src="${x.imgUrl}" alt="${x.imgAlt}">
                </div>
                </basic-card>
                `;
    });
};

// Returns window dimensions: ["x","y"]
export const getWindowDimensions = () => {return [window.innerWidth.toString(),window.innerHeight.toString()]};

// Updates attributes on each of an array of elements
export const updateAttributes = (elementArr, attributeArr) => {
  elementArr.forEach((x) => {
    attributeArr.forEach((y) => {
      x.setAttribute(y.attributeName, y.attributeValue)
    });
  });
};
