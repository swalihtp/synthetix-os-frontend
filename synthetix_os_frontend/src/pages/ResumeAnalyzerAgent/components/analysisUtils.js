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

function normalizeScore (payload) {
  const feedbackReport = coerceObject(payload.feedback_report)
  const atsScore = coerceObject(payload.ats_score)
  const resumeAnalysis = coerceObject(payload.resume_analysis)

  const raw =
    feedbackReport.overall_score ??
    atsScore.ats_score ??
    Math.round((resumeAnalysis.clarity_score ?? 0) * 100)

  const score = Number(raw)

  if (!Number.isFinite(score)) return 0
  return Math.max(0, Math.min(100, Math.round(score)))
}

function buildSections (payload) {
  const resumeAnalysis = coerceObject(payload.resume_analysis)
  const skillEvaluation = coerceObject(payload.skill_evaluation)
  const atsScore = coerceObject(payload.ats_score)
  const feedbackReport = coerceObject(payload.feedback_report)
  const sectionFeedback = coerceObject(feedbackReport.section_feedback)

  const sections = []

  if (feedbackReport.summary) {
    sections.push({
      title: 'Summary',
      content: toText(feedbackReport.summary)
    })
  }

  if (Object.keys(sectionFeedback).length > 0) {
    sections.push({
      title: 'Section Feedback',
      content: Object.entries(sectionFeedback)
        .map(([sectionName, feedback]) => `${sectionName}: ${toText(feedback)}`)
        .join('\n\n')
    })
  }

  const atsLines = [
    `ATS Score: ${atsScore.ats_score ?? 'N/A'}`,
    `Parse Friendly: ${atsScore.parse_friendly ? 'Yes' : 'No'}`,
    `Recommended Format: ${atsScore.recommended_format ?? 'N/A'}`
  ]

  if (toArray(atsScore.issues).length > 0) {
    atsLines.push('')
    atsLines.push('Issues:')
    toArray(atsScore.issues).forEach(issue => atsLines.push(`- ${issue}`))
  }

  if (atsLines.length > 0) {
    sections.push({
      title: 'ATS Analysis',
      content: atsLines.join('\n')
    })
  }

  const analysisLines = [
    `Sections Found: ${toArray(resumeAnalysis.sections_found).join(', ') || 'None'}`,
    `Missing Sections: ${toArray(resumeAnalysis.missing_sections).join(', ') || 'None'}`
  ]

  if (toArray(resumeAnalysis.formatting_issues).length > 0) {
    analysisLines.push('')
    analysisLines.push('Formatting Issues:')
    toArray(resumeAnalysis.formatting_issues).forEach(issue => {
      analysisLines.push(`- ${issue}`)
    })
  }

  sections.push({
    title: 'Resume Analysis',
    content: analysisLines.join('\n')
  })

  const skillLines = [
    `Keyword Hits: ${skillEvaluation.keyword_hits ?? 0}`,
    `Extracted Skills: ${toArray(skillEvaluation.extracted_skills).join(', ') || 'None'}`
  ]

  if (toArray(skillEvaluation.skill_gaps).length > 0) {
    skillLines.push('')
    skillLines.push('Skill Gaps:')
    toArray(skillEvaluation.skill_gaps).forEach(gap => {
      skillLines.push(`- ${gap}`)
    })
  }

  sections.push({
    title: 'Skill Evaluation',
    content: skillLines.join('\n')
  })

  if (toArray(feedbackReport.ats_tips).length > 0) {
    sections.push({
      title: 'ATS Tips',
      content: toArray(feedbackReport.ats_tips)
        .map(tip => `- ${tip}`)
        .join('\n')
    })
  }

  if (toArray(feedbackReport.priority_actions).length > 0) {
    sections.push({
      title: 'Priority Actions',
      content: toArray(feedbackReport.priority_actions)
        .map(action => `- ${action}`)
        .join('\n')
    })
  }

  if (sections.length === 0 && payload.raw_text) {
    sections.push({
      title: 'Raw Resume Text',
      content: toText(payload.raw_text)
    })
  }

  return sections
}

function normalizeExecution (payload) {
  const resumeAnalysis = coerceObject(payload.resume_analysis)
  const skillEvaluation = coerceObject(payload.skill_evaluation)
  const atsScore = coerceObject(payload.ats_score)
  const feedbackReport = coerceObject(payload.feedback_report)

  return {
    id: payload.id ?? Date.now(),
    workflowExecutionId: payload.workflow_execution_id ?? null,
    filename: payload.file_name ?? 'uploaded_resume',
    fileType: payload.file_type ?? null,
    filePath: payload.file_path ?? null,
    status: payload.status ?? 'completed',
    time: payload.created_at ?? payload.updated_at ?? new Date().toISOString(),
    updatedAt: payload.updated_at ?? payload.created_at ?? null,
    errorMessage: payload.error_message ?? null,
    score: normalizeScore(payload),
    clarityScore: Math.round((resumeAnalysis.clarity_score ?? 0) * 100),
    sectionsFoundCount: toArray(resumeAnalysis.sections_found).length,
    missingSectionsCount: toArray(resumeAnalysis.missing_sections).length,
    formattingIssuesCount: toArray(resumeAnalysis.formatting_issues).length,
    keywordHits: skillEvaluation.keyword_hits ?? 0,
    keywordMissesCount: toArray(skillEvaluation.keyword_misses).length,
    extractedSkillsCount: toArray(skillEvaluation.extracted_skills).length,
    skillGapsCount: toArray(skillEvaluation.skill_gaps).length,
    atsIssuesCount: toArray(atsScore.issues).length,
    atsTipsCount: toArray(feedbackReport.ats_tips).length,
    priorityActionsCount: toArray(feedbackReport.priority_actions).length,
    summary: feedbackReport.summary ?? '',
    rawText: payload.raw_text ?? '',
    resumeAnalysis,
    skillEvaluation,
    atsScore,
    feedbackReport,
    sections: buildSections(payload)
  }
}

export function normalizeResumeExecution (execution) {
  return normalizeExecution(coerceObject(execution))
}

export function normalizeResumeExecutionsResponse (response) {
  const payload = response?.data ?? response ?? {}
  const items = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.results)
    ? payload.results
    : []

  return items
    .map(item => normalizeResumeExecution(item))
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
}

export function normalizeResumeExecutionsPaginatedResponse (response) {
  const payload = response?.data ?? response ?? {}
  const items = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.results)
    ? payload.results
    : []

  return {
    items: items
      .map(item => normalizeResumeExecution(item))
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()),
    count: Number(payload?.count ?? items.length ?? 0),
    next: payload?.next ?? null,
    previous: payload?.previous ?? null
  }
}

export function normalizeAnalysisExecution (response) {
  const payload =
    response?.data?.result ??
    response?.data?.data ??
    response?.data?.execution ??
    response?.data?.analysis ??
    response?.data ??
    response ??
    {}

  return normalizeResumeExecution(payload)
}
