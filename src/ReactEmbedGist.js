import React, {useCallback, useEffect, useState} from 'react';
import {v4 as uuid} from 'uuid';

const ReactEmbedGist = ({
  gist,
  file,
  loadingClass,
  wrapperClass,
  titleClass,
  contentClass,
  errorClass,
  LoadingFallback,
}) => {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);

  // Unfortunately there is no clean / easy way to track if this is 404 or something else
  // In that case just say it failed to load regardless of reason
  const handleNetworkErrors = useCallback(() => {
    setError(`${gist} failed to load`);
    setLoading(false);
  }, [gist]);

  // Once we call this callback, we are going to set description of gist as title and fill the content.
  // We are also going to set loading flag into false to render the content
  const setupCallback = (instanceId) => {
    window[`gist_callback_${instanceId}`] = function (gist) {
      setLoading(false);

      if (gist.error) return setError(gist.error);

      setTitle(gist.description);
      setContent(`${gist.div.replace(/href=/g, 'target="_blank" href=')}`);
      /*
       * Not perfect way to do things, ideally parent component would have state of all loaded stylesheets
       * and add them as needed, but because I want to keep this as module, and you can call more than once
       * this component, the only easy way for now is to check if the head already has this stylesheet inside
       *
       * NOTE: document.styleSheets doesn't work here, since stylesheet will be added there only once it is
       *       fully loaded, which means that if you have this component twice or more in a row there is high
       *       chance it will not recognize this stylesheet as already added. Hence, this solution with checking
       *       innerHMTL to be sure that we don't have any css loaded twice
       */
      if (document.head.innerHTML.indexOf(gist.stylesheet) === -1) {
        let stylesheet = document.createElement('link');
        stylesheet.type = 'text/css';
        stylesheet.rel = 'stylesheet';
        stylesheet.href = gist.stylesheet;
        document.head.appendChild(stylesheet);
      }
    };
  };

  // Load gist from GitHub and attach callback to be executed once this script finishes loading
  // The callbacks are going to be named as gist_callback_:instanceId where instanceId is random UUID
  const getGist = useCallback(async () => {
    // Check if the response is fine and has ID assigned from Gist
    if (!gist.split('/')[1]) return setError(`${gist} is not valid format`);

    const instanceId = uuid().replace(/-/g, '');
    setLoading(true);
    setupCallback(instanceId);

    const script = document.createElement('script');
    let url = `https://gist.github.com/${gist}.json?callback=gist_callback_${instanceId}`;
    if (file) url += `&file=${file}`;
    script.type = 'text/javascript';
    script.src = url;
    script.onerror = () => handleNetworkErrors();
    document.head.appendChild(script);
  }, [file, gist, handleNetworkErrors]);

  useEffect(() => {
    getGist().then(() => setLoading(false));
  }, [gist, file, getGist]);

  if (loading) {
    return <article className={loadingClass}>{LoadingFallback ? <LoadingFallback/> : 'Loading ...'}</article>;
  } else if (error) {
    return <article className={errorClass}>{error}</article>;
  } else {
    return (
      <article className={wrapperClass}>
        {title && <h2 className={titleClass}>{title}</h2>}
        <section className={contentClass} dangerouslySetInnerHTML={{__html: content}}/>
      </article>
    );
  }
};

export default ReactEmbedGist;
