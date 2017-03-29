# Endpoint Gallery

A web app that accepts an endpoint and presents the results as a gallery of images and polls for changes incrementally.

## Getting Started

This is a [React](https://facebook.github.io/react/) project and requires [node & npm](https://docs.npmjs.com/getting-started/installing-node) to get going. It uses [less](https://docs.npmjs.com/getting-started/installing-node) for css preprocessing.

### Get ready for it 

Make sure you have [npm](https://docs.npmjs.com/getting-started/installing-node) installed.

### Install it

```
git clone git@github.com:DeanoDee/endpointGallery.git
cd endpointGallery
npm install
```
### Run it

```
npm start
```

### Interact with it

Click the code icon and enter a new endpoint in the search box that appears and … magic. Try http://localhost:3002/alternateImages.json.

## Development

### Built with

* [React](https://facebook.github.io/react/)
* [less](https://docs.npmjs.com/getting-started/installing-node)
* [npm](https://docs.npmjs.com/getting-started/installing-node)

### Files

All the source code with the exception of the boiler plate react html (public/index.html) is located in the src folder.

### Schema Expectation

Here's what it expects and endpoint to look like:

```
{"name": [
	{
		"_id": "N0tv3ryR3a0ab13Gu1d",
		"title": "A title for the image",
		"image": "http://somedomain.com/a/url/for/the/image.jpg",
		"description": "A little something to tell the person what they are looking at",
		"tags": [
			"somethings",
			"to",
			"describe",
			"what",
			"this",
			"is"
		]
	}
]}
```

## Author

* Dino DiGiulio - designer/developer - [Profile](https://github.com/DeanoDee)

## License

This project is licensed under the MIT License 

## Future

As this was developed for a really specific instance, I could imagine working on a way to add mapping from foreign feeds to the expected scheme, subscribe to data instead of just polling.

## Acknowlagement 

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and [Custom React Scripts](https://www.npmjs.com/package/custom-react-scripts). A couple of helpers packages were used to wire this up including:  
* [flexboxgrid](https://github.com/kristoferjoseph/flexboxgrid) for the grid
* [whatwg-fetch](https://github.com/fis-components/whatwg-fetch) to polyfill safely for requesting JSON
* [react-fontawesome](https://github.com/danawoodman/react-fontawesome) to make it easy to get some icons
* [fontawesome](http://fontawesome.io) grabbing the icons themselves from a CDN
* [react-ellipsis-text](https://github.com/georgeOsdDev/react-ellipsis-text) so there were no CSS headaches with making ellipses work
* [Califonia Job Case](http://deanodee.github.io/CaliforniaJobCase/) some of DeanoDee's ideas about expressing font harmony were an inspiration to the css on this (If I do say so, meself—ed)
