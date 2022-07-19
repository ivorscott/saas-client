import { useMutation, useQuery, useQueryClient } from "react-query";
import { client as api } from "services/APIService";
import { Project } from "types/project";

export function useProject(projectId: string | undefined) {
  return useQuery<Project, Error>(
    ["project", projectId],
    async () => await api.get(`/projects/${projectId}`)
  );
}

export function useProjects() {
  return useQuery<Project[], Error>(
    "projects",
    async () => await api.get("/projects")
  );
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation<Project, Error, string>(
    (name) => api.post("/projects", { name }),
    {
      onSuccess: (result) => {
        queryClient.setQueryData<Project[] | undefined>(["projects"], (old) => {
          if (!old) {
            return old;
          }
          return [...old, result];
        });
      },
    }
  );
  return [mutate];
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation<
    Project,
    Error,
    {
      id: string;
      active?: boolean;
      public?: boolean;
      description?: string;
      name?: string;
      columnOrder?: string[];
    }
  >(
    ({ id, ...rest }) =>
      api.patch(`/projects/${id}`, {
        ...rest,
      }),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["project", data.id], data);
      },
    }
  );
  return [mutate];
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation<null, Error, string>(
    (id) => api.delete(`/projects/${id}`),
    {
      onSuccess: async (_, projectId) => {
        await queryClient.invalidateQueries(["project", projectId], {
          refetchActive: false,
          refetchInactive: false,
        });
        await queryClient.invalidateQueries("projects");
      },
    }
  );
  return [mutate];
}
