import React from "react";
import renderer, {act} from 'react-test-renderer';

import ReactEmbedGist from "./ReactEmbedGist";

test("handles loading fallback", async () => {
  let testRenderer;

  act(() => testRenderer = renderer.create(
    <ReactEmbedGist
      gist="msaracevic/5d757e2fc72482a9a4a439969500c2eb"
      wrapperClass="gist__bash"
      loadingClass="loading__screen"
      titleClass="gist__title"
      errorClass="gist__error"
      contentClass="gist__content"
      file=".bash_profile.sh"
      loadingFallback={<p>Loading fallback</p>}
    />
  ));

  const testInstance = testRenderer.root;
  expect(testInstance.findByProps({className: "loading__screen"}).children.length).toBe(1)
});
