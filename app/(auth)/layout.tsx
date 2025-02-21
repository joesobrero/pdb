interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-sm w-full space-y-3">{children}</div>
    </div>
  );
}
