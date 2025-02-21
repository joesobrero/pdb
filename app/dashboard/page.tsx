import ProtectedRoute from "@/app/components/auth/ProtectedRoute";
import { createClient } from "@/lib/supabase/client";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <ProtectedRoute>
      <div>
        <h1>Hi {user?.email}</h1>
      </div>
    </ProtectedRoute>
  );
}
