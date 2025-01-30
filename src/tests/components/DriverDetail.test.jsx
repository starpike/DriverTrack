import { render, screen } from '@testing-library/react';
import DriverDetail from '../../components/DriverDetail';
import '@testing-library/jest-dom'; 
import { describe, it, expect, vi } from 'vitest';

vi.mock('../../components/Activity', () => {
  return {
    default: ({ traceData }) => (
      <div data-testid="activity-component">
        Mocked Activity Component - traceData length: {traceData.length}
      </div>
    ),
  };
});

const sampleDriverData = {
  driverID: 1,
  forename: 'Stuart',
  surname: 'Kinlochan',
  vehicleRegistration: 'ABC-123',
  traces: [
    {
      date: '2023-10-01',
      activity: [
        { startTime: '08:00', type: 'rest', duration: 30 },
        { startTime: '09:00', type: 'work', duration: 120 },
      ],
    },
    {
      date: '2023-10-02',
      activity: [
        { startTime: '10:00', type: 'available', duration: 60 },
        { startTime: '11:00', type: 'drive', duration: 45 },
      ],
    },
  ],
};

const emptyTracesDriverData = {
  driverID: 2,
  forename: 'Jane',
  surname: 'Smith',
  vehicleRegistration: 'XYZ-789',
  traces: [],
};

describe('DriverDetail Component', () => {
  
    it('renders driver forename and surname correctly', () => {
    render(<DriverDetail driverData={sampleDriverData} />);

    const headingElement = screen.getByRole('heading', {
      name: /stuart kinlochan/i,
    });
    expect(headingElement).toBeInTheDocument();
  });

  it('renders vehicle registration correctly', () => {
    render(<DriverDetail driverData={sampleDriverData} />);

    const registrationElement = screen.getByText(/registration: abc-123/i);
    expect(registrationElement).toBeInTheDocument();
  });

  it('renders the Activity component with correct traceData', () => {
    render(<DriverDetail driverData={sampleDriverData} />);

    const activityComponent = screen.getByTestId('activity-component');
    expect(activityComponent).toBeInTheDocument();
    expect(activityComponent).toHaveTextContent(
      `Mocked Activity Component - traceData length: ${sampleDriverData.traces.length}`
    );
  });

  it('renders correctly with empty traces', () => {
    render(<DriverDetail driverData={emptyTracesDriverData} />);

    const headingElement = screen.getByRole('heading', {
      name: /jane smith/i,
    });
    expect(headingElement).toBeInTheDocument();

    const registrationElement = screen.getByText(/registration: xyz-789/i);
    expect(registrationElement).toBeInTheDocument();

    const activityComponent = screen.getByTestId('activity-component');
    expect(activityComponent).toBeInTheDocument();
    expect(activityComponent).toHaveTextContent(
      `Mocked Activity Component - traceData length: ${emptyTracesDriverData.traces.length}`
    );
  });
});
