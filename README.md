# Endpoint Gallery

A web app that accepts an endpoint and presents the results as a gallery of images

## Use

### Install it

```
git clone git@github.com:DeanoDee/endpointGallery.git
npm install
```
### Run it

```
npm start
```

### Interact with it

Click the code icon and enter a new endpoint in the search box that appears and wait for the magic

## Schema Expectation

Here's what it expects and endpoint to look like:

```
{"name": [
	{
		"id": "N0tv3ryR3a0ab13Gu1d",
		"title": "A title for the image",
		"image": "http://somedomain.com/a/url/for/the/image.jpg",
		"description": "A little something to tell the person what they are looking at"
		"tags": [
			"somethings",
			"to",
			"describe",
			"what",
			"this",
			is
		]
	}
]}
```

## Future

As this was developed for a really specific instance, I could imagine working on a way to add mapping from foreign feeds to the expected scheme...maybe.

## Acknowlagement 

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
