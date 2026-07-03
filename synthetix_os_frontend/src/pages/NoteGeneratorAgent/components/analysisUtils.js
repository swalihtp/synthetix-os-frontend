function coerceObject (value) {
  if (!value || typeof value !== 'object') return {}
  return value
}

function toArray (value) {
  if (Array.isArray(value)) return value.filter(Boolean)
  if (value === null || value === undefined) return []
  return [value].filter(Boolean)
}

function toText (value) {
  if (Array.isArray(value)) {
    return value.map(item => toText(item)).filter(Boolean).join('\n')
  }

  if (value === null || value === undefined) return ''
  if (typeof value === 'object') return JSON.stringify(value, null, 2)
  return String(value)
}

function formatPeople (value) {
  return toArray(value).join(', ')
}

function buildTopicLines (topics) {
  return toArray(topics).map(topic => {
    if (typeof topic === 'string') return topic

    const name = topic.topic || topic.title || topic.name || 'Topic'
    const summary = topic.summary ? ` - ${topic.summary}` : ''
    const speakers = toArray(topic.speakers)
    const speakersText = speakers.length > 0 ? ` (Speakers: ${formatPeople(speakers)})` : ''

    return `${name}${summary}${speakersText}`
  })
}

function buildDecisionLines (decisions) {
  return toArray(decisions).map(decision => {
    if (typeof decision === 'string') return decision

    const madeBy = decision.made_by || decision.madeBy || 'Unknown'
    const context = decision.context ? ` Context: ${decision.context}` : ''
    return `${madeBy}: ${decision.decision || 'Decision recorded.'}${context}`
  })
}

function buildActionItemLines (actionItems) {
  return toArray(actionItems).map(action => {
    if (typeof action === 'string') return action

    const owner = action.owner || 'Unassigned'
    const due = action.due ? ` Due: ${action.due}` : ''
    const topic = action.topic ? ` Topic: ${action.topic}` : ''
    return `${owner}: ${action.task || 'Action item'}${due}${topic}`
  })
}

function normalizeSummaryStyle (style) {
  const value = String(style || '').toLowerCase()

  if (value.includes('executive')) return 'executive'
  if (value.includes('detail')) return 'detailed'
  return 'concise'
}

function styleLabel (style) {
  const normalized = normalizeSummaryStyle(style)
  if (normalized === 'executive') return 'Executive'
  if (normalized === 'detailed') return 'Detailed'
  return 'Concise'
}

function buildSections (payload) {
  const meetingSummary = coerceObject(payload.meeting_summary)
  const topics = payload.topics || meetingSummary.topics_discussed
  const decisions = payload.decisions || meetingSummary.decisions
  const actionItems = payload.action_items || meetingSummary.action_items
  const blockers = meetingSummary.blockers || []

  const sections = []

  if (meetingSummary.summary) {
    sections.push({
      title: 'Summary',
      content: toText(meetingSummary.summary)
    })
  }

  const topicLines = buildTopicLines(topics)
  if (topicLines.length > 0) {
    sections.push({
      title: 'Topics Discussed',
      content: topicLines.map(item => `- ${item}`).join('\n')
    })
  }

  const decisionLines = buildDecisionLines(decisions)
  if (decisionLines.length > 0) {
    sections.push({
      title: 'Decisions',
      content: decisionLines.map(item => `- ${item}`).join('\n')
    })
  }

  const actionItemLines = buildActionItemLines(actionItems)
  if (actionItemLines.length > 0) {
    sections.push({
      title: 'Action Items',
      content: actionItemLines.map(item => `- ${item}`).join('\n')
    })
  }

  if (toArray(blockers).length > 0) {
    sections.push({
      title: 'Blockers',
      content: toArray(blockers).map(item => `- ${item}`).join('\n')
    })
  }

  if (meetingSummary.next_steps) {
    sections.push({
      title: 'Next Steps',
      content: toText(meetingSummary.next_steps)
    })
  }

  if (payload.raw_transcript) {
    sections.push({
      title: 'Raw Transcript',
      content: toText(payload.raw_transcript)
    })
  }

  return sections
}

function normalizeExecution (payload) {
  const meetingSummary = coerceObject(payload.meeting_summary)
  const topics = toArray(payload.topics || meetingSummary.topics_discussed)
  const decisions = toArray(payload.decisions || meetingSummary.decisions)
  const actionItems = toArray(payload.action_items || meetingSummary.action_items)
  const blockers = toArray(meetingSummary.blockers)

  return {
    id: payload.id ?? Date.now(),
    workflowExecutionId: payload.workflow_execution_id ?? meetingSummary.execution_id ?? null,
    filename: payload.file_name ?? 'meeting_transcript',
    fileType: payload.file_type ?? null,
    filePath: payload.file_path ?? null,
    summaryStyle: normalizeSummaryStyle(payload.summary_style || meetingSummary.summary_style),
    summaryStyleLabel: styleLabel(payload.summary_style || meetingSummary.summary_style),
    status: payload.status ?? 'completed',
    errorMessage: payload.error_message ?? null,
    time: payload.created_at ?? meetingSummary.generated_at ?? new Date().toISOString(),
    updatedAt: payload.updated_at ?? meetingSummary.generated_at ?? null,
    title: meetingSummary.title ?? payload.file_name ?? 'Meeting Summary',
    summary: meetingSummary.summary ?? '',
    nextSteps: meetingSummary.next_steps ?? '',
    rawTranscript: payload.raw_transcript ?? '',
    topics,
    decisions,
    actionItems,
    blockers,
    topicsCount: topics.length,
    decisionsCount: decisions.length,
    actionItemsCount: actionItems.length,
    blockersCount: blockers.length,
    sections: buildSections(payload)
  }
}

export function normalizeMeetingSummaryExecution (execution) {
  return normalizeExecution(coerceObject(execution))
}

export function normalizeMeetingSummaryExecutionsResponse (response) {
  const payload = response?.data ?? response ?? {}
  const items = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.results)
    ? payload.results
    : []

  return items
    .map(item => normalizeMeetingSummaryExecution(item))
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
}

export function normalizeMeetingSummaryExecutionsPaginatedResponse (response) {
  const payload = response?.data ?? response ?? {}
  const items = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.results)
    ? payload.results
    : []

  return {
    items: items
      .map(item => normalizeMeetingSummaryExecution(item))
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()),
    count: Number(payload?.count ?? items.length ?? 0),
    next: payload?.next ?? null,
    previous: payload?.previous ?? null
  }
}
