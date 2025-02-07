# React Embed Gist

[![NPM Weekly Downloads](https://img.shields.io/npm/dw/react-embed-gist)](https://www.npmjs.com/package/react-embed-gist)
[![GitHub license](https://img.shields.io/github/license/msaracevic/react-embed-gist.svg)](https://github.com/msaracevic/react-embed-gist/blob/master/LICENSE)
[![GitHub last-commit](https://img.shields.io/github/last-commit/msaracevic/react-embed-gist.svg)](https://github.com/msaracevic/react-embed-gist/)
[![GitHub issues-raw](https://img.shields.io/github/issues-raw/msaracevic/react-embed-gist.svg)](https://github.com/msaracevic/react-embed-gist/)

Simple react component which can embed gist in your React application

## How to use

Just import as dependency in your file and pass gist as parameter, for example:

```
import ReactEmbedGist from 'react-embed-gist';

// Only required attribute is gist
  <ReactEmbedGist
     gist="msaracevic/5d757e2fc72482a9a4a439969500c2eb"
     wrapperClass="gist__bash"
     loadingClass="loading__screen"
     titleClass="gist__title"
     errorClass="gist__error"
     contentClass="gist__content"
     file=".bash_profile.sh"
     LoadingFallback={<Loading />}
   />
```

## Attributes

* `gist` - gist you want to display, in a form of :USERNAME/:GIST_ID
* `file` - *optional*, if you want to show just a single file from the gist, you can specify it here
* `wrapperClass` - *optional*, if you want to pass your own class to `article` wrapping the gist
* `titleClass` - *optional*, if you want to pass your own class to `h2` title of the gist
* `contentClass` - *optional*, if you want to pass your own class to `section` wrapping the content
* `errorClass` - *optional*, if you want to pass your own class to `article` wrapping the error message
* `loadingClass` - *optional*, if you want to pass your own class to `article` wrapper which is displayed during loading time
* `LoadingFallback` - *optional*, if you want to pass custom loading component which is displayed during loading time


## Breaking changes
* Before version `1.0.24` used `loadingFallback` as prop name for React node to render while waiting for download. After and including version `1.0.24`
should use `LoadingFallback`

## Changelog
* `1.0.28` - Add this readme
* `1.0.27` - Update typescript definitions
* `1.0.26` - Update to React v19, rewrite 7 years old code with `useState` instead of old lifecycle methods
* `1.0.25` - We pretend this doesn't exist
* `1.0.24` - We pretend this doesn't exist
* `1.0.22 - 1.0.23` - Update dependencies
* `1.0.21` - Remove UUID from state
* `1.0.14` - Build as UMD module
* `1.0.12 - 1.0.20` - Update dependencies
* `1.0.11` - Add loading fallback component
* `1.0.10` - Add error messages
* `1.0.09` - Reload the component if gist prop changes dynamically
* `1.0.0 - 1.0.08` - Over 5 years ago, don't remember :)