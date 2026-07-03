import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Cpu, Save } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import {
  fetchPersona,
  fetchPersonaMetadata,
  createOrUpdatePersona,
  selectPersona,
  selectPersonaLoading,
  selectPersonaCompletion,
  selectPersonaMetadata
} from '../../store/slices/personaSlice'
import Sidebar from '@/components/dashboard/Sidebar'

export default function UserPersonaPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const persona = useSelector(selectPersona)
  const loading = useSelector(selectPersonaLoading)
  const completion = useSelector(selectPersonaCompletion)
  const metadata = useSelector(selectPersonaMetadata)

  const [localForm, setLocalForm] = useState({
    display_name: '',
    role: '',
    industry: '',
    experience_years: '',
    primary_goals: '',
    business_description: '',
    ai_tone: '',
    response_style: '',
    ai_priority: '',
    ai_avoidances: '',
    communication_style: '',
    common_messages: '',
    workday_improvements: '',
    important_documents: '',
    brand_guidelines: '',
    long_term_memory: '',
    privacy_preferences: ''
  })

  useEffect(() => {
    dispatch(fetchPersona())
    dispatch(fetchPersonaMetadata())
  }, [dispatch])

  useEffect(() => {
    if (persona) {
      setLocalForm(prev => ({
        ...prev,
        ...persona
      }))
    }
  }, [persona])

  const handleLocalChange = e => {
    const { name, value } = e.target

    setLocalForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    try {
      const payload = {
        ...localForm,
        experience_years: Number(localForm.experience_years)
      }

      await dispatch(createOrUpdatePersona(payload)).unwrap()
      alert('Persona saved successfully')
    } catch (error) {
      console.error(error)
      alert(error || 'Failed to save persona')
    }
  }

  return (
    <div className='flex min-h-screen bg-[#050505]'>
      {/* SIDEBAR NAVIGATION UNIT */}
      <Sidebar />

      {/* CORE CONTENT HUB */}
      <div className='flex-1 p-6 lg:p-10 font-mono text-zinc-300 overflow-y-auto'>
        <div className='max-w-5xl mx-auto space-y-6'>
          {/* HEADER SECTION */}
          <div className='flex flex-col md:flex-row justify-between items-start border-l border-emerald-500/50 pl-6 mb-12'>
            <div className='space-y-1'>
              {/* NAVIGATION BACK BUTTON */}
              <button
                onClick={() => navigate(-1)}
                className='group flex items-center gap-2 mb-6 text-zinc-600 hover:text-emerald-500 transition-colors'
              >
                <span className='text-[10px] tracking-[0.3em] font-black uppercase'>
                  {'<'} Return_to_Dashboard
                </span>
              </button>

              <div className='flex items-center gap-2 text-emerald-500/50 text-[10px] tracking-[0.3em] uppercase'>
                <Cpu size={12} />
                Identity_Core_Configuration
              </div>
              <h1 className='text-4xl font-black text-white uppercase tracking-tighter'>
                AI Persona Setup
              </h1>
              <p className='text-[11px] text-zinc-600 tracking-wider lowercase mt-1'>
                _manifest: Help Synthetix OS understand your workflow,
                preferences, and communication style.
              </p>
            </div>
            <div className='flex flex-col items-end gap-1 mt-4 md:mt-0'>
              <div className='text-[9px] text-zinc-800 uppercase tracking-widest'>
                Config_Uplink: Active
              </div>
            </div>
          </div>

          {/* PROGRESS BAR PANEL */}
          <div className='bg-zinc-900/10 border border-zinc-900 p-5'>
            <div className='flex justify-between text-[10px] mb-3'>
              <span className='text-zinc-400 uppercase tracking-wider'>
                _Profile_Completion
              </span>
              <span className='text-emerald-500 font-bold'>{completion}%</span>
            </div>
            <div className='h-0.5 bg-zinc-900 overflow-hidden'>
              <div
                className='h-full bg-emerald-500 transition-all duration-700'
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>

          {/* FORM CONTAINER */}
          <div className='space-y-10'>
            {/* SECTION 1: Professional Profile */}
            <div className='bg-zinc-900/10 border border-zinc-900'>
              <div className='p-4 border-b border-zinc-900'>
                <h2 className='text-[9px] font-bold text-zinc-700 uppercase tracking-[0.2em]'>
                  01 // _Professional_Profile
                </h2>
              </div>
              <div className='p-6 space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <Input
                    label='What should the AI call you?'
                    name='display_name'
                    value={localForm.display_name}
                    onChange={handleLocalChange}
                  />

                  <Input
                    label='Years of experience'
                    name='experience_years'
                    type='number'
                    value={localForm.experience_years}
                    onChange={handleLocalChange}
                  />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <SelectField
                    label='Role'
                    name='role'
                    value={localForm.role}
                    onChange={handleLocalChange}
                    options={metadata?.role_choices}
                    placeholder='Select Role'
                  />

                  <Input
                    label='Industry'
                    name='industry'
                    value={localForm.industry}
                    onChange={handleLocalChange}
                  />
                </div>

                <Textarea
                  label='Describe your business or work'
                  name='business_description'
                  value={localForm.business_description}
                  onChange={handleLocalChange}
                />

                <Textarea
                  label='Primary goals'
                  name='primary_goals'
                  value={localForm.primary_goals}
                  onChange={handleLocalChange}
                />
              </div>
            </div>

            {/* SECTION 2: AI Style & Preferences */}
            <div className='bg-zinc-900/10 border border-zinc-900'>
              <div className='p-4 border-b border-zinc-900'>
                <h2 className='text-[9px] font-bold text-zinc-700 uppercase tracking-[0.2em]'>
                  02 // _AI_Style_and_Preferences
                </h2>
              </div>
              <div className='p-6 space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <SelectField
                    label='AI Tone'
                    name='ai_tone'
                    value={localForm.ai_tone}
                    onChange={handleLocalChange}
                    options={metadata?.ai_tone_choices}
                    placeholder='Select Tone'
                  />

                  <SelectField
                    label='Response Style'
                    name='response_style'
                    value={localForm.response_style}
                    onChange={handleLocalChange}
                    options={metadata?.response_style_choices}
                    placeholder='Select Style'
                  />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <SelectField
                    label='AI Priority'
                    name='ai_priority'
                    value={localForm.ai_priority}
                    onChange={handleLocalChange}
                    options={metadata?.priority_choices}
                    placeholder='Select Priority'
                  />

                  <Input
                    label='Communication Style'
                    name='communication_style'
                    value={localForm.communication_style}
                    onChange={handleLocalChange}
                  />
                </div>

                <Textarea
                  label='What should AI avoid doing?'
                  name='ai_avoidances'
                  value={localForm.ai_avoidances}
                  onChange={handleLocalChange}
                />

                <Textarea
                  label='Common messages / standard responses'
                  name='common_messages'
                  value={localForm.common_messages}
                  onChange={handleLocalChange}
                />
              </div>
            </div>

            {/* SECTION 3: Workspace Context & Guardrails */}
            <div className='bg-zinc-900/10 border border-zinc-900'>
              <div className='p-4 border-b border-zinc-900'>
                <h2 className='text-[9px] font-bold text-zinc-700 uppercase tracking-[0.2em]'>
                  03 // _Workspace_Context_and_Guardrails
                </h2>
              </div>
              <div className='p-6 space-y-6'>
                <Textarea
                  label='Desired workday improvements'
                  name='workday_improvements'
                  value={localForm.workday_improvements}
                  onChange={handleLocalChange}
                />

                <Textarea
                  label='Important documents context'
                  name='important_documents'
                  value={localForm.important_documents}
                  onChange={handleLocalChange}
                />

                <Textarea
                  label='Brand guidelines'
                  name='brand_guidelines'
                  value={localForm.brand_guidelines}
                  onChange={handleLocalChange}
                />

                <Textarea
                  label='Long-term memory preferences'
                  name='long_term_memory'
                  value={localForm.long_term_memory}
                  onChange={handleLocalChange}
                />

                <Textarea
                  label='Privacy & security preferences'
                  name='privacy_preferences'
                  value={localForm.privacy_preferences}
                  onChange={handleLocalChange}
                />
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON PANEL */}
          <div className='flex justify-between items-center pt-4 border-t border-zinc-900'>
            <div className='text-[9px] text-emerald-500/30 font-black tracking-[0.15em] uppercase'>
              Synthetix_OS // Core_Identity_System
            </div>
            <button
              onClick={handleSave}
              disabled={loading}
              className='group flex items-center gap-2 border border-emerald-500/40 bg-emerald-500/10 px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 transition-all hover:bg-emerald-500/20 active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none'
            >
              <Save size={12} />
              {loading ? 'Executing_Commit...' : '_Commit_Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Input ({ label, ...props }) {
  return (
    <div className='space-y-2 w-full'>
      <label className='block text-[9px] font-bold text-zinc-600 uppercase tracking-wider'>
        {label?.replace(/ /g, '_')}
      </label>
      <div className='flex items-center gap-2 bg-[#0a0a0a] border border-zinc-950 p-2.5 px-4 focus-within:border-emerald-500/40 transition-colors'>
        <span className='text-zinc-800 text-[10px] font-bold shrink-0 select-none'>
          {'>'}
        </span>
        <input
          {...props}
          className='w-full bg-transparent font-mono text-[11px] text-zinc-300 outline-none placeholder-zinc-800'
        />
      </div>
    </div>
  )
}

