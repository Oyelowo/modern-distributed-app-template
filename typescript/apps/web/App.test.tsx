import { render, screen, setupServer, rest } from './utils/test-utils';

const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => res(ctx.json({ greeting: 'hello there' })))
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders learn react link', () => {
  render(<div>learn react </div>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
