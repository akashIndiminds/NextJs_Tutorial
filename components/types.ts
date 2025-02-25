export type DisputeStatus =
  | 'filing'
  | 'response'
  | 'mediation'
  | 'arbitration'
  | 'enforcement'
  | 'appeal'
  | 'closed';

export type Evidence = {
  id: string;
  title: string;
  description: string;
  fileUrl?: string;
  submittedBy: string;
  dateSubmitted: Date;
};

export type Message = {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  isPrivate: boolean;
};

export type Party = {
  id: string;
  name: string;
  email: string;
  role: 'complainant' | 'respondent' | 'mediator' | 'arbitrator';
};

export type Dispute = {
  id: string;
  title: string;
  description: string;
  status: DisputeStatus;
  complainant: Party;
  respondent: Party;
  mediator?: Party;
  arbitrator?: Party;
  evidence: Evidence[];
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  resolution?: string;
  settlementAmount?: number;
};
