jest.mock('axios');

const axios = require('axios');
const { generateSummary } = require('../src/services/summary');

const sampleCustomer = {
  firstName: 'Jane',
  lastName: 'Roe',
  email: 'jane.roe@gmail.com',
  phone: '+880123456789',
  dateOfBirth: '1995-05-05',
  nationality: 'Bangladesh',
  gender: 'Female',
  age: 29,
  notes: 'Premium client',
};

describe('summary service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns Hugging Face summary text when API succeeds', async () => {
    axios.post.mockResolvedValueOnce({
      data: [{ generated_text: 'Prompt Jane. Jane Roe is awesome.' }],
    });
    const summary = await generateSummary(sampleCustomer, {
      SUMMARY_PROVIDER: 'hf',
      HF_API_KEY: 'fake-key',
    });
    expect(summary).not.toHaveLength(0);
    expect(axios.post).toHaveBeenCalled();
  });

  it('returns empty string when API fails', async () => {
    axios.post.mockRejectedValueOnce(new Error('network'));
    const summary = await generateSummary(sampleCustomer, {
      SUMMARY_PROVIDER: 'hf',
      HF_API_KEY: 'fake-key',
    });
    expect(summary).toBe('');
  });

  it('returns empty string when HF key missing', async () => {
    const summary = await generateSummary(sampleCustomer, {
      SUMMARY_PROVIDER: 'hf',
      HF_API_KEY: '',
    });
    expect(summary).toBe('');
    expect(axios.post).not.toHaveBeenCalled();
  });
});
