// components/DisputeTracker.tsx
import React from 'react';
import {  DisputeStatus } from '@/components/types'; // Adjust the import path as needed
import './dispute-tracker.css';

interface DisputeTrackerProps {
  status: DisputeStatus;
}

const DisputeTracker: React.FC<DisputeTrackerProps> = ({ status }) => {
  const stages: DisputeStatus[] = [
    'filing',
    'response',
    'mediation',
    'arbitration',
    'enforcement',
    'appeal',
    'closed',
  ];

  return (
    <div className="dispute-tracker">
      <ul className="tracker-list">
        {stages.map((stage) => (
          <li
            key={stage}
            className={`tracker-item ${
              stages.indexOf(stage) <= stages.indexOf(status) ? 'completed' : ''
            } ${stage === status ? 'active' : ''}`}
          >
            <span className="tracker-label">{stage.charAt(0).toUpperCase() + stage.slice(1)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisputeTracker;
