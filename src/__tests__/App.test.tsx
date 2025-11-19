import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

const mockFetch = vi.fn();

describe('App component', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    global.fetch = mockFetch;
  });

  it('renders registration counter and submits form', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response);

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    render(<App />);

    expect(await screen.findByText(/Submit new KYC profile/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '+123456789' } });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByLabelText(/Nationality/i), { target: { value: 'USA' } });
    fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'Male' } });
    fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText(/Yearly Income/i), { target: { value: '80000' } });
    fireEvent.change(screen.getByLabelText(/Current Address/i), { target: { value: '123 Street' } });
    fireEvent.change(screen.getByLabelText(/Permanent Address/i), { target: { value: '456 Avenue' } });

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });
  });
});
