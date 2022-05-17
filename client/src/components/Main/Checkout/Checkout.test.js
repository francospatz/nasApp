import React from "react";
import { shallow } from "enzyme";
import Checkout from "./Checkout";

describe("Checkout", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Checkout />);
    expect(wrapper).toMatchSnapshot();
  });
});
