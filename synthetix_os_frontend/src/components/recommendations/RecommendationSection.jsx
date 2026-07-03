import RecommendationCard from './RecommendationCard'
import { useNavigate } from 'react-router-dom'

export default function RecommendationSection ({ title, data }) {
  const navigate = useNavigate()
  return (
    <div className='space-y-4'>
      <h2 className='text-black text-lg font-semibold'>{title}</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {data.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/playbooks/${item.id}`)}
            className='cursor-pointer'
          >
            <RecommendationCard
              key={index}
              title={item.name}
              tools={item.tools || []}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
