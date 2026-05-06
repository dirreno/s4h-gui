import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../renderer/App';

describe('App', () => {
  it('should render', () => {
    const { getByText } = render(<App />);

    expect(getByText('s4h gui')).toBeInTheDocument();
    expect(getByText('Dashboard')).toBeInTheDocument();
  });
});