function Textarea ({ label, ...props }) {
  return (
    <div className='space-y-2 w-full'>
      <label className='block text-[9px] font-bold text-zinc-600 uppercase tracking-wider'>
        {label?.replace(/ /g, '_')}
      </label>
      <div className='flex items-start gap-2 bg-[#0a0a0a] border border-zinc-950 p-3 px-4 focus-within:border-emerald-500/40 transition-colors'>
        <span className='text-zinc-800 text-[10px] font-bold mt-0.5 shrink-0 select-none'>
          {'>'}
        </span>
        <textarea
          rows={3}
          {...props}
          className='w-full bg-transparent font-mono text-[11px] text-zinc-300 outline-none resize-none placeholder-zinc-800'
        />
      </div>
    </div>
  )
}

function SelectField ({ label, name, value, onChange, options, placeholder }) {
  return (
    <div className='space-y-2 w-full'>
      <label className='block text-[9px] font-bold text-zinc-600 uppercase tracking-wider'>
        {label?.replace(/ /g, '_')}
      </label>
      <div className='flex items-center gap-2 bg-[#0a0a0a] border border-zinc-950 p-2.5 px-4 focus-within:border-emerald-500/40 transition-colors'>
        <span className='text-zinc-800 text-[10px] font-bold shrink-0 select-none'>
          {'>'}
        </span>
        <select
          name={name}
          value={value || ''}
          onChange={onChange}
          className='w-full bg-transparent font-mono text-[11px] text-zinc-300 outline-none placeholder-zinc-800 cursor-pointer appearance-none'
          style={{ WebkitAppearance: 'none' }}
        >
          <option value='' className='bg-[#0a0a0a] text-zinc-600'>
            {placeholder}
          </option>
          {options?.map(option => (
            <option
              key={option.value}
              value={option.value}
              className='bg-[#0a0a0a] text-zinc-300'
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
