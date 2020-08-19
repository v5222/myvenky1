import React from "react";
import { render } from "react-testing-library";
import { IntlProvider } from "react-intl";

import LoginPage from "../index";

describe("<LoginPage />", () => {
  it("should render and match the snapshot", () => {
    const {
      container: { firstChild }
    } = render(
      <IntlProvider locale="en">
        <LoginPage />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
