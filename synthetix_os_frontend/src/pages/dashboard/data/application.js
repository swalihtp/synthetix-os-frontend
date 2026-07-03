import { FileText, Mail, Mic, BarChart3 } from 'lucide-react'

export const APPLICATIONS = {
  'Resume Analyzer': {
    icon: FileText,
    description: 'Analyze resumes against job descriptions using AI.',
    route: '/workflow/resume-analyzer',
    accent: 'emerald'
  },

  'Meeting Summarizer': {
    icon: Mic,
    description: 'Generate summaries, action items and decisions.',
    route: '/workflow/meeting-summarizer',
    accent: 'blue'
  },

  'Email Automation': {
    icon: Mail,
    description: 'Automatically classify and respond to emails.',
    route: '/workflow/email-agent',
    accent: 'amber'
  },

  'Market Intelligence': {
    icon: BarChart3,
    description: 'Research competitors and generate reports.',
    route: '/agents',
    accent: 'purple'
  }
}
