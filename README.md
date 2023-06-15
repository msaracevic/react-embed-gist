# React Embed Gist

[![NPM Weekly Downloads](https://img.shields.io/npm/dw/react-embed-gist)](https://www.npmjs.com/package/react-embed-gist)
[![GitHub license](https://img.shields.io/github/license/msaracevic/react-embed-gist.svg)](https://github.com/msaracevic/react-embed-gist/blob/master/LICENSE)
[![GitHub last-commit](https://img.shields.io/github/last-commit/msaracevic/react-embed-gist.svg)](https://github.com/msaracevic/react-embed-gist/)
[![GitHub issues-raw](https://img.shields.io/github/issues-raw/msaracevic/react-embed-gist.svg)](https://github.com/msaracevic/react-embed-gist/)

Simple react component which can embed gist in your react application

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
     loadingFallback={<Loading />}
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
* `loadingFallback` - *optional*, if you want to pass custom loading component which is displayed during loading time
