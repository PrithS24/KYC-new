const { customerSchema } = require('../src/validators/customer');

const basePayload = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@gmail.com',
  phone: '+15551234567',
  dateOfBirth: '1990-01-01',
  nationality: 'USA',
  gender: 'Male',
  age: 30,
  yearlyIncome: 80000,
  currentAddress: '123 Main St',
  permanentAddress: '123 Main St',
  notes: 'Test account',
};

describe('customerSchema validation', () => {
  it('accepts a valid payload', () => {
    expect(() => customerSchema.parse(basePayload)).not.toThrow();
  });

  it('rejects non gmail email addresses', () => {
    const payload = { ...basePayload, email: 'john@example.com' };
    expect(() => customerSchema.parse(payload)).toThrow(/gmail\.com/);
  });

  it('rejects customers younger than 18', () => {
    const payload = { ...basePayload, age: 17 };
    expect(() => customerSchema.parse(payload)).toThrow(/Age must be at least 18/);
  });
});
