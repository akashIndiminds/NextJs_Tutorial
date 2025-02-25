// components/ODRSystem.tsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import DisputeTracker from './DisputeTracker'; // Import the tracker component
import { DisputeStatus, Dispute, Evidence } from '@/components/types'; // Import types

const ODRSystem = () => {
  const [currentDispute, setCurrentDispute] = useState<Dispute>({
    id: 'DISP-2024-001',
    title: 'Undelivered E-commerce Order',
    description:
      'Purchased a smartphone on January 5, 2024. Payment processed but item never shipped. Multiple contact attempts ignored.',
    status: 'filing',
    complainant: {
      id: 'USR-001',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'complainant',
    },
    respondent: {
      id: 'USR-002',
      name: 'TechWorld Inc.',
      email: 'support@techworld.example',
      role: 'respondent',
    },
    evidence: [
      {
        id: 'EVD-001',
        title: 'Order Confirmation',
        description: 'Order #TW-12345 confirmation email and receipt',
        submittedBy: 'USR-001',
        dateSubmitted: new Date('2024-01-06T09:15:00'),
        fileUrl: '/docs/order-confirmation.pdf',
      },
    ],
    messages: [],
    createdAt: new Date('2024-01-10T14:30:00'),
    updatedAt: new Date('2024-01-10T14:30:00'),
  });

  const [activeTab, setActiveTab] = useState<DisputeStatus>('filing');
  const [newMessage, setNewMessage] = useState('');
  const [newEvidence, setNewEvidence] = useState({ title: '', description: '' });
  const [settlement, setSettlement] = useState('');
  const [arbitrationDecision, setArbitrationDecision] = useState('');
  const [appealReason, setAppealReason] = useState('');

  // Function to handle adding evidence
  const addEvidence = () => {
    const newEvidenceItem: Evidence = {
      id: `EVD-${Date.now()}`, // Generate a unique ID
      title: newEvidence.title,
      description: newEvidence.description,
      submittedBy: 'USR-001', // Replace with actual user ID
      dateSubmitted: new Date(),
    };

    setCurrentDispute((prevDispute) => ({
      ...prevDispute,
      evidence: [...prevDispute.evidence, newEvidenceItem],
    }));

    // Clear the input fields after submitting
    setNewEvidence({ title: '', description: '' });
  };

  // Function to move to the next stage
  const moveToNextStage = () => {
    setCurrentDispute((prevDispute) => {
      let newStatus: DisputeStatus = prevDispute.status;

      switch (prevDispute.status) {
        case 'filing':
          newStatus = 'response';
          break;
        case 'response':
          newStatus = 'mediation';
          break;
        case 'mediation':
          newStatus = 'arbitration';
          break;
        case 'arbitration':
          newStatus = 'enforcement';
          break;
        case 'enforcement':
          newStatus = 'appeal';
          break;
        case 'appeal':
          newStatus = 'closed';
          break;
        case 'closed':
          newStatus = 'closed'; // Or handle a reset, end state, etc.
          break;
        default:
          newStatus = 'filing'; // Default starting point
      }

      return { ...prevDispute, status: newStatus };
    });
    setActiveTab(currentDispute.status);
  };

  const respondToComplaint = () => {
    // Simulate a response
    alert('Simulating Respondent Response');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'filing':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">File New Dispute</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Dispute Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={currentDispute.title}
                readOnly
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Detailed Description
              </label>
              <textarea
                className="w-full p-2 border rounded h-32"
                value={currentDispute.description}
                readOnly
              />
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Submit Evidence</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Evidence Title"
                  className="w-full p-2 border rounded"
                  value={newEvidence.title}
                  onChange={(e) => setNewEvidence({ ...newEvidence, title: e.target.value })}
                />

                <textarea
                  placeholder="Evidence Description"
                  className="w-full p-2 border rounded h-24"
                  value={newEvidence.description}
                  onChange={(e) => setNewEvidence({ ...newEvidence, description: e.target.value })}
                />

                <button
                  onClick={addEvidence}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Attach Evidence
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={moveToNextStage}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Submit Dispute
              </button>
            </div>
          </div>
        );

      case 'response':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Respond to Dispute</h2>
            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">Response Required</h3>
              <p>
                Respondent has <strong>3 business days</strong> to respond
              </p>
              <p className="text-sm text-gray-600 mt-1">Deadline: January 13, 2024 5:00 PM</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Current Evidence</h3>
              <div className="space-y-3">
                {currentDispute.evidence.map((evidence) => (
                  <div key={evidence.id} className="p-3 bg-gray-50 rounded">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{evidence.title}</h4>
                        <p className="text-sm text-gray-600">{evidence.description}</p>
                        {evidence.fileUrl && (
                          <a
                            href={evidence.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm mt-1 inline-block"
                          >
                            View Document
                          </a>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {evidence.dateSubmitted.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={respondToComplaint}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Simulate Respondent's Response
            </button>
          </div>
        );

      // Other case implementations with similar detailed structure

      default:
        return <div>Select a dispute stage</div>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <NavigationMenu />

      <main className="py-8">
        <h1 className="text-3xl font-bold mb-6">Online Dispute Resolution Center</h1>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <DisputeTracker status={currentDispute.status} /> {/* Render the tracker */}
          <div className="flex overflow-x-auto border-b">
            {[
              'filing',
              'response',
              'mediation',
              'arbitration',
              'enforcement',
              'appeal',
              'closed',
            ].map((stage) => (
              <button
                key={stage}
                className={`px-4 py-2 font-medium ${
                  activeTab === stage
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(stage as DisputeStatus)}
              >
                {stage.charAt(0).toUpperCase() + stage.slice(1)}
              </button>
            ))}
          </div>

          <div className="mt-6">{renderTabContent()}</div>
        </div>
      </main>
    </div>
  );
};

const NavigationMenu = () => (
  <nav className="bg-gray-800 text-white p-4">
    <ul className="flex space-x-6">
      <li>
        <Link href="/dashboard" className="hover:text-gray-300">
          Home
        </Link>
      </li>
      <li>
        <Link href="/orders" className="hover:text-gray-300">
          Orders
        </Link>
      </li>
      <li>
        <Link href="/products" className="hover:text-gray-300">
          Products
        </Link>
      </li>
      <li>
        <Link href="/customers" className="hover:text-gray-300">
          Customers
        </Link>
      </li>
      <li>
        <Link href="/reports" className="hover:text-gray-300">
          Reports
        </Link>
      </li>
      <li>
        <Link href="/settings" className="hover:text-gray-300">
          Settings
        </Link>
      </li>
      <li>
        <Link href="/odr" className="text-blue-300 hover:text-blue-400">
          ODR
        </Link>
      </li>
    </ul>
  </nav>
);

export default ODRSystem;
