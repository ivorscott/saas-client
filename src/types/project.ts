export interface Project {
  id: string;
  name: string;
  prefix: string;
  description: string;
  tenantId: string;
  userId: string;
  active: boolean;
  public: boolean;
  columnOrder: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PinnedProject {
  tenantPath: string;
  projectId: string;
  name: string;
}
