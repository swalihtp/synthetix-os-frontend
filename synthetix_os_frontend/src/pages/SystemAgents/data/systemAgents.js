import {
  Mail,
  Brain,
  Users,
  BarChart3,
  CalendarClock,
  FileText,
  Globe,
  Bell
} from 'lucide-react'

const systemAgents = [
  {
    id: 1,
    name: 'Email Agent',
    description:
      'Automatically processes incoming emails and drafts intelligent replies.',
    category: 'Communication',
    version: 'v1.0.0',
    status: 'ACTIVE',
    icon: Mail,

    overview:
      'The Email Agent monitors inboxes, classifies incoming emails using AI, generates intelligent replies and optionally sends them automatically.',

    capabilities: [
      'Read Emails',
      'AI Reasoning',
      'Generate Replies',
      'Human Review',
      'Memory Storage'
    ],

    integrations: ['Gmail', 'Outlook', 'SMTP', 'IMAP'],

    configuration: {
      polling: '5 Minutes',
      retries: '3',
      model: 'GPT-4.1',
      webhook: 'Enabled'
    }
  },
  {
    id: 2,
    name: 'Research Agent',
    description:
      'Performs competitor research, trend analysis and market intelligence.',
    category: 'Research',
    version: 'v1.2.0',
    status: 'ACTIVE',
    icon: Brain
  },
  {
    id: 3,
    name: 'CRM Agent',
    description: 'Manages customer interactions and lead nurturing workflows.',
    category: 'Business',
    version: 'v1.0.0',
    status: 'ACTIVE',
    icon: Users
  },
  {
    id: 4,
    name: 'Analytics Agent',
    description: 'Generates dashboards and business intelligence reports.',
    category: 'Analytics',
    version: 'v1.1.0',
    status: 'ACTIVE',
    icon: BarChart3
  },
  {
    id: 5,
    name: 'Scheduler Agent',
    description: 'Schedules jobs, reminders and recurring workflow executions.',
    category: 'Automation',
    version: 'v1.0.2',
    status: 'ACTIVE',
    icon: CalendarClock
  },
  {
    id: 6,
    name: 'Document Agent',
    description: 'Reads, summarizes and extracts information from documents.',
    category: 'Documents',
    version: 'v1.0.0',
    status: 'ACTIVE',
    icon: FileText
  },
  {
    id: 7,
    name: 'Web Scraper Agent',
    description:
      'Collects structured information from websites and public sources.',
    category: 'Research',
    version: 'v1.0.0',
    status: 'ACTIVE',
    icon: Globe
  },
  {
    id: 8,
    name: 'Notification Agent',
    description: 'Sends notifications through Email, Slack and Teams.',
    category: 'Automation',
    version: 'v1.1.0',
    status: 'ACTIVE',
    icon: Bell
  }
]

export default systemAgents
