import { insertItinerarySchema } from '../shared/schema';

const sample = {
  tripId: 1,
  day: 1,
  date: new Date().toISOString(),
  activities: [{ time: '09:00', title: 'break', description: '', location: '' }],
  notes: 'test notes'
};

try {
  // mimic server coercion
  const body = { ...sample };
  if (typeof body.date === 'string') body.date = new Date(body.date);
  const parsed = insertItinerarySchema.parse(body);
  console.log('Parsed OK:', parsed);
} catch (err) {
  console.error('Parse error:', err.errors || err);
  process.exit(1);
}
