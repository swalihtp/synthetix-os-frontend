import { Bot, Workflow, FileText, Mic, Mail } from 'lucide-react'

export const QUICK_ACTIONS = [
  {
    title: 'Explore Agent',
    description: 'Hire a new AI agent',
    icon: Bot,
    route: '/system-agents',
    accent: 'emerald'
  },
  {
    title: 'Analyze Employees',
    description: 'Analyze and detail the agents',
    icon: Workflow,
    route: '/agents',
    accent: 'blue'
  },
  {
    title: 'Resume Analyzer',
    description: 'Analyze a resume',
    icon: FileText,
    route: '/system-agents',
    accent: 'amber'
  },
  {
    title: 'Meeting Summarizer',
    description: 'Generate meeting notes',
    icon: Mic,
    route: '/system-agents',
    accent: 'purple'
  },
  {
    title: 'Email Automation',
    description: 'Process incoming emails',
    icon: Mail,
    route: '/system-agents',
    accent: 'rose'
  }
]
