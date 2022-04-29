import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import ReactEmbedGist from "./ReactEmbedGist";

test("handles loading fallback", async () => {
  const { container } = render(
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
  );

  expect(container.getElementsByClassName("loading__screen").length).toBe(1);
  expect(container.textContent).toBe("Loading fallback");
});
