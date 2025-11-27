export default function AuthLayout({ children }: any) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-[var(--card-bg)] border border-[var(--card-border)]">
        {children}
      </div>
    </div>
  );
}
