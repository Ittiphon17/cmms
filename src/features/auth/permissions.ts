export type Permission =
  | 'workorder.create'
  | 'workorder.edit'
  | 'workorder.resolve'
  | 'workorder.close'
  | 'workorder.delete'
  | 'asset.create'
  | 'asset.edit'
  | 'asset.delete'
  | 'pm.schedule'
  | 'pm.execute'
  | 'reports.view'
  | 'users.manage';
