// import { useQuery } from "@tanstack/react-query";
// import API from "../../api/client";

export default function WorkflowTable() {
//   const { data } = useQuery({
//     queryKey: ["workflows"],
//     queryFn: async () => {
//       const res = await API.get("/workflows/");
//       return res.data;
//     },
//   });
    const data = [
      { id: 1, name: "Daily Report", status: "Completed", last_run: "2023-10-01 09:00" },
      { id: 2, name: "Email Alerts", status: "In Progress", last_run: "2023-10-01 10:30" },
      { id: 3, name: "Data Backup", status: "Failed", last_run: "2023-10-01 11:15" }
    ];


  return (
    <div className="bg-white p-6 rounded-2xl border">
      <h2 className="text-lg font-medium mb-4">Recent Workflows</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-neutral-500 text-left">
            <th>Name</th>
            <th>Status</th>
            <th>Last Run</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((w) => (
            <tr key={w.id} className="border-t">
              <td className="py-3">{w.name}</td>
              <td>{w.status}</td>
              <td>{w.last_run}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}