import AdminLayout from "../../components/admin/main/AdminLayout";
import UserRegistry from '../../components/admin/user-registry/UserRegistry'
export default function AdminDashboard() {
  return (
    <AdminLayout>
      <UserRegistry />
    </AdminLayout>
  );
}
