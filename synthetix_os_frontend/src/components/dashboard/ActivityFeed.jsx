export default function ActivityFeed () {
  //   const { data } = useQuery({
  //     queryKey: ["events"],
  //     queryFn: async () => {
  //       const res = await API.get("/events/");
  //       return res.data;
  //     },
  //   });
  const data = [
    { id: 1, message: "Workflow 'Daily Report' executed successfully." },
    { id: 2, message: "New workflow 'Email Alerts' created." },
    { id: 3, message: "Workflow 'Data Backup' failed to execute." }
  ]

  return (
    <div className='bg-white p-6 rounded-2xl border'>
      <h2 className='text-lg font-medium mb-4'>Activity</h2>

      <ul className='space-y-2 text-sm text-neutral-600'>
        {data?.map(e => (
          <li key={e.id}>{e.message}</li>
        ))}
      </ul>
    </div>
  )
}
