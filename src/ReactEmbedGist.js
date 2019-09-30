import React, {Component} from 'react';

export default class ReactEmbedGist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      title:   '',
      content: ''
    };

    this.handleNetworkErrors = this.handleNetworkErrors.bind(this);
  }

  componentDidMount() {
    this.getGist();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.gist !== this.props.gist) this.getGist();
  }

  async getGist() {
    /*
     * Load gist from github and attach callback to be executed once this script finishes loading
     * The callbacks are going to be named as gist_callback_:ID where ID is the hash of the gist
     */
    const {gist, file} = this.props,
          id           = gist.split('/')[1];

    if (!id) return this.setState({loading: false, error: `${gist} is not valid format`});

    await this.setState({loading: true});
    this.setupCallback(id);

    const script = document.createElement('script');
    let url = `https://gist.github.com/${gist}.json?callback=gist_callback_${id}`;
    if (file) url += `&file=${file}`;
    script.type = 'text/javascript';
    script.src = url;
    script.onerror = (e) => this.handleNetworkErrors(e);
    document.head.appendChild(script);
  }

  handleNetworkErrors(e) {
    /*
     * Unfortunately there is no clean / easy way to track if this is 404 or something else, so in that case
     * just say it failed to load regardless of reason
     */
    this.setState({
      loading: false,
      error:   `${this.props.gist} failed to load`
    });
  }

  setupCallback(id) {
    window[`gist_callback_${id}`] = function (gist) {
      /*
       * Once we call this callback, we are going to set description of gist as title and fill the content. We are
       * also going to set loading flag into false to render the content
       */
      const nextState = {loading: false, error: gist.error || null};

      if (!nextState.error) {
        nextState.title = gist.description;
        nextState.content = `${gist.div.replace(/href=/g, 'target="_blank" href=')}`
      }

      this.setState(nextState);

      /*
       * Not perfect way to do things, ideally parent component would have state of all loaded stylesheets
       * and add them as needed, but because I want to keep this as module and you can call more than once
       * this component, the only easy way for now is to check if the head already has this stylesheet inside
       *
       * NOTE: document.styleSheets doesn't work here, since stylesheet will be added there only once it is
       *       fully loaded, which means that if you have this component twice or more in a row there is high
       *       chance it will not recognize this stylesheet as already added. Hence this solution with checking
       *       innerHMTL to be sure that we don't have any css loaded twice
       */
      if (document.head.innerHTML.indexOf(gist.stylesheet) === -1) {
        let stylesheet = document.createElement('link');
        stylesheet.type = 'text/css';
        stylesheet.rel = 'stylesheet';
        stylesheet.href = gist.stylesheet;
        document.head.appendChild(stylesheet);
      }
    }.bind(this);
  }

  render() {
    const {loadingClass, wrapperClass, titleClass, contentClass, errorClass} = this.props;

    if (this.state.loading) {
      return <article className={loadingClass}>Loading...</article>
    } else if (this.state.error) {
      return <article className={errorClass}>
        {this.state.error}
      </article>
    } else {
      return <article className={wrapperClass}>
        <h2 className={titleClass}>{this.state.title}</h2>
        <section className={contentClass} dangerouslySetInnerHTML={{__html: this.state.content}}/>
      </article>
    }
  }
}

/*
 *   Example usage (all but gist parameter are optional):
 *
 *   <ReactEmbedGist gist="msaracevic/5d757e2fc72482a9a4a439969500c2eb"
 *                   wrapperClass="gist__bash"
 *                   loadingClass="loading__screen"
 *                   titleClass="gist__title"
 *                   errorClass="gist__error"
 *                   contentClass="gist__content"
 *                   file=".bash_profile.sh"/>
 */
