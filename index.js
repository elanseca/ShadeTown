import { sunglassesOptions, sunglasses } from './sunglasses.js';

const productDetailsEl = document.getElementById("productDetails")
const productImage = document.getElementById("productImage")
const productFrames = document.getElementsByClassName("product-image_frame")[0]
const productLenses = document.getElementsByClassName("product-image_lenses")[0]

let sunglassesNew = ''

const setSunglasses = (sunglassesNew = sunglasses) => sunglassesNew

function render(sunglassesNew) {

    const { model, lenses, frame} = sunglassesNew
    
     sunglassesNew = {
        model: { 
            name: model.name,
            price: model.price,
            thumbImg: model.thumbImg,
            cssClass: model.cssClass,
        },
        lenses: {
            color: lenses.color,
            price: lenses.price,
            cssClass: lenses.cssClass,
        },
        frame: {
            color: frame.color,
            price: frame.price,
            cssClass: frame.cssClass,
        }     
    }
    let price = "$" + (model.price + lenses.price + frame.price)
    
    
    productDetailsEl.innerHTML = 
    `<h1> ${sunglassesNew.model.name} </h1>
    <p> Custom: ${sunglassesNew.lenses.color} lenses, ${sunglassesNew.frame.color} frames</p>
    <p> ${price} </p>`

    let currClass = productImage.classList[1]
    productImage.classList.replace(currClass, sunglassesNew.model.cssClass)
    
    let currFramesClass = productFrames.classList[1]
    productFrames.classList.replace(currFramesClass, sunglassesNew.frame.cssClass)
    
    let currLensesClass = productLenses.classList[1]
    productLenses.classList.replace(currLensesClass, sunglassesNew.lenses.cssClass)
    
}

//Highlight current selection
function addHighlight(clickedItem) {
    if (clickedItem.classList.contains("product-thumb")) {
        Array.from(document.getElementsByClassName("product-thumb"))
            .forEach(function(thumb) {
               thumb.classList.remove("selected") 
            }) 
    } else if (clickedItem.classList.contains("product-color-swatch")) {
        let siblings = clickedItem.closest("ul").querySelectorAll("button")
        Array.from(siblings)
            .forEach(function(swatch) {
               swatch.classList.remove("selected") 
            })
    }
    clickedItem.classList.add("selected") 
}


document.body.addEventListener("click", function(event) {
    let clickedItem = event.target
    //if sunglassesNew defined take variable from updates 
        //else use original sunglasses object
    if (!sunglassesNew) {
        sunglassesNew = sunglasses
    }
    
    // update model
    if (clickedItem.classList.contains("product-thumb")) {

        let currName = clickedItem.dataset.name

        let modelOptions = sunglassesOptions.models
        .filter(function(item = 'aviator') {
            return item.name === currName
        })[0]

        const { name, price, thumbImg, cssClass} = modelOptions

        sunglassesNew = { ...sunglassesNew,
            model: { name, price, thumbImg, cssClass}

        }
       
        addHighlight(clickedItem)
        setSunglasses(sunglassesNew)
        render(sunglassesNew)

       
    } console.log(sunglassesNew)
    
    // update colors for frames / lenses
    if (clickedItem.classList.contains("product-color-swatch")) {
        let currColor = clickedItem.dataset.color
        
        // check nearest parent div
            //lenses
        if (clickedItem.closest("div").classList[0] === "product-lenses") {
            let colorOptions = sunglassesOptions.lenses
            .filter(function(item = 'sepia') {
                return item.color === currColor
            })[0]

            const { color, price, cssClass} = colorOptions
        
            sunglassesNew = {
                ...sunglassesNew,
                lenses: { color, price, cssClass }     
            }
        } 
        
        //frames
        else {
            let colorOptions = sunglassesOptions.frames
            .filter(function(item = 'charcoal') {
                return item.color === currColor
            })[0]

            const { color, price, cssClass} = colorOptions
            
            sunglassesNew = {
                ...sunglassesNew,
                frame: { color, price, cssClass}
            }
        }

        addHighlight(clickedItem)
        setSunglasses(sunglassesNew)
        render(sunglassesNew)
    }
})

render(sunglasses)