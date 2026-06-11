import type { UserRole } from '../../types';
import type { Permission } from './permissions';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    'workorder.create',
    'workorder.edit',
    'workorder.resolve',
    'workorder.close',
    'workorder.delete',
    'asset.create',
    'asset.edit',
    'asset.delete',
    'pm.schedule',
    'pm.execute',
    'reports.view',
    'users.manage',
  ],
  manager: [
    'workorder.create',
    'workorder.edit',
    'workorder.resolve',
    'workorder.close',
    'asset.create',
    'asset.edit',
    'pm.schedule',
    'pm.execute',
    'reports.view',
  ],
  technician: [
    'workorder.edit',
    'workorder.resolve',
    'pm.execute',
    'reports.view',
  ],
  requester: [
    'workorder.create',
  ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) || false;
}
