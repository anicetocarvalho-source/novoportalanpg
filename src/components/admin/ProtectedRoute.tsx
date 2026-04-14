import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: 'admin' | 'content' | 'operations' | 'investors';
}

export function ProtectedRoute({ children, requiredPermission }: ProtectedRouteProps) {
  const { user, loading, hasBackofficeAccess, isAdmin, canManageContent, canManageOperations, canManageInvestors } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirected = useRef(false);

  // Compute redirect target (null = no redirect needed)
  let redirectTo: string | null = null;
  if (!loading) {
    if (!user) {
      redirectTo = '/admin/login';
    } else if (!hasBackofficeAccess) {
      redirectTo = '/';
    } else if (requiredPermission) {
      let hasPermission = false;
      switch (requiredPermission) {
        case 'admin': hasPermission = isAdmin; break;
        case 'content': hasPermission = canManageContent; break;
        case 'operations': hasPermission = canManageOperations; break;
        case 'investors': hasPermission = canManageInvestors; break;
      }
      if (!hasPermission) redirectTo = '/admin';
    }
  }

  useEffect(() => {
    if (redirectTo && !redirected.current) {
      redirected.current = true;
      navigate(redirectTo, { replace: true, state: redirectTo === '/admin/login' ? { from: location } : undefined });
    }
  }, [redirectTo, navigate, location]);

  if (loading || redirectTo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
