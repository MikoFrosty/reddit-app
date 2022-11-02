import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import Home from "./Home";
import renderer from "react-test-renderer";

/////// TESTING MOCKS ///////
/*
// mock the fetchReddit action creator
const fetchReddit = jest.mock("../../app/redditSlice", () => ({
  ...jest.requireActual("../../app/redditSlice"),
  fetchReddit: jest.fn(),
}));

// mock the useSelector hook
const useSelector = jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
})); 

const useDispatch = jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
}));
const useEffect = jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useEffect: jest.fn(),
}));
const useState = jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useState: jest.fn(),
}));
// mock selectSubreddit
const selectSubreddit = jest.mock("../../app/redditSlice", () => ({
    ...jest.requireActual("../../app/redditSlice"),
    selectSubreddit: jest.fn(),
}));
// mock selectRedditStatus
const selectRedditStatus = jest.mock("../../app/redditSlice", () => ({
    ...jest.requireActual("../../app/redditSlice"),
    selectRedditStatus: jest.fn(),
}));
// mock selectRedditResults
const selectRedditResults = jest.mock("../../app/redditSlice", () => ({
    ...jest.requireActual("../../app/redditSlice"),
    selectRedditResults: jest.fn(),
}));
// mock selectSearchTerm
const selectSearchTerm = jest.mock("../../app/redditSlice", () => ({
    ...jest.requireActual("../../app/redditSlice"),
    selectSearchTerm: jest.fn(),
}));
*/

describe("Home", () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
    // fix for video pause() error
    jest
      .spyOn(window.HTMLMediaElement.prototype, "pause")
      .mockImplementation(() => {});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("matches snapshot after 100ms (store status should be 'loading')", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // wait 100ms
    await waitFor(() => new Promise((r) => setTimeout(r, 100)));

    const tree = renderer
      .create(
        <Provider store={store}>
          <Home />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });

  it("renders skeletons on page load", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    await waitFor(() => {
      expect(
        // eslint-disable-next-line testing-library/no-node-access
        document.querySelector(".react-loading-skeleton")
      ).toBeInTheDocument();
    });
  });

  it("render search field after loading posts (3 second wait)", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    await waitFor(
      () => {
        expect(
          screen.getByPlaceholderText("Search Posts...")
        ).toBeInTheDocument();
      },
      {
        timeout: 3000,
      }
    );
  });

  it("renders posts after fetch (3 second wait)", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    await waitFor(
      () => {
        const container = screen.getByTestId("redditResults");
        expect(container).toBeInTheDocument();
      },
      {
        timeout: 3000,
      }
    );
    await waitFor(() => {
      screen.findAllByTestId("redditPost").then((posts) => {
        expect(posts).toHaveLength(10);
      });
    });
  });

  it("renders a load more button after loading posts (3 second wait)", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    await waitFor(
      () => {
        expect(screen.getByText("Load More")).toBeInTheDocument();
      },
      {
        timeout: 3000,
      }
    );
    await waitFor(() => {
      expect(screen.getByText("Load More")).toBeEnabled();
    });
    await waitFor(() => {
      expect(screen.getByText("Load More")).toHaveAttribute("type", "button");
    });
  });
});
