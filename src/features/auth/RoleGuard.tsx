import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { hasPermission } from './rolePermissions';
import type { Permission } from './permissions';
import type { UserRole } from '../../types';

interface RoleGuardProps {
  permission?: Permission;
  allowedRoles?: UserRole[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  permission,
  allowedRoles,
  fallback = null,
  children,
}) => {
  const userRole = useAppStore((state) => (state as any).userRole) || 'admin';

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <>{fallback}</>;
  }

  if (permission && !hasPermission(userRole, permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
