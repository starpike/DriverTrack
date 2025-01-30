import { render, screen } from '@testing-library/react';
import Activity from '../../components/Activity';
import '@testing-library/jest-dom'; 
import { describe, it, expect } from 'vitest';

const sampleTraces = [
  {
    date: '2023-10-01', 
    activity: [
      { type: 'rest', duration: 30 },
      { type: 'work', duration: 120 },
    ],
  },
  {
    date: '2023-10-02',
    activity: [
      { type: 'available', duration: 60 },
      { type: 'drive', duration: 45 },
    ],
  },
  {
    date: '2023-10-03',
    activity: [
      { type: 'work', duration: 180 },
      { type: 'drive', duration: 30 },
    ],
  },
];

const emptyTraces = [];

const invalidTraces = [
  {
    date: 'invalid-date',
    activity: [
      { type: 'rest', duration: 30 },
      { type: 'work', duration: 120 },
    ],
  },
];

describe('Activity Component', () => {
  it('renders all days of the week', () => {
    render(<Activity traceData={sampleTraces} />);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it('shows active days based on traceData', () => {
    render(<Activity traceData={sampleTraces} />);

    // Days with traces: Sun (0), Mon (1), Tue (2)
    const activeDays = ['Sun', 'Mon', 'Tue'];
    const inactiveDays = ['Wed', 'Thu', 'Fri', 'Sat'];

    activeDays.forEach((day) => {
      const activeIndicator = screen.getByLabelText(`Active on ${day}`);
      expect(activeIndicator).toHaveClass('bg-green-500');
    });

    inactiveDays.forEach((day) => {
      const inactiveIndicator = screen.getByLabelText(`Inactive on ${day}`);
      expect(inactiveIndicator).toHaveClass('bg-gray-300');
    });
  });

  it('displays correct total activity duration', () => {
    render(<Activity traceData={sampleTraces} />);

    const expectedTotal = sampleTraces.reduce((total, trace) => {
      return (
        total +
        trace.activity.reduce((acc, act) => acc + act.duration, 0)
      );
    }, 0);

    expect(
      screen.getByText(`Total Activity Duration: ${expectedTotal} mins`)
    ).toBeInTheDocument();
  });

  it('displays correct duration for each activity type', () => {
    render(<Activity traceData={sampleTraces} />);

    const activityTypes = ['Rest', 'Work', 'Available', 'Drive'];

    activityTypes.forEach((type) => {

      const expectedDuration = sampleTraces.reduce((total, trace) => {
        return (
          total +
          trace.activity
            .filter((act) => act.type === type.toLowerCase())
            .reduce((acc, act) => acc + act.duration, 0)
        );
      }, 0);

      expect(
        screen.getByText(`${type}: ${expectedDuration} mins`)
      ).toBeInTheDocument();
    });
  });

  it('handles empty traceData gracefully', () => {
    render(<Activity traceData={emptyTraces} />);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach((day) => {
      const inactiveIndicator = screen.getByLabelText(`Inactive on ${day}`);
      expect(inactiveIndicator).toHaveClass('bg-gray-300');
    });

    expect(
      screen.getByText('Total Activity Duration: 0 mins')
    ).toBeInTheDocument();

    const activityTypes = ['Rest', 'Work', 'Available', 'Drive'];
    activityTypes.forEach((type) => {
      expect(
        screen.getByText(`${type}: 0 mins`)
      ).toBeInTheDocument();
    });
  });

  it('ignores invalid dates in traceData', () => {
    render(<Activity traceData={invalidTraces} />);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach((day) => {
      const inactiveIndicator = screen.getByLabelText(`Inactive on ${day}`);
      expect(inactiveIndicator).toHaveClass('bg-gray-300');
    });

    const expectedTotal = invalidTraces.reduce((total, trace) => {
      return (
        total +
        trace.activity.reduce((acc, act) => acc + act.duration, 0)
      );
    }, 0);

    expect(
      screen.getByText(`Total Activity Duration: ${expectedTotal} mins`)
    ).toBeInTheDocument();

    const activityTypes = ['Rest', 'Work', 'Available', 'Drive'];
    activityTypes.forEach((type) => {
      const expectedDuration = invalidTraces.reduce((total, trace) => {
        return (
          total +
          trace.activity
            .filter((act) => act.type === type.toLowerCase())
            .reduce((acc, act) => acc + act.duration, 0)
        );
      }, 0);

      expect(
        screen.getByText(`${type}: ${expectedDuration} mins`)
      ).toBeInTheDocument();
    });
  });
});
